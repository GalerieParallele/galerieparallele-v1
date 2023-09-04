import {db} from '../../firebaseConfig';
import {deleteDoc, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';

const MESSAGES = {
    DOCUMENT_NOT_FOUND: "Le document n'a pas été trouvé.",
    DOCUMENT_ADD_ERROR: "Le document n'a pas pu être ajouté.",
}

class FirestoreUtils {

    /**
     * Ajouter un document dans une collection
     * @param collectionName
     * @param docId
     * @param data
     * @returns {Promise<{success: boolean}|{success: boolean, error}>}
     */
    static async addOrUpdateDocument(collectionName, docId, data) {
        try {
            const docRef = doc(db, collectionName, docId);
            await setDoc(docRef, data);
            return {success: true};
        } catch (error) {
            console.error(MESSAGES.DOCUMENT_ADD_ERROR, error);
            return {success: false, error};
        }
    }

    /**
     * Récupérer un document dans une collection
     * @param collectionName
     * @param docId
     * @returns {Promise<DocumentData>}
     */
    static async getDocument(collectionName, docId) {
        const docRef = doc(db, collectionName, docId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            return docSnapshot.data();
        } else {
            throw new Error(MESSAGES.DOCUMENT_NOT_FOUND);
        }
    }

    /**
     * Supprimer un document dans une collection
     * @param collectionName
     * @param docId
     * @returns {Promise<{success: boolean}|{success: boolean, error}>}
     */
    static async deleteDocument(collectionName, docId) {
        try {
            const docRef = doc(db, collectionName, docId);
            await deleteDoc(docRef);
            return {success: true};
        } catch (error) {
            console.error("Error deleting document: ", error);
            return {success: false, error};
        }
    }

    /**
     * Mettre à jour un document dans une collection
     * @param collectionName
     * @param docId
     * @param updates
     * @returns {Promise<{success: boolean}|{success: boolean, error}>}
     */
    static async updateDocument(collectionName, docId, updates) {
        try {
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, updates);
            return {success: true};
        } catch (error) {
            console.error("Error updating document: ", error);
            return {success: false, error};
        }
    }
}

export default FirestoreUtils;
