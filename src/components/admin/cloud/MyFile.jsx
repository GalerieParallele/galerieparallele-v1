import React, {useEffect, useState} from "react";

import StorageUtils from "@/utils/StorageUtils";

import Button from "@/components/items/Button";
import LittleSpinner from "@/components/items/LittleSpinner";
import {Toast} from "@/constants/ToastConfig";
import {AiOutlineFileImage, AiOutlineFileUnknown, AiOutlineFileZip} from "react-icons/ai";
import {MdOndemandVideo} from "react-icons/md";
import {FaRegFilePdf} from "react-icons/fa";

export default function MyFile({user}) {
    const [files, setFiles] = useState([]);
    const [fileURLs, setFileURLs] = useState({});
    const [fileMetadata, setFileMetadata] = useState({});
    const [loading, setLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(false);

    function switchFunction(param) {
        switch (param) {
            case "image":
                return <AiOutlineFileImage size={150}/>;
            case "video":
                return <MdOndemandVideo size={150}/>;
            case "pdf":
                return <FaRegFilePdf size={150}/>;
            case "zip":
                return <AiOutlineFileZip size={150}/>;
            default:
                return <AiOutlineFileUnknown size={150}/>;
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
                text={dataLoading ? <LittleSpinner/> : "Rafraîchir"}
                onClick={loadFiles}
                disabled={dataLoading}
            />
            <div>
                {loading ? null : (
                    <>
                        {files.length === 0 ? (
                            <p style={{
                                marginTop: "20px",
                            }}>Aucun fichier dans le cloud</p>
                        ) : (
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "5px"
                            }}>
                                {files.map(fileRef => (
                                    <>
                                        {switchFunction(fileMetadata[fileRef.name].contentType.split("/")[0])}
                                        <p>{fileRef.name}</p>
                                        <a
                                            href={fileURLs[fileRef.name]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                textDecoration: "none",
                                                color: "var(--black)",
                                            }}>
                                            Accéder au fichier
                                        </a>
                                        <Button
                                            text={"Supprimer"}
                                            onClick={() => deleteFile(fileRef)}
                                        />
                                    </>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
