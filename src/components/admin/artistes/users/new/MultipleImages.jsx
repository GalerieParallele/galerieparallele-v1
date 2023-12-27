import {LuImagePlus} from "react-icons/lu";
import styles from './MultipleImages.module.scss';
import {useRef, useState, useEffect} from "react";
import Image from "next/image";
import {IoMdClose} from "react-icons/io";

export default function MultipleImages({onImagesChange}) {

    const [images, setImages] = useState([]);
    const inputRef = useRef(null);

    const handleClickAddImage = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            url: URL.createObjectURL(file)
        }));
        const newImages = [...images, ...files];
        setImages(newImages);
        if (onImagesChange) {
            onImagesChange(newImages.map(img => img.file));  // Remonter les fichiers au composant parent
        }
    };

    const handleDeleteImage = (id) => {
        const newImages = images.filter(image => image.id !== id);
        setImages(newImages);
        URL.revokeObjectURL(images.find(image => image.id === id).url);
        if (onImagesChange) {
            onImagesChange(newImages.map(img => img.file));  // Remonter les fichiers au composant parent
        }
    };

    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.url));
        };
    }, [images]);

    return (
        <div className={styles.main}>
            <input
                type="file"
                multiple
                hidden
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/*"
                aria-describedby="image-upload"
            />
            <div className={styles.addImageContainer} onClick={handleClickAddImage} role="button" tabIndex={0}
                 aria-labelledby="image-upload">
                <div>
                    <LuImagePlus/>
                </div>
                <div className={styles.descAddImageContainer}>
                    <p id="image-upload">Cliquer ou Déposer pour ajouter une/des image(s)</p>
                </div>
            </div>
            <>
                {images.map((image) => (
                    <div key={image.id} className={styles.imageContainer}>
                        <span onClick={() => handleDeleteImage(image.id)} className={styles.deleteImage}>
                             <IoMdClose/>
                         </span>
                        <Image
                            src={image.url}
                            alt="Selected image"
                            width={130}
                            height={130}
                            unoptimized
                        />
                    </div>
                ))}
            </>
        </div>
    );
};
