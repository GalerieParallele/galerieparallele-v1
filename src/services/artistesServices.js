import ROUTES from "@/constants/ROUTES";
import {createStandardResponse} from "@/utils/errorUtils";
import {STATIC_MESSAGES} from "@/constants/STATIC_MESSAGES";

async function handleResponse(response) {
    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Erreur HTTP: statut ${response.status}, détails: ${errorDetails}`);
    }
    return await response.json();
}

export const fetchArtists = async () => {
    try {
        const response = await fetch(ROUTES.API.ARTISTES.HOME, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        const data = await handleResponse(response);
        return createStandardResponse(true, data.list);
    } catch (error) {
        return createStandardResponse(false, null, {message: error.message});
    }
};

export const fetchArtistById = async (id) => {

    try {
        const response = await fetch(ROUTES.API.ARTISTES.GETBYID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });

        switch (response.status) {
            case 200:
                return createStandardResponse(true, await response.json());
            case 404:
                return createStandardResponse(false, null, {message: "L'identifiant de renseigné ne correspond à aucun artiste.", code: 404});
            case 403:
            case 401:
                return createStandardResponse(false, null, {
                    message: "Vous n'êtes pas autorisé à accéder à cette ressource.",
                    code: response.status
                });
            default:
                return createStandardResponse(false, null, {
                    message: STATIC_MESSAGES.API_SERVER_ERROR,
                    code: 500
                });
        }

    } catch (error) {

        return createStandardResponse(false, null, {
            message: STATIC_MESSAGES.API_SERVER_ERROR,
            code: 500
        });

    }
};
