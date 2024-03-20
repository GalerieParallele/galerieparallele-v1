import React, {useReducer, useState} from "react";

import {useRouter} from "next/router";

import Admin from "@/components/admin/Admin";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import {useArtists} from "@/hooks/useArtists";
import styles from "@/pages/admin/artistes/new/Index.module.scss";
import Button from "@/components/ui/button/Button";
import Select from "react-select";
import ArtisteNewSectionItem from "@/components/admin/artistes/users/new/ArtisteNewSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import {MdTitle} from "react-icons/md";
import Editor from "@/components/ui/Editor";
import {CiTextAlignJustify} from "react-icons/ci";

const initialState = {
    saveTheDate: {
        title: undefined,
        content: undefined,
        date: undefined,
        photoUrl: undefined,
        artistId: undefined,
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

export default function AdminSaveTheDateIndex() {

    const router = useRouter();

    const {artists, artistLoading, error} = useArtists();

    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedArtistId, setSelectedArtistId] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const getArtistById = (id) => {
        return artists.find((artist) => artist.id === id);
    }

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
     * Permet de savoir si l'artiste à déjà des informations importantes
     * @returns {*}
     */
    const hasAlreadySaveTheDate = () => {
        return getArtistById(selectedArtistId.value).legalInformation;
    }

    return (
        <Admin>
            <main className={adminStyles.main}>
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>Save The Date</h1>
                        {
                            selectedArtistId && (
                                <Button
                                    text={"Ajouter une date"}
                                    onClick={() => console.log('submit')}
                                />
                            )
                        }
                        <div style={{
                            width: '100%',
                            maxWidth: '400px',
                            margin: 'auto',
                            marginTop: '20px',
                        }}>
                            <Select
                                placeholder={"Sélectionner un artiste"}
                                options={
                                    artists && artists.map((artist) => {
                                        return {
                                            value: artist.id,
                                            label: `${artist.user.firstname} ${artist.user.lastname}${artist.pseudo ? ` (${artist.pseudo})` : ''}`,
                                        }
                                    })
                                }
                                onChange={(e) => setSelectedArtistId(e)}
                                isSearchable
                                isClearable
                                isLoading={artistLoading}
                                isDisabled={artistLoading}
                            />
                        </div>
                    </div>
                    {/*{*/}

                    {/*    selectedArtistId ? (*/}
                    {/*            <div>*/}
                    {/*                <p>L&apos;artiste choisit est*/}
                    {/*                    : {getArtistById(selectedArtistId.value).user.firstname} {getArtistById(selectedArtistId.value).user.lastname}</p>*/}
                    {/*            </div>*/}
                    {/*        ) :*/}
                    {/*        (*/}
                    {/*            <div style={{*/}
                    {/*                height: '100%',*/}
                    {/*                width: '100%',*/}
                    {/*                display: 'flex',*/}
                    {/*                justifyContent: 'center',*/}
                    {/*                alignItems: 'center',*/}
                    {/*            }}>*/}
                    {/*                <p>*/}
                    {/*                    Veuillez sélectionner un artiste pour pouvoir visualiser, éditer et créer des*/}
                    {/*                    nouvelles dates de importantes.*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*}*/}
                    <ArtisteNewSectionItem
                        sectionName={"Save The Date"}
                        required>
                        <IconInput
                            label={"Titre"}
                            type={"text"}
                            IconComponent={MdTitle}
                            placeholder={"ex : Exposition de Mr.X"}
                            onChange={() => console.log("change")}
                            name={"saveTheDate.title"}
                            value={state.saveTheDate.title}
                            disabled={loading}
                            required
                        />
                        <div className={styles.specialSection}>
                            <div className={styles.specialSectionHead}>
                                    <span>
                                        <CiTextAlignJustify/>
                                    </span>
                                <div>
                                    <p>Contenu</p>
                                </div>
                            </div>
                            <Editor
                                onEditorChange={(content) => {
                                    dispatch({
                                        type: 'UPDATE_FORM',
                                        payload: {field: 'saveTheDate.content', value: content},
                                    });
                                }
                                }
                            />
                        </div>
                    </ArtisteNewSectionItem>
                    <div>
                        {/*TODO : Ajouter la liste des dates importantes de l'artiste sélectionné*/}
                    </div>
                </div>
            </main>
        </Admin>
    );
}