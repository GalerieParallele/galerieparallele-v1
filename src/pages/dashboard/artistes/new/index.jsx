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
import {useAuth} from "@/hooks/useAuth";

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
    // legal: {
    //     societe: undefined,
    //     adrNumVoie: undefined,
    //     adrRue: undefined,
    //     adrVille: undefined,
    //     adrCodePostal: undefined,
    //     siret: undefined,
    //     tva: undefined,
    //     tauxTva: undefined,
    //     numMaisonsDesArtistes: undefined,
    //     numSecuriteSociale: undefined,
    // }
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

    const {isLoading, user} = useAuth()

    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

    const [countriesLoading, setCountriesLoading] = useState(false);
    const [countries, setCountries] = useState([]);

    const [avatarURL, setAvatarURL] = useState(undefined);

    /**
     * Permet de générer un mot de passe aléatoire suivant les critères de sécurité
     * @param e
     */
    const handleGeneratePassword = (e) => {
        if (e) {
            e.preventDefault();
        }

        // Séparez les caractères par type pour un tirage séparé
        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const numChars = '0123456789';
        const specialChars = '#!*$^:/;.,?&';
        let password = '';

        // Assurez-vous d'ajouter au moins un caractère de chaque type
        password += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
        password += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
        password += numChars.charAt(Math.floor(Math.random() * numChars.length));
        password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

        // Complétez le reste du mot de passe avec des caractères aléatoires de tous les types
        const allChars = upperChars + lowerChars + numChars + specialChars;
        const charactersLength = allChars.length;
        for (let i = password.length; i < 10; i++) {
            password += allChars.charAt(Math.floor(Math.random() * charactersLength));
        }

        // Mélangez le mot de passe pour ne pas être prédictible
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        dispatch({
            type: 'UPDATE_FORM',
            payload: {field: 'user.password', value: password},
        });
    };


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

                // const artistId = artistsResponseJSON.id;
                //
                //
                // let legalResponse;
                //
                // legalResponse = await fetch(ROUTES.API.ARTISTES.LEGAL_INFORMATION, {
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/json'},
                //     body: JSON.stringify({
                //         ...state.legal,
                //         artistId
                //     }),
                // });
                //
                // const legalResponseJSON = await legalResponse.json();
                //
                // if (!legalResponse.ok) throw new Error(legalResponseJSON.message);


                Toast.fire({icon: 'success', title: 'Artiste créé avec succès'});

                await router.push(ROUTES.ADMIN.ARTISTES.EDIT.HOME(userid));

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
                <p>{user && user.lastname}</p>
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
                                type={""}
                                text={"Générer"}
                                onClick={handleGeneratePassword}
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
                {/*<DashboardSectionItem*/}
                {/*    sectionName={"Informations Juridique"}*/}
                {/*    description={"Ces informations ne seront pas visibles du grand public"}*/}
                {/*>*/}
                {/*    <IconInput*/}
                {/*        label={"Nom de société"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={BsBuildingsFill}*/}
                {/*        placeholder={"Ex: DP Gallery"}*/}
                {/*        name={"legal.societe"}*/}
                {/*        value={state.legal.societe}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Numéro de voie"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={IoHome}*/}
                {/*        placeholder={"Ex: 1"}*/}
                {/*        name={"legal.adrNumVoie"}*/}
                {/*        value={state.legal.adrNumVoie}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Nom de la voie"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={IoHome}*/}
                {/*        placeholder={"Ex: Rue de Paris"}*/}
                {/*        name={"legal.adrRue"}*/}
                {/*        value={state.legal.adrRue}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Ville"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={IoHome}*/}
                {/*        placeholder={"Ex: Paris"}*/}
                {/*        name={"legal.adrVille"}*/}
                {/*        value={state.legal.adrVille}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Code postal"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={IoHome}*/}
                {/*        placeholder={"Ex: 75000"}*/}
                {/*        name={"legal.adrCodePostal"}*/}
                {/*        value={state.legal.adrCodePostal}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Numéro de SIRET (non visible sur le site)"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={AiOutlineFieldNumber}*/}
                {/*        placeholder={"Ex: 12345678912345"}*/}
                {/*        name={"legal.siret"}*/}
                {/*        value={state.legal.siret}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Numéro de TVA (non visible sur le site)"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={AiOutlineFieldNumber}*/}
                {/*        placeholder={"Ex: 12345678912345"}*/}
                {/*        name={"legal.tva"}*/}
                {/*        value={state.legal.tva}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Taux de TVA applicable (non visible sur le site)"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={FaPercentage}*/}
                {/*        placeholder={"Ex: 5.5%"}*/}
                {/*        name={"legal.tauxTva"}*/}
                {/*        value={state.legal.tauxTva}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Numéro maison des artistes (non visible sur le site)"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={AiOutlineFieldNumber}*/}
                {/*        placeholder={"Ex: 12345678912345"}*/}
                {/*        name={"legal.numMaisonsDesArtistes"}*/}
                {/*        value={state.legal.numMaisonsDesArtistes}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*    <IconInput*/}
                {/*        label={"Numéro de sécurité sociale (non visible sur le site)"}*/}
                {/*        type={"text"}*/}
                {/*        IconComponent={AiOutlineFieldNumber}*/}
                {/*        placeholder={"Ex: 12345678912345"}*/}
                {/*        name={"legal.numSecuriteSociale"}*/}
                {/*        value={state.legal.numSecuriteSociale}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</DashboardSectionItem>*/}
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