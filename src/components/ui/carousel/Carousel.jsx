import styles from './Carousel.module.scss';
import Image from "next/image";
import {useEffect, useState} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

export default function Carousel({images = ['/assets/img/no-img.jpg'], autoLoop = true, time = 5000}) {

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
        if (!autoLoop) return;
        const interval = setInterval(() => {
            if (!isHovering) {
                setMainImage(prevImage => (prevImage + 1) % images.length);
            }
        }, time);

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
        </div>
    );
}
