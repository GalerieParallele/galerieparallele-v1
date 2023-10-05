import React, {useEffect, useState} from "react";

// Import des utilitaires et composants
import StorageUtils from "@/utils/StorageUtils";
import Button from "@/components/items/button/Button";
import LittleSpinner from "@/components/items/LittleSpinner";
import {Toast} from "@/constants/ToastConfig";

// Import des icons
import {AiOutlineFileImage, AiOutlineFileUnknown, AiOutlineFileZip} from "react-icons/ai";
import {MdOndemandVideo} from "react-icons/md";
import {FaRegFilePdf} from "react-icons/fa";

// Import du CSS
import styles from './MyFile.module.css';
import {BsFileTextFill} from "react-icons/bs";
import {useRouter} from "next/router";
import Link from "next/link";

export default function MyFile({user, refreshFiles}) {

    const router = useRouter();

    const [files, setFiles] = useState([]);
    const [fileURLs, setFileURLs] = useState({});
    const [fileMetadata, setFileMetadata] = useState({});
    const [loading, setLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(false);

    function switchFunction(param) {
        switch (param) {
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
                return <AiOutlineFileImage/>;
            case "video":
                return <MdOndemandVideo/>;
            case "pdf":
                return <FaRegFilePdf/>;
            case "zip":
                return <AiOutlineFileZip/>;
            case "plain":
                return <BsFileTextFill/>;
            default:
                return <AiOutlineFileUnknown/>;
        }
    }

    const getFileMetadata = async (path) => {
        return await StorageUtils.getFileMetadata(path);
    }
    const deleteFile = async (fileRef) => {
        const result = await StorageUtils.deleteFile(fileRef.fullPath);
        if (result.success) {
            const updatedFiles = files.filter(file => file.name !== fileRef.name);
            setFiles(updatedFiles);

            await Toast.fire({
                icon: 'success',
                title: `Fichier "${fileRef.name}" correctement supprimé.`,
            });
        } else {
            console.error("Error deleting the file: ", result.error);
            // Gérer l'erreur comme vous le souhaitez
        }
    }
    const retrieveFiles = async () => {
        setLoading(true);
        const fileList = await StorageUtils.listFiles(`${user.id}/`);
        setLoading(false);
        return fileList;
    }
    const loadFiles = async () => {
        setDataLoading(true)
        const fileList = await retrieveFiles();
        const urls = {};
        const metadataList = {};

        for (let file of fileList) {
            urls[file.name] = await StorageUtils.getFileURL(file.fullPath);
            metadataList[file.name] = await getFileMetadata(file);
        }

        setFiles(fileList);
        setFileURLs(urls);
        setFileMetadata(metadataList);
        setDataLoading(false)
    };

    useEffect(() => {
        loadFiles();
    }, [user, refreshFiles]);

    return (
        <div className={styles.root}>
            <Button
                text={dataLoading ? <LittleSpinner/> : "Rafraîchir"}
                onClick={loadFiles}
                disabled={dataLoading}
            />
            <div className={styles.spaceList}>
                {loading ? null : (
                    <>
                        {files.length === 0 ? (
                            <p className={styles.noFileText}>Aucun fichier dans le cloud</p>
                        ) : (
                            <div className={styles.fileListContainer}>
                                {files.map((fileRef, index) => (
                                    <div className={styles.fileItem} key={index}>
                                        <span className={styles.icon}>
                                            {switchFunction(fileMetadata[fileRef.name].contentType.split("/")[1])}
                                        </span>
                                        <p>{fileRef.name}</p>
                                        {/*<a*/}
                                        {/*    href={fileURLs[fileRef.name]}*/}
                                        {/*    target="_blank"*/}
                                        {/*    rel="noopener noreferrer"*/}
                                        {/*    className={styles.linkStyle}*/}
                                        {/*>*/}
                                        {/*    Accéder au fichier*/}
                                        {/*</a>*/}
                                        <div className={styles.actionButton}>
                                            <Link href={fileURLs[fileRef.name]} target={"_blank"}>
                                                <Button
                                                    text={"Voir"}
                                                />
                                            </Link>
                                            <Button
                                                text={"Supprimer"}
                                                onClick={() => deleteFile(fileRef)}
                                            />
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
