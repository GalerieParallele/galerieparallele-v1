import React, {useCallback, useRef, useState} from 'react';

import StorageUtils from '@/utils/StorageUtils';

import styles from "./DragAndDrop.module.css"
import {AiOutlineCloudUpload} from "react-icons/ai";
import Button from "@/components/ui/button/Button";
import {BiSelectMultiple} from "react-icons/bi";
import {TbWorldUpload} from "react-icons/tb";
import {useAuth} from "@/hooks/useAuth";
import {Toast} from "@/constants/ToastConfig";

function DragAndDrop({onFilesUploaded}) {

    const {user} = useAuth();

    const fileInputRef = useRef(null); // Permet de stocker la référence de l'input file
    const [selectedFiles, setSelectedFiles] = useState([]); // Permet de stocker les fichiers sélectionnés
    const [uploadingFiles, setUploadingFiles] = useState({});  // Permet de stocker les progessions d'envoi de chaque fichier
    const [customFileName, setCustomFileName] = useState({}); // Permet de stocker le nom personnalisé du fichier

    /**
     * Permet de formater la taille d'un fichier
     * @type {(function(*): string)|*}
     */
    const formatSizeFile = useCallback((size) => {
        if (size < 1024) {
            return `${size} octets`;
        } else if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(2)} Ko`;
        } else if (size < 1024 * 1024 * 1024) {
            return `${(size / (1024 * 1024)).toFixed(2)} Mo`;
        } else {
            return `${(size / (1024 * 1024 * 1024)).toFixed(2)} Go`;
        }
    }, []);

    /**
     * Permet d'ouvrir la fenêtre de sélection de fichier
     * @type {(function(*): void)|*}
     */
    const handleClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);


    /**
     * Permet d'ajouter des fichiers à la liste des fichiers sélectionnés (sans doublons)
     * @param files
     */
    const addFiles = (files) => {
        setSelectedFiles(prev => {
            const newFiles = files.filter(f => !prev.map(pf => pf.name).includes(f.name));
            return [...prev, ...newFiles];
        });
        setCustomFileName(prev => {
            const newCustomFileName = {...prev};
            files.forEach(file => {
                if (!newCustomFileName[file.name]) {
                    newCustomFileName[file.name] = file.name;
                }
            });
            return newCustomFileName;
        });
    }

    const handleFileSelect = useCallback((e) => {
        let files = [...e.target.files];
        addFiles(files);
        e.target.value = '';
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files]; // Convertir la liste des fichiers en tableau
        addFiles(files);
    }, []);

    /**
     * Permet d'envoyer un fichier vers le cloud
     * @param file
     * @returns {Promise<void>}
     */
    const handleUploadFile = async (file) => {

        if (!user) {
            Toast.fire({
                icon: 'error',
                title: 'Vous devez être connecté pour envoyer des fichiers'
            });
            return;
        }

        const onProgress = (progress) => {
            setUploadingFiles(prev => ({...prev, [file.name]: progress}));
        };

        const result = await StorageUtils.uploadFile(file, `${user.id}/${customFileName[file.name] || file.name}`, onProgress);
        onFilesUploaded(result);

        // Supprimer le fichier de la liste après l'envoi
        setSelectedFiles(prevFiles => prevFiles.filter(f => f !== file));
        // Supprimer la progression pour ce fichier
        setUploadingFiles(prev => {
            const newUploading = {...prev};
            delete newUploading[file.name];
            return newUploading;
        });
    };

    /**
     * Permet d'envoyer plusieurs fichiers vers le cloud en même temps (en parallèle) et d'attendre la fin de tous les envois avant de continuer le code
     * @param files
     * @returns {Promise<void>}
     */
    const handleUploadMultipleFiles = async (files) => {
        const uploadPromises = files.map(file => handleUploadFile(file));
        await Promise.all(uploadPromises);
    };

    return (
        <>
            <main className={styles.main}>
                <div
                    className={styles.draganddrop}
                    onDragOver={(e) => e.preventDefault()} // Permet de rendre la zone "droppable"
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <div className={styles.iconcloud}>
                        <AiOutlineCloudUpload/>
                    </div>
                    <div className={styles.draginfo}>
                        <div>
                            <p>Cliquer ou glisser des fichiers</p>
                        </div>
                        <div className={styles.realTimeStats}>
                            <div
                                title={`${selectedFiles.length} fichier${selectedFiles.length > 0 ? 's' : ''} sélectionné${selectedFiles.length > 0 ? 's' : ''} `}>
                                <p>{selectedFiles.length} <BiSelectMultiple/></p>
                            </div>
                            <span className={styles.verticalSeparator}/>
                            <div
                                title={`${Object.keys(uploadingFiles).length} fichier${Object.keys(uploadingFiles).length > 0 ? 's' : ''} en cours d'envoi`}>
                                <p>{Object.keys(uploadingFiles).length} <TbWorldUpload/></p>
                            </div>
                        </div>
                    </div>
                    <input
                        type="file"
                        multiple
                        style={{display: 'none'}}
                        onChange={handleFileSelect}
                        ref={fileInputRef}
                    />
                </div>
                <div className={styles.allFilesActions}>
                    <div>
                        {selectedFiles.length > 0 &&
                            <Button
                                onClick={() => setSelectedFiles([])}
                                text={"Tout supprimer"}
                            />
                        }
                    </div>
                    <div>
                        {selectedFiles.length > 0 &&
                            <Button
                                onClick={() => handleUploadMultipleFiles(selectedFiles)}
                                text={"Tout envoyer"}
                            />
                        }
                    </div>
                </div>
            </main>
            {selectedFiles.length > 0 && (
                <table style={{
                    textAlign: 'left',
                    borderSpacing: '50px',
                }}>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Taille</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedFiles.map((file, index) => (
                        <tr key={index}>
                            <td><input
                                type="text"
                                placeholder={customFileName[file.name]}
                                onChange={(e) => {
                                    setCustomFileName(prev => ({...prev, [file.name]: e.target.value}));
                                }}/></td>
                            <td>{formatSizeFile(file.size)}</td>
                            <td>{file.type}</td>
                            <td>
                                {uploadingFiles[file.name] ?
                                    <>
                                        <progress value={uploadingFiles[file.name]} max="100"></progress>
                                    </>
                                    :
                                    <div className={styles.rowAction}>
                                        <Button
                                            onClick={() => handleUploadFile(file)}
                                            text={"Envoyer"}
                                        />
                                        <Button
                                            onClick={() => setSelectedFiles(prevFiles => prevFiles.filter(f => f !== file))}
                                            text={"Supprimer"}
                                        />
                                    </div>
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default DragAndDrop;
