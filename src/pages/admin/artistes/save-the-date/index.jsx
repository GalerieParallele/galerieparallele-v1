import React, {useReducer, useState} from "react";

import {useRouter} from "next/router";

import Admin from "@/components/admin/Admin";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import {useArtists} from "@/hooks/useArtists";

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

    return (
        <Admin>
            <main className={adminStyles.main}>

            </main>
        </Admin>
    )
}