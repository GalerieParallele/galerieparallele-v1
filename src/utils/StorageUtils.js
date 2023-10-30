import {deleteObject, getDownloadURL, getMetadata, listAll, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebaseConfig";

const STORAGE_MESSAGES = {
    FILE_UPLOAD_ERROR: "Erreur lors de l'envoi du fichier.",
    FILE_DOWNLOAD_ERROR: "Erreur lors de la récupération de l'URL du fichier.",
    FILE_DELETE_ERROR: "Erreur lors de la suppression du fichier.",
    FILE_LIST_ERROR: "Erreur lors de la récupération de la liste des fichiers.",
    FILE_METADATA_ERROR: "Erreur lors de la récupération des métadonnées du fichier."
};

class StorageUtils {

    /**
     * Permet d'envoyer un fichier sur le cloud.
     * @param file
     * @param path
     * @param onProgress
     * @returns {Promise<{success: boolean, error}|{success: boolean, downloadURL: string}>}
     */
    static async uploadFile(file, path, onProgress) {
        try {
            const storageRef = ref(storage, `${path || file.name}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) {
                    onProgress(progress);
                }
            });

            await uploadTask;

            return {
                success: true,
                downloadURL: await getDownloadURL(storageRef),
                error: null
            };
        } catch (error) {
            console.error(STORAGE_MESSAGES.FILE_UPLOAD_ERROR, error);
            return {
                success: false,
                downloadURL: null,
                error
            };
        }
    }


    /**
     * Permet de récupérer l'URL d'un fichier sur le cloud.
     * @param path
     * @returns {Promise<null|string>}
     */
    static async getFileURL(path) {
        try {
            const fileRef = ref(storage, `${path}`);
            return await getDownloadURL(fileRef);
        } catch (error) {
            console.error(STORAGE_MESSAGES.FILE_DOWNLOAD_ERROR, error);
            return null;
        }
    }

    /**
     * Permet de récupérer les métadonnées d'un fichier.
     * @param path
     * @returns {Promise<null|Metadata>}
     */
    static async getFileMetadata(path) {
        try {
            const fileRef = ref(storage, `${path}`);
            return await getMetadata(fileRef);
        } catch (error) {
            console.error(STORAGE_MESSAGES.FILE_METADATA_ERROR, error);
            return null;
        }
    }

    /**
     * Permet de supprimer un fichier du cloud.
     * @param path
     * @returns {Promise<{success: boolean}|{success: boolean, error}>}
     */
    static async deleteFile(path) {
        try {
            const fileRef = ref(storage, `${path}`);
            await deleteObject(fileRef);
            return {success: true};
        } catch (error) {
            console.error(STORAGE_MESSAGES.FILE_DELETE_ERROR, error);
            return {success: false, error};
        }
    }

    /**
     * Permet de récupérer la liste des fichiers d'un dossier.
     * @param path
     * @returns {Promise<StorageReference[]|*[]>}
     */
    static async listFiles(path) {
        try {
            const storageRef = ref(storage, `${path}`);
            const fileList = await listAll(storageRef);
            return fileList.items;
        } catch (error) {
            console.error(STORAGE_MESSAGES.FILE_LIST_ERROR, error);
            return [];
        }
    }
}

export default StorageUtils;
