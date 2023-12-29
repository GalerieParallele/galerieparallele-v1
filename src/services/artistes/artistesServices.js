import ROUTES from "@/constants/ROUTES";

export const fetchArtists = async () => {
    try {
        const response = await fetch(ROUTES.API.ARTISTES.HOME, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Une erreur est survenue lors de la récupération des artistes');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};