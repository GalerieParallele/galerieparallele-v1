import Admin from "@/components/admin/Admin";
import Button from "@/components/items/button/Button";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiOutlineArrowLeft,
    AiOutlineFieldNumber
} from "react-icons/ai";
import ROUTES from "@/constants/ROUTES";
import React, {useEffect, useReducer, useState} from "react";
import {useRouter} from "next/router";

import makeAnimated from 'react-select/animated';

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from './Index.module.scss';
import IconInput from "@/components/items/iconinput/IconInput";
import {MdEmail, MdPassword} from "react-icons/md";
import {RxAvatar} from "react-icons/rx";
import {BsBuildingsFill, BsFillFileEarmarkPersonFill, BsTelephoneFill} from "react-icons/bs";
import ArtisteNewSectionItem from "@/components/admin/artistes/new/ArtisteNewSectionItem";
import {IoHome, IoTextOutline} from "react-icons/io5";
import Editor from "@/components/items/Editor";
import {GrTextAlignCenter} from "react-icons/gr";
import {FaEarthAfrica} from "react-icons/fa6";
import {Toast} from "@/constants/ToastConfig";
import StorageUtils from "@/utils/StorageUtils";
import {BiGroup, BiSolidGroup} from "react-icons/bi";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

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

export default function ArtisteAdminNew() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [avatarURL, setAvatarURL] = useState(undefined);

    const router = useRouter();
    const animatedComponents = makeAnimated();

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
     * Permet de gérer la soumission du formulaire
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {

        if (e) {
            e.preventDefault();
        }

        setLoading(true);

        Toast.fire({icon: 'info', title: 'Création du compte utilisateur...'});

        try {

            let avatarURLToUse = state.user.avatarURL;

            if (avatarURL) {

                const {downloadURL, error, success} = await StorageUtils.uploadFile(avatarURL, 'avatar', null);

                if (!success) throw new Error(error.toString());

                avatarURLToUse = downloadURL;

            }

            const userResponse = await fetch('/api/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...state.user,
                    avatarURL: avatarURLToUse,
                }),
            });

            const userResponseJson = await userResponse.json();

            if (!userResponse.ok) throw new Error(userResponseJson.message);

            const user = userResponseJson.user;
            const userid = user.id;

            const artistResponse = await fetch('/api/artistes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...state.artist,
                    userid,
                }),
            });

            const artistsResponseJSON = await artistResponse.json();

            if (!artistResponse.ok) throw new Error(artistsResponseJSON.message);

            if (Object.keys(state.legal).length > 0) {


                const allFieldAreNotEmpty = Object.values(state.legal).every((value) => value !== undefined || value !== '');

                if (!allFieldAreNotEmpty) throw new Error('Veillez à remplir tous les champs de la section légale ou à laisser tous les champs vides.');

                const artistId = artistsResponseJSON.id;

                const legalInformationResponse = await fetch('/api/legalsinformation', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        ...state.legal,
                        artistId,
                    }),
                });

                const legalInformationResponseJSON = await legalInformationResponse.json();

                if (!legalInformationResponse.ok) throw new Error(legalInformationResponseJSON.message);

            }

            Toast.fire({icon: 'success', title: 'Artiste créé avec succès !'});

        } catch (error) {

            console.error(error);

            Toast.fire({icon: 'error', title: error.message || 'Une erreur est survenue'});

        } finally {
            setLoading(false);
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
                        <h3>Création d&apos;un nouvel artiste</h3>
                        <Button
                            text={"Créer"}
                            onClick={handleSubmit}
                            isLoading={loading}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.sectionList}>
                        <ArtisteNewSectionItem
                            sectionName={"Compte utilisateur"}
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
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Informations artiste"}
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
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
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
                        </ArtisteNewSectionItem>
                        {/*<ArtisteNewSectionItem*/}
                        {/*    sectionName={"Informations juridiques"}*/}
                        {/*    description={"Aucunes de ces informations ne seront visible publiquement sur le site."}*/}
                        {/*>*/}
                        {/*    <IconInput*/}
                        {/*        label={"Nom de société"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={BsBuildingsFill}*/}
                        {/*        placeholder={"Ex: DP Gallery"}*/}
                        {/*        name={"legal.societe"}*/}
                        {/*        value={state.legal.societe}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Numéro de voie"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={IoHome}*/}
                        {/*        placeholder={"Ex: 1"}*/}
                        {/*        name={"legal.adrNumVoie"}*/}
                        {/*        value={state.legal.adrNumVoie}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Nom de la voie"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={IoHome}*/}
                        {/*        placeholder={"Ex: Rue de la paix"}*/}
                        {/*        name={"legal.adrRue"}*/}
                        {/*        value={state.legal.adrRue}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Ville"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={IoHome}*/}
                        {/*        placeholder={"Ex: Paris"}*/}
                        {/*        name={"legal.adrVille"}*/}
                        {/*        value={state.legal.adrVille}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Code postal"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={IoHome}*/}
                        {/*        placeholder={"Ex: 75000"}*/}
                        {/*        name={"legal.adrCodePostal"}*/}
                        {/*        value={state.legal.adrCodePostal}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Numéro de SIRET (non visible sur le site)"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={AiOutlineFieldNumber}*/}
                        {/*        placeholder={"Ex: 12345678912345"}*/}
                        {/*        name={"legal.siret"}*/}
                        {/*        value={state.legal.siret}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Numéro de TVA (non visible sur le site)"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={AiOutlineFieldNumber}*/}
                        {/*        placeholder={"Ex: 12345678912345"}*/}
                        {/*        name={"legal.tva"}*/}
                        {/*        value={state.legal.tva}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Numéro maison des artistes (non visible sur le site)"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={AiOutlineFieldNumber}*/}
                        {/*        placeholder={"Ex: 12345678912345"}*/}
                        {/*        name={"legal.numMaisonsDesArtistes"}*/}
                        {/*        value={state.legal.numMaisonsDesArtistes}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Numéro de sécurité sociale (non visible sur le site)"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={AiOutlineFieldNumber}*/}
                        {/*        placeholder={"Ex: 12345678912345"}*/}
                        {/*        name={"legal.numSecuriteSociale"}*/}
                        {/*        value={state.legal.numSecuriteSociale}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</ArtisteNewSectionItem>*/}
                        {/*<ArtisteNewSectionItem*/}
                        {/*    sectionName={"Relations contractuelles"}*/}
                        {/*    description={"Aucunes de ces informations ne seront visible publiquement sur le site."}*/}
                        {/*>*/}
                        {/*    <p>Prochainement...</p>*/}
                        {/*</ArtisteNewSectionItem>*/}
                        {/*<ArtisteNewSectionItem*/}
                        {/*    sectionName={"Illustrations"}*/}
                        {/*>*/}
                        {/*    <p>Prochainement...</p>*/}
                        {/*</ArtisteNewSectionItem>*/}
                        {/*<ArtisteNewSectionItem*/}
                        {/*    sectionName={"Save The Date"}*/}
                        {/*>*/}
                        {/*    <p>Prochainement...</p>*/}
                        {/*</ArtisteNewSectionItem>*/}
                        {/*<ArtisteNewSectionItem*/}
                        {/*    sectionName={"Oeuvres"}*/}
                        {/*>*/}
                        {/*    <IconInput*/}
                        {/*        label={"Nom de l'oeuvre"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={IoTextOutline}*/}
                        {/*        placeholder={"Ex: Sur le chemin de la vie"}*/}
                        {/*    />*/}
                        {/*    <div className={styles.specialSection}>*/}
                        {/*        <div className={styles.specialSectionHead}>*/}
                        {/*                <span>*/}
                        {/*                    <BiSolidGroup/>*/}
                        {/*                </span>*/}
                        {/*            <div>*/}
                        {/*                <p>Artistes connu</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <Select*/}
                        {/*            placeholder={"Sélectionner un ou plusieurs artistes connu"}*/}
                        {/*            closeMenuOnSelect={false}*/}
                        {/*            components={animatedComponents}*/}
                        {/*            defaultValue={[]}*/}
                        {/*            isMulti*/}
                        {/*            options={[*/}
                        {/*                {value: '1', label: 'Richard Orlinksi'},*/}
                        {/*                {value: '2', label: 'Jean-Michel Basquiat'},*/}
                        {/*                {value: '3', label: 'Andy Warhol'},*/}
                        {/*                {value: '4', label: 'Keith Haring'},*/}
                        {/*                {value: '5', label: 'Banksy'},*/}
                        {/*                {value: '6', label: 'JR'},*/}
                        {/*                {value: '7', label: 'Invader'},*/}
                        {/*                {value: '8', label: 'Kaws'},*/}
                        {/*                {value: '9', label: 'Shepard Fairey'},*/}
                        {/*                {value: '10', label: 'Vhils'},*/}
                        {/*            ]}*/}
                        {/*            onChange={handleChangeArtist}*/}
                        {/*            value={formData.oeuvreArtist}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.specialSection}>*/}
                        {/*        <div className={styles.specialSectionHead}>*/}
                        {/*                <span>*/}
                        {/*                    <BiGroup/>*/}
                        {/*                </span>*/}
                        {/*            <div>*/}
                        {/*                <p>Artistes non référencé</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <CreatableSelect*/}
                        {/*            placeholder={"Sélectionner un ou plusieurs artistes non référencé"}*/}
                        {/*            closeMenuOnSelect={false}*/}
                        {/*            components={animatedComponents}*/}
                        {/*            defaultValue={[]}*/}
                        {/*            isMulti*/}
                        {/*            options={[*/}
                        {/*                {value: '1', label: 'Mathieu'},*/}
                        {/*                {value: '2', label: 'Jean'},*/}
                        {/*                {value: '3', label: 'Pierre'},*/}
                        {/*                {value: '4', label: 'Paul'},*/}
                        {/*                {value: '5', label: 'Jacques'},*/}
                        {/*                {value: '6', label: 'Jean-Pierre'},*/}
                        {/*                {value: '7', label: 'Jean-Jacques'},*/}
                        {/*                {value: '8', label: 'Jean-Paul'},*/}
                        {/*                {value: '9', label: 'Pierre-Paul'},*/}
                        {/*                {value: '10', label: 'Pierre-Jacques'},*/}
                        {/*            ]}*/}
                        {/*            onChange={handleChangeUnknownArtist}*/}
                        {/*            value={formData.oeuvreUnknownArtist}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.specialSection}>*/}
                        {/*        <div className={styles.specialSectionHead}>*/}
                        {/*                <span>*/}
                        {/*                    <BiImageAdd/>*/}
                        {/*                </span>*/}
                        {/*            <div>*/}
                        {/*                <p>Image(s)</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <MultipleImages/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.specialSection}>*/}
                        {/*        <div className={styles.specialSectionHead}>*/}
                        {/*                <span>*/}
                        {/*                    <BsHammer/>*/}
                        {/*                </span>*/}
                        {/*            <div>*/}
                        {/*                <p>Type de l&lsquo;oeuvre</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <CreatableSelect*/}
                        {/*            placeholder={"Sélectionner un ou plusieurs type pour l'oeuvre"}*/}
                        {/*            closeMenuOnSelect={false}*/}
                        {/*            components={animatedComponents}*/}
                        {/*            defaultValue={[]}*/}
                        {/*            isMulti*/}
                        {/*            options={[*/}
                        {/*                {value: '1', label: 'Sculpture'},*/}
                        {/*                {value: '2', label: 'Peinture'},*/}
                        {/*                {value: '3', label: 'Photographie'},*/}
                        {/*                {value: '4', label: 'Dessin'},*/}
                        {/*                {value: '5', label: 'Graffiti'},*/}
                        {/*                {value: '6', label: 'Street Art'},*/}
                        {/*                {value: '7', label: 'Art numérique'},*/}
                        {/*                {value: '8', label: 'Art vidéo'},*/}
                        {/*                {value: '9', label: 'Art sonore'},*/}
                        {/*                {value: '10', label: 'Art performance'},*/}
                        {/*            ]}*/}
                        {/*            onChange={handleChangeOeurveType}*/}
                        {/*            value={formData.oeuvreType}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.specialSection}>*/}
                        {/*        <div className={styles.specialSectionHead}>*/}
                        {/*                <span>*/}
                        {/*                    <FiHash/>*/}
                        {/*                </span>*/}
                        {/*            <div>*/}
                        {/*                <p>Tags</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <CreatableSelect*/}
                        {/*            placeholder={"Sélectionner un ou plusieurs tags pour l'oeuvre"}*/}
                        {/*            closeMenuOnSelect={false}*/}
                        {/*            components={animatedComponents}*/}
                        {/*            defaultValue={[]}*/}
                        {/*            isMulti*/}
                        {/*            options={[*/}
                        {/*                {value: '1', label: 'Sculpture'},*/}
                        {/*                {value: '2', label: 'Peinture'},*/}
                        {/*                {value: '3', label: 'Photographie'},*/}
                        {/*                {value: '4', label: 'Dessin'},*/}
                        {/*                {value: '5', label: 'Graffiti'},*/}
                        {/*                {value: '6', label: 'Street Art'},*/}
                        {/*                {value: '7', label: 'Art numérique'},*/}
                        {/*                {value: '8', label: 'Art vidéo'},*/}
                        {/*                {value: '9', label: 'Art sonore'},*/}
                        {/*                {value: '10', label: 'Art performance'},*/}
                        {/*            ]}*/}
                        {/*            onChange={handleChangeTags}*/}
                        {/*            value={formData.tags}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.specialSection}>*/}
                        {/*        <div className={styles.specialSectionHead}>*/}
                        {/*            <span>*/}
                        {/*                <GrTextAlignCenter/>*/}
                        {/*            </span>*/}
                        {/*            <div>*/}
                        {/*                <p>Description de l&lsquo;oeuvre</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <Editor/>*/}
                        {/*    </div>*/}
                        {/*    <div className={styles.specialSection}>*/}
                        {/*        <div className={styles.specialSectionHead}>*/}
                        {/*            <span>*/}
                        {/*                <BiLaugh/>*/}
                        {/*            </span>*/}
                        {/*            <div>*/}
                        {/*                <p>Anecdote</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <Editor/>*/}
                        {/*    </div>*/}
                        {/*    <IconInput*/}
                        {/*        label={"Hauteur (en cm)"}*/}
                        {/*        type={"number"}*/}
                        {/*        IconComponent={AiOutlineColumnHeight}*/}
                        {/*        placeholder={"Ex: 120"}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Longueur (en cm)"}*/}
                        {/*        type={"number"}*/}
                        {/*        IconComponent={AiOutlineColumnWidth}*/}
                        {/*        placeholder={"Ex: 80"}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Largeur (en cm)"}*/}
                        {/*        type={"number"}*/}
                        {/*        IconComponent={IoIosResize}*/}
                        {/*        placeholder={"Ex: 30"}*/}
                        {/*    />*/}
                        {/*    <div className={styles.specialSection}>*/}
                        {/*        <div className={styles.specialSectionHead}>*/}
                        {/*            <span>*/}
                        {/*                <PiListNumbers/>*/}
                        {/*            </span>*/}
                        {/*            <div>*/}
                        {/*                <p>Numérotation</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <ArtisteNumerotationItem/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <IconInput*/}
                        {/*        label={"Support et matériau(x) utilisé(s)"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={PiStool}*/}
                        {/*        placeholder={"Ex: Papier photo, Toile..."}*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Technique(s) utilisée(s)"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={FaHandHoldingHeart}*/}
                        {/*        placeholder={"Ex: Peinture à l'huile, Acrylique..."}*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Encadrement"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={PiUserRectangleBold}*/}
                        {/*        placeholder={"Ex: Caisse américaine, Cadre..."}*/}
                        {/*    />*/}
                        {/*    <IconInput*/}
                        {/*        label={"Signature"}*/}
                        {/*        type={"text"}*/}
                        {/*        IconComponent={FaSignature}*/}
                        {/*        placeholder={"Ex: Signé en bas à droite"}*/}
                        {/*    />*/}
                        {/*</ArtisteNewSectionItem>*/}
                    </div>
                </div>
            </main>
        </Admin>
    );


}