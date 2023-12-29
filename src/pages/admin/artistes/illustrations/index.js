import {useRouter} from "next/router";
import {useArtists} from "@/hooks/useArtists";
import React, {useReducer, useState} from "react";
import Admin from "@/components/admin/Admin";
import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from "@/pages/admin/artistes/new/Index.module.scss";
import Select from "react-select";

const initialState = {
    saveTheDate: {
        mediaURLs: undefined,
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

export default function AdminIllustrationsIndex() {

    const router = useRouter();

    const {artists, loading, error} = useArtists();

    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedArtistId, setSelectedArtistId] = useState(undefined);

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
     * Permet de savoir si l'artiste à déjà des illustrations
     * @returns {*}
     */
    const hasAlreadyIllustrations = () => {
        return getArtistById(selectedArtistId.value).illustrations;
    }

    return (
        <Admin>
            <main className={adminStyles.main}>
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>Illustration(s)</h1>
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
                                isLoading={loading}
                                isDisabled={loading}
                            />
                        </div>
                    </div>
                    {

                        selectedArtistId ? (
                                <div>
                                    <p>L&apos;artiste choisit est
                                        : {getArtistById(selectedArtistId.value).user.firstname} {getArtistById(selectedArtistId.value).user.lastname}</p>
                                </div>
                            ) :
                            (
                                <div style={{
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <p>
                                        Veuillez sélectionner un artiste pour pouvoir visualiser, éditer ou ajouter une ou plusieurs illustrations.
                                    </p>
                                </div>
                            )
                    }
                </div>
            </main>
        </Admin>
    );
}