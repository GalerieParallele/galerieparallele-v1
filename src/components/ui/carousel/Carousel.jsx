import styles from './Carousel.module.scss';
import Image from "next/image";
import {useEffect, useState} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

/**
 *
 * @param images  Tableau des images à afficher
 * @param bottomImages True si on affiche les miniatures en bas
 * @param autoLoop True si on veut que les images défilent automatiquement
 * @param time Temps entre chaque image (en secondes)
 * @returns {JSX.Element} Carousel
 */
export default function Carousel({
                                     images = ['/assets/img/no-img.jpg'],
                                     bottomImages = true,
                                     autoLoop = true,
                                     time = 3
                                 }) {

    const [mainImage, setMainImage] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [indexesImages, setIndexesImages] = useState(images.map((_, index) => index));

    /**
     * Permet de mettre à jour les index des images lorsqu'elles changent
     */
    useEffect(() => {
        setIndexesImages(images.map((_, index) => index));
    }, [images]);

    /**
     * Automatise le changement d'image toutes les 5 secondes
     */
    useEffect(() => {
        if (!autoLoop || images.length <= 1) return;
        const interval = setInterval(() => {
            if (!isHovering) {
                setMainImage((prevImage) => (prevImage + 1) % images.length);
            }
        }, time * 1000);
        return () => clearInterval(interval);
    }, [isHovering, images.length, autoLoop, time]);

    /**
     * Permet de passer à l'image précédente
     */
    const handlePrevious = () => {
        setMainImage(mainImage === 0 ? images.length - 1 : mainImage - 1);
    };

    /**
     * Permet de passer à l'image suivante
     */
    const handleNext = () => {
        setMainImage((mainImage + 1) % images.length);
    };

    if (images.length === 0) {
        images = ['/assets/img/no-img.jpg'];
    }

    return (
        <div
            className={styles.main}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className={styles.mainImageContainer}>
                <button onClick={handlePrevious}>
                    <IoIosArrowBack/>
                </button>
                {
                    images.length > 0 && (
                        <div>
                            <Image
                                src={images[mainImage]}
                                alt={'Image principale'}
                                layout={'fill'}
                                objectFit={'contain'}
                            />
                        </div>
                    )
                }
                <button onClick={handleNext}>
                    <IoIosArrowForward/>
                </button>
            </div>
            {
                bottomImages && (
                    <div className={styles.bottomThumbs}>
                        {
                            indexesImages.length > 0 && indexesImages.map((index) => (
                                <div
                                    key={index}
                                    className={`${styles.thumb} ${index === mainImage ? styles.active : ''}`}
                                    onClick={() => setMainImage(index)}
                                >
                                    <Image
                                        src={images[index]}
                                        alt={`Miniature ${index}`}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
