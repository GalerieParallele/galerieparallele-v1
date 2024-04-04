import ROUTES from "@/constants/ROUTES";

export const fetchOeuvres = async () => {

    try {

        const response = await fetch(ROUTES.API.OEUVRES.HOME, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {

            const errorDetails = await response.text();

            throw {
                message: `Erreur HTTP: statut ${response.status}, détails: ${errorDetails}`,
                code: response.status
            };

        }

        let data = await response.json();

        if (!data || !Array.isArray(data.list)) {
            throw {message: "Format de réponse invalide", code: 'InvalidFormat'};
        }

        return {success: true, oeuvres: data.list};

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("Erreur lors de la récupération des oeuvres:", error);
        }

        return {success: false, error: {message: error.message, code: error.code}};

    }
}

export const fetchOeuvreById = async (id) => {

    try {

        const response = await fetch(ROUTES.API.OEUVRES.GETBYID, {
            method: 'POST',
            body: JSON.stringify({id}),
        });

        if (!response.ok) {

            const errorDetails = await response.text();

            throw {
                message: `Erreur HTTP: statut ${response.status}, détails: ${errorDetails}`,
                code: response.status
            };

        }

        let data = await response.json();

        if (!data) {
            throw {message: "Format de réponse invalide", code: 'InvalidFormat'};
        }

        return {success: true, oeuvre: data};

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("[Service] Erreur lors de la récupération des oeuvres:", error);
        }

        return {success: false, error: {message: error.message, code: error.code}};

    }
};