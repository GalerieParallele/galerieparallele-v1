import React, {useState} from "react";

import {useAuth} from "@/hooks/useAuth";

import {storage} from "../../../firebaseConfig";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";


import Button from "@/components/items/Button";
import LittleSpinner from "@/components/items/LittleSpinner";

import {AiOutlineCloudUpload} from "react-icons/ai";
import {RiDeleteBin6Line} from "react-icons/ri";
import styles from "@/styles/components/items/FileInput.module.css"

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

    const handleUploadFile = () => {
        if (!file) return;

        setIsUploading(true);

        const storageRef = ref(storage, `${user.id}/${customFileName || file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            () => {
                // Handle error here if any
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(() => {
                    setIsUploading(false);
                });
            }
        );
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
