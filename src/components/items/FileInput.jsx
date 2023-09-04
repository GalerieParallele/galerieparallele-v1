import React, {useState} from "react";

import {useAuth} from "@/hooks/useAuth";

import {storage} from "../../../firebaseConfig";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";


import Button from "@/components/items/Button";
import LittleSpinner from "@/components/items/LittleSpinner";

import {AiOutlineCloudUpload} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";
import styles from "@/styles/components/items/FileInput.module.css"
import StorageUtils from "@/utils/StorageUtils";

export default function FileInput() {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [customFileName, setCustomFileName] = useState("");
    const {user} = useAuth();

    const handleDeleteFile = () => {
        setFile(null);
    }

    const handleSelectFile = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile || null);
    }

    const handleUploadFile = async () => {

        if (!file) return;

        setIsUploading(true);

        const result = await StorageUtils.uploadFile(file, `${user.id}/${customFileName || file.name}`);
        if (result.success) {
            setIsUploading(false);
        } else {
            // GERER LES ERREURS
        }
    }

    return (
        <div className={styles.container}>
            {isUploading ? (
                <p>{progress}% <LittleSpinner/></p>
            ) : (
                <>
                    <div className={styles.top}>
                        {!file ? (
                            <div>
                                <input
                                    id="file"
                                    type="file"
                                    onChange={handleSelectFile}
                                    className={styles.inputFile}
                                />
                                <label htmlFor="file" className="cursor-pointer">
                                    <AiOutlineCloudUpload/>
                                </label>
                            </div>
                        ) : null}
                        <div>
                            <input
                                type="text"
                                disabled={!file}
                                value={customFileName}
                                placeholder={file?.name || "Aucun fichier selectionné"}
                                onChange={(e) => setCustomFileName(e.target.value)}
                            />
                        </div>
                        {file && (
                            <div>
                                <Button
                                    text={<RiDeleteBin6Line/>}
                                    onClick={handleDeleteFile}
                                />
                            </div>
                        )}
                    </div>
                    {file && (
                        <div>
                            <Button
                                text="Envoyer"
                                onClick={handleUploadFile}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
