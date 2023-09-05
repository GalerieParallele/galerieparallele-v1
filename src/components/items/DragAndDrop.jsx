import React, {useCallback, useRef, useState} from 'react';

import StorageUtils from '@/utils/StorageUtils';

function DragAndDrop({onFilesUploaded}) {

    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadingFiles, setUploadingFiles] = useState({});  // pour stocker les progressions


    const handleClick = useCallback((e) => {
        fileInputRef.current.click();
    }, []);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleFileSelect = useCallback((e) => {
        let files = [...e.target.files, ...selectedFiles];
        setSelectedFiles(files);
        e.target.value = '';
    }, [selectedFiles]);

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


    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
        let files = [...e.dataTransfer.files]; // Convertir la liste des fichiers en tableau

        // Ajouter les fichiers dans la liste des fichiers sélectionnés
        setSelectedFiles(prev => [...prev, ...files]);
    }, []);


    return (
        <>
            <div
                style={{
                    border: isDragging ? '2px dashed #000' : '2px solid #ccc', padding: 20, textAlign: 'center'
                }}
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
