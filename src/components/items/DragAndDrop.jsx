import React, {useCallback, useRef, useState} from 'react';

import StorageUtils from '@/utils/StorageUtils';

import styles from "../../styles/components/items/DragAndDrop.module.css"

function DragAndDrop({onFilesUploaded}) {

    const [isDragging, setIsDragging] = useState(false); // Permet de savoir si l'utilisateur est en train de drag un fichier
    const fileInputRef = useRef(null); // Permet de stocker la référence de l'input file
    const [selectedFiles, setSelectedFiles] = useState([]); // Permet de stocker les fichiers sélectionnés
    const [uploadingFiles, setUploadingFiles] = useState({});  // Permet de stocker les progessions d'envoi de chaque fichier


    /**
     * Permet d'ouvrir la fenêtre de sélection de fichier
     * @type {(function(*): void)|*}
     */
    const handleClick = useCallback((e) => {
        fileInputRef.current.click();
    }, []);

    /**
     * Permet de gérer le drag enter
     * @type {(function(*): void)|*}
     */
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    /**
     * Permet de gérer le drag leave
     * @type {(function(*): void)|*}
     */
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    /**
     * Permet de gérer la sélection de fichier
     * @type {(function(*): void)|*}
     */
    const handleFileSelect = useCallback((e) => {
        let files = [...e.target.files, ...selectedFiles];
        setSelectedFiles(files);
        e.target.value = '';
    }, [selectedFiles]);

    /**
     * Permet de gérer le drop
     * @type {(function(*): void)|*}
     */
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
        let files = [...e.dataTransfer.files]; // Convertir la liste des fichiers en tableau

        // Ajouter les fichiers dans la liste des fichiers sélectionnés
        setSelectedFiles(prev => [...prev, ...files]);
    }, []);

    /**
     * Permet d'envoyer un fichier vers le cloud
     * @param file
     * @returns {Promise<void>}
     */
    const handleUploadFile = async (file) => {
        const onProgress = (progress) => {
            setUploadingFiles(prev => ({...prev, [file.name]: progress}));
        };

        const result = await StorageUtils.uploadFile(file, `1/${file.name}`, onProgress);
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

    return (
        <>
            <div
                className={styles.draganddrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()} // Permet de rendre la zone "droppable"
                onDrop={handleDrop}
                onClick={handleClick}
            >
                {isDragging ? 'Relâchez pour sélectionner' : 'Glissez et déposez vos fichiers ici ou cliquez pour sélectionner'}
                <input
                    type="file"
                    multiple
                    style={{display: 'none'}}
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                />
            </div>
            {selectedFiles.map((file, index) => (
                <div key={index}>
                    {file.name}
                    {uploadingFiles[file.name] ?
                        (<progress value={uploadingFiles[file.name]} max="100"></progress>)
                        :
                        (<button onClick={() => handleUploadFile(file)}>Envoyer</button>)
                    }
                </div>
            ))}
        </>
    );
}

export default DragAndDrop;
