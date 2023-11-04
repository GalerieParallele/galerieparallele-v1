import Admin from "@/components/admin/Admin";
import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import Button from "@/components/items/button/Button";
import {AiOutlineArrowLeft, AiOutlineFieldNumber} from "react-icons/ai";
import ROUTES from "@/constants/ROUTES";
import styles from "@/pages/admin/artistes/new/Index.module.scss";
import ArtisteNewSectionItem from "@/components/admin/artistes/new/ArtisteNewSectionItem";
import IconInput from "@/components/items/iconinput/IconInput";

import {BsBuildingsFill} from "react-icons/bs";
import {IoHome} from "react-icons/io5";
import React, {useReducer, useState} from "react";
import {useRouter} from "next/router";
import {Toast} from "@/constants/ToastConfig";

const initialState = {
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
}

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

export default function AdminArtistLegalInfoIndex() {

    const router = useRouter();

    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

    /**
     * Permet de mettre à jour le state du formulaire
     * @param e
     */
    const handleChange = (e) => {

        const {name, value} = e.target;

        dispatch({
            type: 'UPDATE_FORM',
            payload: {field: name, value},
        });

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

        Toast.fire({icon: 'info', title: 'Création des informations juridiques en cours...'});

        try {

            Toast.fire({icon: 'success', title: 'Information juridique créée avec succès'});

            await router.push(ROUTES.ADMIN.ARTISTES.HOME);

        } catch (error) {

            console.error(error);

            Toast.fire({icon: 'error', title: error.message || 'Une erreur est survenue'});

        } finally {
            setLoading(false);
        }
    };

    return (
        <Admin>
            <main className={adminStyles.main}>
                {/*<div>*/}
                {/*    <Button*/}
                {/*        text={<AiOutlineArrowLeft/>}*/}
                {/*        onClick={() => router.push(ROUTES.ADMIN.ARTISTES.HOME)}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>Juridique</h1>
                        <h3>Création des informations juridiques</h3>
                        <Button
                            text={"Créer"}
                        />
                    </div>
                    <div className={styles.sectionList}>
                        <ArtisteNewSectionItem
                            sectionName={"Informations juridiques"}
                            description={"Aucunes de ces informations ne seront visible publiquement sur le site."}
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
                                placeholder={"Ex: Rue de la paix"}
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
                        </ArtisteNewSectionItem>
                    </div>
                </div>
            </main>
        </Admin>
    );
}