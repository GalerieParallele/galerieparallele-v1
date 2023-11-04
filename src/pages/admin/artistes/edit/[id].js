import Admin from "@/components/admin/Admin";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import Button from "@/components/items/button/Button";
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineArrowLeft} from "react-icons/ai";
import ROUTES from "@/constants/ROUTES";
import React, {useEffect, useReducer, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/pages/admin/artistes/new/Index.module.scss";
import ArtisteNewSectionItem from "@/components/admin/artistes/new/ArtisteNewSectionItem";
import IconInput from "@/components/items/iconinput/IconInput";
import {MdEmail, MdPassword} from "react-icons/md";
import {RxAvatar} from "react-icons/rx";
import {BsFillFileEarmarkPersonFill, BsTelephoneFill} from "react-icons/bs";
import {IoHome} from "react-icons/io5";
import {FaEarthAfrica} from "react-icons/fa6";
import {GrTextAlignCenter} from "react-icons/gr";
import Editor from "@/components/items/Editor";
import LittleSpinner from "@/components/items/LittleSpinner";
import {Toast} from "@/constants/ToastConfig";

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
        bio: undefined,
        instagram: undefined,
        facebook: undefined,
        linkedin: undefined,
        website: undefined,
    },
    legal: {
        societe: undefined,
        adrNumVoie: undefined,
        adrRue: undefined,
        adrVille: undefined,
        adrCodePostal: undefined,
        siret: undefined,
        tva: undefined,
        numMaisonsDesArtistes: undefined,
        numSecuriteSociale: undefined
    }
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

export default function AdminArtistEdit({artist}) {

    const router = useRouter();

    const [state, dispatch] = useReducer(reducer, initialState);
    const [artistId, setArtistId] = useState(undefined);
    const [artistData, setArtistData] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setArtistId(parseInt(router.query.id));
    }, [router.query.id])

    useEffect(() => {
        if (artistId) {
            setLoading(true);
            fetch("/api/artistes/getbyid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: artistId
                })
            }).then(res => res.json()).then(data => {
                setArtistData(data);
            }).finally(
                setLoading(false)
            )
        }
    }, [artist, artistId, state, state.artist, state.user])

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
     * Permet de générer un mot de passe aléatoire
     * @param e
     */
    const handleGeneratePassword = (e) => {

        if (e) {
            e.preventDefault();
        }

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#!*$^:/;.,?&';
        let password = '';
        const charactersLength = characters.length;
        const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#!*$^:/;.,?&]).{8,}$');

        for (let i = 0; i < 8; i++) {
            password += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        if (regex.test(password)) {
            dispatch({
                type: 'UPDATE_FORM',
                payload: {field: 'user.password', value: password},
            });
        } else {
            handleGeneratePassword(e);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (Object.values(state.user).every(x => (x === null || x === undefined || x === ""))) {
                throw new Error("Il n'y a aucune nouvelle information à enregistrer.");
            }

            const userResponse = await fetch(ROUTES.API.USERS, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body:{
                    user: state.user
                }
            });

            const userJSON = await userResponse.json();

            if (!userResponse.ok) {
                Toast.fire({
                    icon: "error",
                    title: userJSON.message | "Une erreur est survenue lors de la mise à jour du compte utilisateur."
                })
            }

        } catch (error){

            Toast.fire({
                icon: "error",
                title: error.message | "Une erreur est survenue lors de la mise à jour du compte utilisateur."
            })

        }

    }

    if (loading) {
        return (
            <Admin>
                <p>Chargement en cours...</p>
            </Admin>
        )
    }

    if (artistData && !artistData.id) {
        return (
            <Admin>
                <p>L&lsquo;id renseigné ne correspond à aucun artiste.</p>
            </Admin>
        )
    }

    return (
        <Admin>
            <main className={adminStyles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft/>}
                        onClick={() => router.push(ROUTES.ADMIN.ARTISTES.HOME)}
                    />
                </div>
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>Artistes</h1>
                        <h3>Edition d{artistData ? "e l'artiste:" : "'un artiste"}</h3>
                        {artistData && artistData.pseudo ? <h4>{artistData.pseudo}</h4> : <LittleSpinner/>}
                        <Button
                            text={"Enregistrer"}
                            onClick={handleSubmit}
                        />
                    </div>
                    <div className={styles.sectionList}>
                        <ArtisteNewSectionItem
                            sectionName={"Compte utilisateur"}
                        >
                            <IconInput
                                label={"E-mail"}
                                type={"email"}
                                IconComponent={MdEmail}
                                placeholder={artistData ? artistData.user.email : "Ex: example@mail.com"}
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
                                placeholder={artistData ? artistData.user.firstname : "Ex: Jean"}
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
                                placeholder={artistData ? artistData.user.lastname : "Ex: Dupont"}
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
                                placeholder={artistData ? artistData.user.phone : "Ex: 0769141995"}
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
                                placeholder={artistData ? artistData.user.street : "Ex: 1 rue de la paix"}
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
                                placeholder={artistData ? artistData.user.city : "Ex: Paris"}
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
                                placeholder={artistData ? artistData.user.postalCode : "Ex: 75000"}
                                onChange={handleChange}
                                name={"user.postalCode"}
                                value={state.user.postalCode}
                                disabled={loading}
                                required
                            />
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Informations artiste"}
                        >
                            <IconInput
                                label={"Nom d'artiste"}
                                type={"text"}
                                IconComponent={BsFillFileEarmarkPersonFill}
                                placeholder={artistData ? artistData.pseudo : "Ex: M4TRIX"}
                                value={state.artist.pseudo}
                                name={"artist.pseudo"}
                                onChange={handleChange}
                            />
                            <IconInput
                                label={"Facebook"}
                                type={"text"}
                                IconComponent={AiFillFacebook}
                                placeholder={artistData ? artistData.facebook : "Ex: https://www.facebook.com/..."}
                                value={state.artist.facebook}
                                name={"artist.facebook"}
                                onChange={handleChange}
                            />
                            <IconInput
                                label={"Instagram"}
                                type={"text"}
                                IconComponent={AiFillInstagram}
                                placeholder={artistData ? artistData.instagram : "Ex: https://www.instagram.com/..."}
                                value={state.artist.instagram}
                                name={"artist.instagram"}
                                onChange={handleChange}
                            />
                            <IconInput
                                label={"LinkedIn"}
                                type={"text"}
                                IconComponent={AiFillLinkedin}
                                placeholder={artistData ? artistData.linkedin : "Ex: https://www.linkedin.com/..."}
                                value={state.artist.linkedin}
                                name={"artist.linkedin"}
                                onChange={handleChange}
                            />
                            <IconInput
                                label={"Site web"}
                                type={"text"}
                                IconComponent={FaEarthAfrica}
                                placeholder={artistData ? artistData.website : "Ex: https://www.m4trix.com"}
                                value={state.artist.website}
                                name={"artist.website"}
                                onChange={handleChange}
                            />
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                    <span>
                                        <GrTextAlignCenter/>
                                    </span>
                                    <div>
                                        <p>Biographie</p>
                                    </div>
                                </div>
                                {
                                    artistData && <Editor
                                        onEditorChange={(content) => {
                                            dispatch({
                                                type: 'UPDATE_FORM',
                                                payload: {field: 'artist.bio', value: content},
                                            });
                                        }
                                        }
                                        defaultContent={artistData.bio}
                                    />
                                }
                            </div>
                        </ArtisteNewSectionItem>
                    </div>
                </div>
            </main>
        </Admin>
    )
}