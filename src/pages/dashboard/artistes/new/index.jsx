import React, {useEffect, useReducer, useState} from "react";

import ROUTES from "@/constants/ROUTES";
import {Toast} from "@/constants/ToastConfig";

import Swal from "sweetalert2";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import Button from "@/components/ui/button/Button";
import Select from "react-select";
import Editor from "@/components/ui/Editor";

import {MdEmail, MdPassword} from "react-icons/md";
import {RxAvatar} from "react-icons/rx";
import {BsFillFileEarmarkPersonFill, BsTelephoneFill} from "react-icons/bs";
import {IoHome} from "react-icons/io5";

import {FaFlag} from "react-icons/fa";
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin} from "react-icons/ai";
import {FaEarthAfrica} from "react-icons/fa6";
import {GrTextAlignCenter} from "react-icons/gr";

import styles from './Index.module.scss';
import sectionStyles from '@/components/dashboard/items/sections/DashboardSectionItem.module.scss';
import {useRouter} from "next/router";
import StorageUtils from "@/utils/StorageUtils";
import {handleGeneratePassword} from "@/constants/Util";

const initialState = {
    user: {
        email: undefined,
        avatarURL: undefined,
        password: undefined,
        firstname: undefined,
        lastname: undefined,
        phone: undefined,
        street: undefined,
        city: undefined,
        postalCode: undefined,
    },
    artist: {
        pseudo: undefined,
        nationality: undefined,
        bio: undefined,
        instagram: undefined,
        facebook: undefined,
        linkedin: undefined,
        website: undefined,
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FORM':
            const [field, nestedField] = action.payload.field.split('.');
            return {
                ...state,
                [field]: {
                    ...state[field],
                    [nestedField]: action.payload.value,
                },
            };
        default:
            throw new Error();
    }
}

export default function DashboardArtistesNewIndex() {

    const router = useRouter();

    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

    const [countriesLoading, setCountriesLoading] = useState(false);
    const [countries, setCountries] = useState([]);

    const [avatarURL, setAvatarURL] = useState(undefined);


    /**
     * Permet de vérifier que tous les champs concernant le compte utilisateur sont remplis
     * @returns {this is any[]}
     */
    const handleCheckAllUserFieldsFilledExceptAvatar = () => {
        const {avatarURL, ...userFields} = state.user;
        return Object.values(userFields).every(value => value !== undefined && value !== null && value.trim() !== '');
    }

    /**
     * Permet de mettre à jour le state du formulaire
     * @param e
     */
    const handleChange = (e) => {

        const {name, value, type, files} = e.target;

        if (type === 'file') {
            setAvatarURL(files[0]);
        } else {
            dispatch({
                type: 'UPDATE_FORM',
                payload: {field: name, value},
            });
        }
    };

    /**
     * Permet de lancer une procédure une fois le formulaire soumis
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (!handleCheckAllUserFieldsFilledExceptAvatar()) {
                throw new Error("Veuillez remplir toutes les informations utilisateur sauf l\'avatar qui n\'est pas obligatoire");
            }

            let userResponse;

            try {

                userResponse = await fetch(ROUTES.API.USERS.HOME, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        ...state.user,
                    }),
                });

                const userResponseJson = await userResponse.json();

                if (!userResponse.ok) throw new Error(userResponseJson.message);

                const user = userResponseJson.user;
                const userid = user.id;

                if (avatarURL) {

                    const {
                        downloadURL,
                        success
                    } = await StorageUtils.uploadFile(avatarURL, "users/" + userid + "/avatar", null);

                    if (!success) throw new Error("Erreur lors de l'upload de l'avatar sur le cloud");

                    const updateAvatarResponse = await fetch(ROUTES.API.USERS.HOME, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: userid,
                            avatarURL: downloadURL,
                        }),
                    });

                    const updateAvatarResponseJson = await updateAvatarResponse.json();

                    if (!updateAvatarResponse.ok) throw new Error(updateAvatarResponseJson.message);

                }

                let artistResponse;

                if (state.artist.nationality !== undefined) {
                    state.artist.nationality = state.artist.nationality.value;
                }

                artistResponse = await fetch(ROUTES.API.ARTISTES.HOME, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        ...state.artist,
                        userid,
                    }),
                });

                const artistsResponseJSON = await artistResponse.json();

                if (!artistResponse.ok) {

                    await fetch(ROUTES.API.USERS.HOME, {
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: userid,
                        }),
                    });

                    throw new Error(artistsResponseJSON.message);

                }

                Toast.fire({icon: 'success', title: 'Artiste créé avec succès'});

                router.push(ROUTES.ADMIN.ARTISTES.EDIT.HOME(userid));

            } catch (error) {

                Toast.fire({icon: 'error', title: error.message || 'Une erreur est survenue'});

                return false;

            }

        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oups...',
                text: error,
            });
            return false;
        }
    }


    useEffect(() => {
        setLoading(true);
        setCountriesLoading(true);
        fetch('https://restcountries.com/v3.1/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .finally(() => {
                setCountriesLoading(false)
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.HOME}
            />
            <div className={styles.content}>
                <DashboardSectionItem
                    sectionName={"Informations Utilisateur"}
                    description={"Ces informations ne seront pas visibles du grand public"}
                    required
                >
                    <IconInput
                        label={"E-mail"}
                        type={"email"}
                        IconComponent={MdEmail}
                        placeholder={"Ex: example@mail.com"}
                        onChange={handleChange}
                        name={"user.email"}
                        value={state.user.email}
                        disabled={loading}
                        autoComplete={"email"}
                        required
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            width: "100%",
                            gap: "1rem"
                        }}>
                        <div style={{
                            width: "100%",
                        }}>
                            <IconInput
                                label={"Mot de passe"}
                                type={"password"}
                                IconComponent={MdPassword}
                                placeholder={"Ex: euI8k%$uYvg"}
                                onChange={handleChange}
                                name={"user.password"}
                                value={state.user.password}
                                disabled={loading}
                                autoComplete={"current-password"}
                                required
                            />
                        </div>
                        <div>
                            <Button
                                text={"Générer"}
                                onClick={() => {
                                    dispatch({
                                        type: 'UPDATE_FORM',
                                        payload: {field: 'user.password', value: handleGeneratePassword()},
                                    });

                                }}
                            />
                        </div>
                    </div>
                    <IconInput
                        label={"Avatar"}
                        type={"file"}
                        IconComponent={RxAvatar}
                        onChange={handleChange}
                        name={"user.avatarURL"}
                        accept={"image/*"}
                        disabled={loading}
                    />
                    <IconInput
                        label={"Prénom"}
                        type={"text"}
                        IconComponent={BsFillFileEarmarkPersonFill}
                        placeholder={"Ex: Jean"}
                        onChange={handleChange}
                        name={"user.firstname"}
                        value={state.user.firstname}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Nom"}
                        type={"text"}
                        IconComponent={BsFillFileEarmarkPersonFill}
                        placeholder={"Ex: Dupont"}
                        onChange={handleChange}
                        name={"user.lastname"}
                        value={state.user.lastname}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Numéro de téléphone"}
                        type={"tel"}
                        IconComponent={BsTelephoneFill}
                        placeholder={"Ex: 0769141995"}
                        onChange={handleChange}
                        name={"user.phone"}
                        value={state.user.phone}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Adresse"}
                        type={"text"}
                        IconComponent={IoHome}
                        placeholder={"Ex: 1 rue de la paix"}
                        onChange={handleChange}
                        name={"user.street"}
                        value={state.user.street}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Ville"}
                        type={"text"}
                        IconComponent={IoHome}
                        placeholder={"Ex: Paris"}
                        onChange={handleChange}
                        name={"user.city"}
                        value={state.user.city}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Code postal"}
                        type={"text"}
                        IconComponent={IoHome}
                        placeholder={"Ex: 75000"}
                        onChange={handleChange}
                        name={"user.postalCode"}
                        value={state.user.postalCode}
                        disabled={loading}
                        required
                    />
                </DashboardSectionItem>
                <DashboardSectionItem
                    sectionName={"Informations Artiste"}
                >
                    <IconInput
                        label={"Nom d'artiste"}
                        type={"text"}
                        IconComponent={BsFillFileEarmarkPersonFill}
                        placeholder={"Ex: M4TRIX"}
                        value={state.artist.pseudo}
                        name={"artist.pseudo"}
                        onChange={handleChange}
                    />
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                        <span>
                                            <FaFlag/>
                                        </span>
                            <div>
                                <p>Nationalité(s)</p>
                            </div>
                        </div>
                        <Select
                            placeholder={"Sélectionner la nationalité de l'artiste"}
                            closeMenuOnSelect={true}
                            defaultValue={[]}
                            isMulti={false}
                            name={"artist.nationality"}
                            value={state.artist.nationality}
                            options={
                                countries.map((country) => {
                                    return {
                                        value: country.translations.fra.common,
                                        label: country.translations.fra.common
                                    }
                                })}
                            animate={true}
                            isLoading={countriesLoading}
                            isDisabled={countriesLoading}
                            onChange={(selectedOption) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'artist.nationality', value: selectedOption},
                                });
                            }}
                        />
                    </div>
                    <IconInput
                        label={"Facebook"}
                        type={"text"}
                        IconComponent={AiFillFacebook}
                        placeholder={"Ex: https://www.facebook.com/..."}
                        value={state.artist.facebook}
                        name={"artist.facebook"}
                        onChange={handleChange}
                    />
                    <IconInput
                        label={"Instagram"}
                        type={"text"}
                        IconComponent={AiFillInstagram}
                        placeholder={"Ex: https://www.instagram.com/..."}
                        value={state.artist.instagram}
                        name={"artist.instagram"}
                        onChange={handleChange}
                    />
                    <IconInput
                        label={"LinkedIn"}
                        type={"text"}
                        IconComponent={AiFillLinkedin}
                        placeholder={"Ex: https://www.linkedin.com/..."}
                        value={state.artist.linkedin}
                        name={"artist.linkedin"}
                        onChange={handleChange}
                    />
                    <IconInput
                        label={"Site web"}
                        type={"text"}
                        IconComponent={FaEarthAfrica}
                        placeholder={"Ex: https://www.m4trix.com"}
                        value={state.artist.website}
                        name={"artist.website"}
                        onChange={handleChange}
                    />
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <GrTextAlignCenter/>
                                    </span>
                            <div>
                                <p>Biographie</p>
                            </div>
                        </div>
                        <Editor
                            onEditorChange={(content) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'artist.bio', value: content},
                                });
                            }
                            }
                        />
                    </div>
                </DashboardSectionItem>
                <div className={styles.topSpace}>
                    <Button
                        text={"Créer l'artiste"}
                        type={"submit"}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )

}