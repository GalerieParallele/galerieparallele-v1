import ROUTES from "@/constants/ROUTES";

export const fetchArtists = async () => {
    try {
        const response = await fetch(ROUTES.API.ARTISTES.HOME, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 404) {
            return []; // Aucun artiste n'est disponible
        }

        if (!response.ok) {
            throw new Error(`Erreur HTTP: statut ${response.status}`);
        }

        let data = await response.json();
        return data.list || [];
    } catch (error) {
        console.error(error);
        throw error;
    }
};
