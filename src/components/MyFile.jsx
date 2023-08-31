import {deleteObject, getDownloadURL, getMetadata, listAll, ref,} from "firebase/storage";
import {storage} from "../../firebaseConfig";
import {useEffect, useState} from "react";
import Button from "@/components/items/Button";
import LittleSpinner from "@/components/items/LittleSpinner";
import Image from "next/image";
import {Toast} from "@/constants/ToastConfig";

export default function MyFile({user}) {
    const [files, setFiles] = useState([]);
    const [fileURLs, setFileURLs] = useState({});
    const [fileMetadata, setFileMetadata] = useState({});
    const [loading, setLoading] = useState(true);

    const getFileMetadata = async (fileRef) => {
        try {
            return await getMetadata(fileRef);
        } catch (error) {
            console.error("Error while fetching file metadata: ", error);
            return null; // Si une erreur se produit, renvoyer null
        }
    }

    const deleteFile = async (fileRef) => {
        try {
            await deleteObject(fileRef);
            const updatedFiles = files.filter(file => file.name !== fileRef.name);
            setFiles(updatedFiles);

            await Toast.fire({
                icon: 'success',
                title: `Fichier "${fileRef.name} correctement supprimé."`,

            })
        } catch (error) {
            console.error("Error deleting the file: ", error);
        }
    }

    const retrieveFiles = async () => {
        setLoading(true);
        const storageRef = ref(storage, `${user.id}/`);
        try {
            const fileList = await listAll(storageRef);
            return fileList.items;
        } catch (error) {
            console.error("Error while fetching files: ", error);
            return []; // Retourner un tableau vide en cas d'erreur
        } finally {
            setLoading(false);
        }
    }

    const getFileURL = async (fileRef) => {
        try {
            return await getDownloadURL(fileRef);
        } catch (error) {
            console.error("Error while fetching file URL: ", error);
            return null; // Si une erreur se produit, renvoyer null
        }
    }

    const loadFiles = async () => {
        const fileList = await retrieveFiles();
        const urls = {};
        const metadataList = {};

        for (let file of fileList) {
            urls[file.name] = await getFileURL(file);
            metadataList[file.name] = await getFileMetadata(file);
        }

        setFiles(fileList);
        setFileURLs(urls);
        setFileMetadata(metadataList);
    };

    useEffect(() => {
        loadFiles();
    }, [user]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 0"
        }}>
           <Button
                text={"Rafraîchir"}
                onClick={loadFiles}
            />
            <div>
                {loading ? <LittleSpinner/> : (
                    <>
                        {files.length === 0 ? (
                            <p>Aucun fichier dans le cloud</p>
                        ) : (
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "5px"
                            }}>
                                {files.map(fileRef => (
                                    <div key={fileRef.name} style={{
                                        padding: "10px",
                                        border: "1px solid var(--black)",
                                        width: "100%"
                                    }}>
                                        <div>
                                            {fileMetadata[fileRef.name]?.contentType.startsWith('image/') ? (
                                                <>
                                                    <Image src={fileURLs[fileRef.name]} alt={fileRef.name}
                                                           width={200}
                                                           height={200}
                                                    />
                                                    <a href={fileURLs[fileRef.name]} target="_blank"
                                                       rel="noopener noreferrer">
                                                        Nom du fichier: {fileRef.name}
                                                    </a>
                                                    <Button
                                                        text={"Supprimer"}
                                                        onClick={() => deleteFile(fileRef)}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <a href={fileURLs[fileRef.name]} target="_blank"
                                                       rel="noopener noreferrer">
                                                        {fileRef.name}
                                                    </a>
                                                    <Button
                                                        text={"Supprimer"}
                                                        onClick={() => deleteFile(fileRef)}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
