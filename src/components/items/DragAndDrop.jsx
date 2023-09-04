import React, {useCallback, useState} from 'react';

import StorageUtils from '@/utils/StorageUtils';

function DragAndDrop({onFilesUploaded}) {
    const [isDragging, setIsDragging] = useState(false);

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

    const handleDrop = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
        let files = [...e.dataTransfer.files]; // Permet de convertir la liste des fichiers en tableau

        // Ajouter des validations pour les types de fichiers, la taille, etc.

        const uploadPromises = files.map(file => StorageUtils.uploadFile(file, `1/${file.name}`));
        const uploadResults = await Promise.all(uploadPromises);

        onFilesUploaded(uploadResults);

    }, [onFilesUploaded]);

    return (
        <div
            style={{
                border: isDragging ? '2px dashed #000' : '2px solid #ccc',
                padding: 20,
                textAlign: 'center'
            }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={(e) => e.preventDefault()} // Permet de rendre la zone "droppable"
            onDrop={handleDrop}
        >
            {isDragging ? 'Relâchez pour télécharger' : 'Glissez et déposez vos fichiers ici ou cliquez pour sélectionner'}
            <input
                type="file"
                multiple
                style={{display: 'none'}}
                onChange={(e) => handleDrop({dataTransfer: {files: e.target.files}})}
            />
        </div>
    );
}

export default DragAndDrop;
