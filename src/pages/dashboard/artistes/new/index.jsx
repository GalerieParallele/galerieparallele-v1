import React, {useEffect, useReducer, useState} from "react";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import IconInput from "@/components/items/iconinput/IconInput";
import Button from "@/components/items/button/Button";

import {MdEmail, MdPassword} from "react-icons/md";
import {RxAvatar} from "react-icons/rx";
import {BsBuildingsFill, BsFillFileEarmarkPersonFill, BsTelephoneFill} from "react-icons/bs";
import {IoHome} from "react-icons/io5";

import styles from './Index.module.scss';
import sectionStyles from '@/components/dashboard/items/sections/DashboardSectionItem.module.scss'
import Select from "react-select";
import {FaFlag} from "react-icons/fa";
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineFieldNumber} from "react-icons/ai";
import {FaEarthAfrica} from "react-icons/fa6";
import {GrTextAlignCenter} from "react-icons/gr";
import Editor from "@/components/items/Editor";
import ROUTES from "@/constants/ROUTES";


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
        // TODO : Ajouter nationalité
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
        numSecuriteSociale: undefined,
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

export default function DashboardArtistesNewIndex() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [countriesLoading, setCountriesLoading] = useState(false);
    const [countries, setCountries] = useState([]);

    /**
     * Permet de mettre à jour le state du formulaire
     * @param e
     */
    const handleChange = (e) => {

        const {name, value, type, files} = e.target;

        dispatch({
            type: 'UPDATE_FORM',
            payload: {field: name, value},
        });
    }
    /**
     * Permet de lancer une procédure une fois le formulaire soumis
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        console.log(state);
    }

    /**
     * Permet de générer un mot de passe aléatoire suivant les critères de sécurité
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

        for (let i = 0; i < 20; i++) {
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

    useEffect(() => {
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
                console.log(countries);
            });
    }, []);


    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.HOME}
            />
            <div className={styles.content}>
                <div className={styles.topSpace}>
                    <Button
                        text={"Créer l'artiste"}
                    />
                </div>
                <DashboardSectionItem
                    sectionName={"Informations Utilisateur"}
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
                    required
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
                            closeMenuOnSelect={false}
                            defaultValue={[]}
                            isMulti
                            options={
                                countries.map((country) => {
                                    console.log(country);
                                    return {
                                        value: country.translations.fra.common,
                                        label: country.translations.fra.common
                                    }
                                })}
                            animate={true}
                            isLoading={countriesLoading}
                            isDisabled={countriesLoading}
                            onChange={() => console.log("change")}
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
                <DashboardSectionItem
                    sectionName={"Informations Juridique"}
                    description={"Ces informations ne seront pas visibles du grand public"}
                >
                    <IconInput
                        label={"Nom de société"}
                        type={"text"}
                        IconComponent={BsBuildingsFill}
                        placeholder={"Ex: DP Gallery"}
                        name={"legal.societe"}
                        value={state.legal.societe}
                        onChange={handleChange}
                        required
                    />
                    <IconInput
                        label={"Numéro de voie"}
                        type={"text"}
                        IconComponent={IoHome}
                        placeholder={"Ex: 1"}
                        name={"legal.adrNumVoie"}
                        value={state.legal.adrNumVoie}
                        onChange={handleChange}
                        required
                    />
                    <IconInput
                        label={"Nom de la voie"}
                        type={"text"}
                        IconComponent={IoHome}
                        placeholder={"Ex: Rue de Paris"}
                        name={"legal.adrRue"}
                        value={state.legal.adrRue}
                        onChange={handleChange}
                        required
                    />
                    <IconInput
                        label={"Ville"}
                        type={"text"}
                        IconComponent={IoHome}
                        placeholder={"Ex: Paris"}
                        name={"legal.adrVille"}
                        value={state.legal.adrVille}
                        onChange={handleChange}
                        required
                    />
                    <IconInput
                        label={"Code postal"}
                        type={"text"}
                        IconComponent={IoHome}
                        placeholder={"Ex: 75000"}
                        name={"legal.adrCodePostal"}
                        value={state.legal.adrCodePostal}
                        onChange={handleChange}
                        required
                    />
                    <IconInput
                        label={"Numéro de SIRET (non visible sur le site)"}
                        type={"text"}
                        IconComponent={AiOutlineFieldNumber}
                        placeholder={"Ex: 12345678912345"}
                        name={"legal.siret"}
                        value={state.legal.siret}
                        onChange={handleChange}
                        required
                    />
                    <IconInput
                        label={"Numéro de TVA (non visible sur le site)"}
                        type={"text"}
                        IconComponent={AiOutlineFieldNumber}
                        placeholder={"Ex: 12345678912345"}
                        name={"legal.tva"}
                        value={state.legal.tva}
                        onChange={handleChange}
                        required
                    />
                    <IconInput
                        label={"Numéro maison des artistes (non visible sur le site)"}
                        type={"text"}
                        IconComponent={AiOutlineFieldNumber}
                        placeholder={"Ex: 12345678912345"}
                        name={"legal.numMaisonsDesArtistes"}
                        value={state.legal.numMaisonsDesArtistes}
                        onChange={handleChange}
                        required
                    />
                    <IconInput
                        label={"Numéro de sécurité sociale (non visible sur le site)"}
                        type={"text"}
                        IconComponent={AiOutlineFieldNumber}
                        placeholder={"Ex: 12345678912345"}
                        name={"legal.numSecuriteSociale"}
                        value={state.legal.numSecuriteSociale}
                        onChange={handleChange}
                        required
                    />
                </DashboardSectionItem>
                {/*<DashboardSectionItem*/}
                {/*    sectionName={"Relations contractuelles"}*/}
                {/*>*/}

                {/*</DashboardSectionItem>*/}
                {/*<DashboardSectionItem*/}
                {/*    sectionName={"Save The Date"}*/}
                {/*>*/}

                {/*</DashboardSectionItem>*/}
                {/*<DashboardSectionItem*/}
                {/*    sectionName={"Illustration(s)"}*/}
                {/*    >*/}

                {/*</DashboardSectionItem>*/}
            </div>
        </div>
    )

}