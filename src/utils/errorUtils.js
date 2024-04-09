/**
 * Permet de gérer la réponse d'une requête HTTP et lance une erreur si le statut de la réponse n'est pas OK
 * @param response Réponse de la requête à traiter
 * @returns {Promise<*>} Les données de la réponse
 */
export async function handleResponse(response) {
    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Erreur HTTP: statut ${response.status}, détails: ${errorDetails}`);
    }
    return response.json();
}

/**
 * Permet de créer un objet de réponse standarisé pour l'application
 * @param success Indique si l'opération a réussi
 * @param data Les données de la réponse
 * @param error L'objet d'erreur
 * @returns {Promise<{data: null, success, error: null}>} L'objet de réponse standardisé
 */
export async function createStandardResponse(success, data = null, error = null) {
    return {success, data, error};

}