import ROUTES from "@/constants/ROUTES";

export const fetchActualities = async () => {

    try {

        const response = await fetch(ROUTES.API.ACTUALITY.HOME, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

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

        return {success: true, actualities: data.list};

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("Erreur lors de la récupération des oeuvres:", error);
        }

        return {success: false, error: {message: error.message, code: error.code}};

    }

};