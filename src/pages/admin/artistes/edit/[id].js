import Admin from "@/components/admin/Admin";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import Button from "@/components/ui/button/Button";
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineArrowLeft} from "react-icons/ai";
import ROUTES from "@/constants/ROUTES";
import React, {useEffect, useReducer, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/pages/admin/artistes/new/Index.module.scss";
import ArtisteNewSectionItem from "@/components/admin/artistes/users/new/ArtisteNewSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import {MdEmail, MdPassword} from "react-icons/md";
import {RxAvatar} from "react-icons/rx";
import {BsFillFileEarmarkPersonFill, BsTelephoneFill} from "react-icons/bs";
import {IoHome} from "react-icons/io5";
import {FaEarthAfrica} from "react-icons/fa6";
import {GrTextAlignCenter} from "react-icons/gr";
import Editor from "@/components/ui/Editor";
import LittleSpinner from "@/components/ui/LittleSpinner";
import {Toast} from "@/constants/ToastConfig";
import BigSpinner from "@/components/ui/BigSpinner";
import StorageUtils from "@/utils/StorageUtils";

const initialState = {
    user: {
        email: "",
        avatarURL: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        street: "",
        city: "",
        postalCode: "",
    },
    artist: {
        pseudo: "",
        bio: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        website: "",
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

export default function AdminArtistEdit({artist}) {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [artistId, setArtistId] = useState(undefined);
    const [artistData, setArtistData] = useState(undefined);
    const [avatarURL, setAvatarURL] = useState(undefined);

    /**
     * Permet de mettre à jour le state du formulaire
     * @param e
     */
    const handleChange = (e) => {

        const {name, value, type, files} = e.target;

        console.log(value);

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

        setLoading(true)

        try {

            for (const [key, value] of Object.entries(state.user)) {
                if (value === undefined || value === "") {
                    delete state.user[key];
                }
            }

            for (const [key, value] of Object.entries(state.artist)) {
                if (value === undefined || value === "") {
                    delete state.artist[key];
                }
            }

            try {

                if (
                    Object.values(state.user).every(value => value === undefined)
                    && Object.values(state.artist).every(value => value === undefined)
                    && !avatarURL
                ) {
                    throw new Error("Il n'y a aucune modification à enregistrer.");
                }

                if (Object.values(state.user).some(value => value !== undefined) || avatarURL) {

                    if (avatarURL) {

                        const {
                            downloadURL,
                            error,
                            success
                        } = await StorageUtils.uploadFile(avatarURL, "users/" + artistData.user.id + "/avatar", null);

                        console.log("downloadURL", downloadURL);

                        if (!success) throw new Error(error.toString());

                        dispatch({
                            type: 'UPDATE_FORM',
                            payload: {field: 'user.avatarURL', value: downloadURL},
                        });

                    }

                    const userRequest = await fetch(ROUTES.API.USERS.HOME, {
                        method: "PATCH",
                        body: JSON.stringify({
                            id: artistData.user.id,
                            ...state.user,
                        }),
                    });

                    console.log("userRequest", userRequest);

                    const userResponse = await userRequest.json();

                    console.log("userResponse", userResponse);

                    if (userRequest.status !== 200) {
                        throw new Error(userResponse.message);
                    }

                    if (avatarURL) {
                        // TODO : Upload edit avatar and erase old one
                    }

                }

                if (Object.values(state.artist).some(value => value !== undefined)) {

                    const artistRequest = await fetch(ROUTES.API.ARTISTES.HOME, {
                        method: "PATCH",
                        body: JSON.stringify({
                            id: artistData.id,
                            ...state.artist,
                        }),
                    });

                    console.log("artistRequest", artistRequest);

                    const artistResponse = await artistRequest.json();

                    console.log("artistResponse", artistResponse);

                    if (artistRequest.status !== 200) {
                        throw new Error(artistResponse.message);
                    }

                }

                Toast.fire({
                    icon: "success",
                    title: "L'utilisateur a bien été modifié."
                })

                for (const [key] of Object.entries(state.user)) {
                    dispatch({
                        type: 'UPDATE_FORM',
                        payload: {field: `user.${key}`, value: ""},
                    });
                }

                for (const [key] of Object.entries(state.artist)) {
                    dispatch({
                        type: 'UPDATE_FORM',
                        payload: {field: `artist.${key}`, value: ""},
                    });
                }

            } catch (error) {

                console.log(error.message);

                Toast.fire({
                    icon: "error",
                    title: error.message || "Une erreur est survenue lors de l'édition de l'utilisateur."
                })

            }

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setArtistId(parseInt(router.query.id));
    }, [router.query.id, handleSubmit])

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

    if (loading) {
        return (
            <Admin>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <BigSpinner/>
                </div>
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
                                label={"Avatar (la modification peut prendre quelques minutes)"}
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