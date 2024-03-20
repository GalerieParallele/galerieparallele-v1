import React, {useEffect, useReducer, useState} from "react";

import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import Switch from 'react-switch';

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import PageLoader from "@/components/ui/PageLoader";
import Error from "@/components/error/Error";

import {FaEye, FaEyeSlash, FaQuestion} from "react-icons/fa";
import {RiQuestionAnswerLine} from "react-icons/ri";

import styles from './Index.module.scss';
import Button from "@/components/ui/button/Button";
import DashboardEditPotraitChinoisCard
    from "@/components/dashboard/artistes/edit/potrait-chinois/DashboardEditPotraitChinoisCard";
import LittleSpinner from "@/components/ui/LittleSpinner";

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
                    defaultOpen
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
                                disabled={loading}
                                checked={state.pc.private}
                                onChange={(e) => {
                                    dispatch({
                                        type: 'UPDATE_FORM',
                                        payload: {
                                            field: 'pc.private',
                                            value: e
                                        }
                                    })
                                }}
                                uncheckedIcon={<div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    color: 'white',
                                }}><FaEye/></div>}
                                checkedIcon={<div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    color: 'white',
                                }}><FaEyeSlash/></div>}
                            />
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
                <div className={styles.questionList}>
                    {
                        loading ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <LittleSpinner/>
                            </div>
                        ) : (
                            <>
                                <DashboardEditPotraitChinoisCard
                                    question={"Si j'étais un animal, je serais"}
                                    response={"Un chat"}
                                    visibility={true}
                                />
                                <DashboardEditPotraitChinoisCard
                                    question={"Si j'étais une fleur, je serais"}
                                    response={"Une rose"}
                                    visibility={true}
                                />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}