import React, {useEffect, useReducer, useState} from "react";

import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import Switch from 'react-switch';

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import IconInput from "@/components/items/iconinput/IconInput";
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";

import {FaQuestion} from "react-icons/fa";
import {RiQuestionAnswerLine} from "react-icons/ri";

import styles from './Index.module.scss';
import Button from "@/components/items/button/Button";

const initialState = {
    pc: {
        question: undefined,
        response: undefined,
        private: false
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

export default function DashboardArtisteEditPortraitChinoisIndex() {

    const router = useRouter();

    const [state, dispatch] = useReducer(reducer, initialState);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [artisteId, setArtisteId] = useState(null);

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
                <DashboardSectionItem
                    sectionName={"Ajouter une question"}
                >
                    <IconInput
                        label={"Question"}
                        type={"text"}
                        IconComponent={FaQuestion}
                        placeholder={"Ex: Si j'étais un animal, je serais"}
                        onChange={(e) => {
                            // TODO : Modifier le state correspondant
                        }}
                        name={"pc.question"}
                        value={state.pc.question}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Réponse"}
                        type={"text"}
                        IconComponent={RiQuestionAnswerLine}
                        placeholder={"Ex: Un chat"}
                        onChange={(e) => {
                            // TODO : Modifier le state correspondant
                        }}
                        name={"pc.response"}
                        value={state.pc.response}
                        disabled={loading}
                        required
                    />
                    <div className={styles.bottomForm}>
                        <div className={styles.switchStatus}>
                            <p className={state.pc.private ? styles.inactiveState : styles.activeState}>Public</p>
                            <Switch
                                checked={state.pc.private}
                                offColor={"#ff0000"}
                                onChange={(e) => {
                                    dispatch({
                                        type: 'UPDATE_FORM',
                                        payload: {
                                            field: 'pc.private',
                                            value: e
                                        }
                                    })
                                }}/>
                            <p className={state.pc.private ? styles.activeState : styles.inactiveState}>Privé</p>
                        </div>
                        <Button
                            text={"Ajouter"}
                            onClick={() => {
                                // TODO : Ajouter la question
                            }}
                            disabled={loading}
                            isLoading={loading}
                            />
                    </div>
                </DashboardSectionItem>
            </div>
        </div>
    )
}