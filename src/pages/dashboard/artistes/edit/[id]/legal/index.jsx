import styles from './Index.module.scss';
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import {useRouter} from "next/router";
import React, {useEffect, useReducer, useState} from "react";
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";
import ROUTES from "@/constants/ROUTES";
import IconInput from "@/components/items/iconinput/IconInput";
import {BsBuildingsFill} from "react-icons/bs";
import {IoHome} from "react-icons/io5";
import {AiOutlineFieldNumber} from "react-icons/ai";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import Button from "@/components/items/button/Button";

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

export default function DashboardArtisteEditLegal() {

    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [artisteId, setArtisteId] = useState(null);

    const handleChange = (e) => {
        console.log(state);
    }

    useEffect(() => {
        if (router.query.id && /^\d+$/.test(router.query.id)) {
            setArtisteId(router.query.id);
            setError(false);
        } else {
            setError(true);
        }
        setLoading(false);
    }, [router, router.query.id]);

    if (loading) {
        return <PageLoader/>;
    }

    if (error) {
        return <Error
            code={404}
            title={"Artiste introuvable"}
            message={"L'artiste avec l'identifiant \"" + router.query.id + "\" n'existe pas"}
        />;
    }

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.HOME(artisteId)}
            />
            <div className={styles.content}>
                <div className={styles.topSpace}>
                    <Button
                        text={"Enregistrer"}
                    />
                </div>
                <DashboardSectionItem
                    sectionName={"Informations Juridique"}
                    description={"Ces informations ne seront pas visibles du grand public"}
                    defaultOpen
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
            </div>
        </div>
    )
}