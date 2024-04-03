import ROUTES from "@/constants/ROUTES";

/**
 * Permet de récupérer la liste des couleurs disponibles.
 * @returns {Promise<{success: boolean, colors}|{success: boolean, error: {code, message}}>} La liste des couleurs disponibles.
 */
export const fetchColors = async () => {

    try {

        const response = await fetch(ROUTES.API.COULEURS.HOME, {
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

        return {success: true, colors: data.list};

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("Erreur lors de la récupération des couleurs:", error);
        }

        return {success: false, error: {message: error.message, code: error.code}};
    }


};

/**
 * Permet de récupérer une couleur par son code hexadécimal.l
 * @param {string} hexa - Le code hexadécimal de la couleur.
 * @returns {Promise<{hexa: string, name: string}|{success: boolean, error: {code, message}}>} La couleur correspondante.
 * @example fetchColorByHexa("#FF0000")
 */
export const fetchColorByHexa = async (hexa) => {
    try {
        const response = await fetchColors();
        if (response.success) {
            return response.colors.find(color => color.hexa === hexa);
        } else {
            return response;
        }
    } catch (error) {
        // Gestion d'erreur appropriée
        console.error("Erreur lors de la recherche par hexadécimal:", error);
        return {success: false, error: {message: error.message, code: error.code}};
    }
};
