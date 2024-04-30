import React, {useEffect, useState} from 'react';
import styles from './MultiCarousel.module.scss';
import Image from "next/image";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

const images = [
    "https://picsum.photos/250/250?random=1",
    "https://picsum.photos/250/250?random=2",
    "https://picsum.photos/250/250?random=3",
    "https://picsum.photos/300/250?random=4",
];

export default function MultiCarousel({imagesPerView = 5, autoLoop = true}) {

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [windowWidth, setWindowWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);


    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + imagesPerView) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - imagesPerView + images.length) % images.length);
    };

    useEffect(() => {
        if (!autoLoop || images.length <= 1) return;
        // Définit un intervalle pour changer l'image automatiquement toutes les 3 secondes
        const interval = setInterval(() => {
            nextImage(); // Change à la prochaine image
        }, 4000); // Intervalle de 3000 ms (3 secondes)

        // Nettoyage de l'intervalle lors du démontage du composant
        return () => clearInterval(interval);
    }, [autoLoop, currentIndex, nextImage, windowWidth]);

    let imagesToShow = images.slice(currentIndex, currentIndex + imagesPerView).concat(images.slice(0, Math.max(0, currentIndex + imagesPerView - images.length)));

    if (windowWidth < 1460) {
        imagesToShow = images.slice(currentIndex, currentIndex + 4);
    }

    if (windowWidth < 1220) {
        imagesToShow = images.slice(currentIndex, currentIndex + 3);
    }

    if (windowWidth < 940) {
        imagesToShow = images.slice(currentIndex, currentIndex + 2);
    }

    if (windowWidth < 650) {
        imagesToShow = images.slice(currentIndex, currentIndex + 1);
    }

    return (
        <div className={styles.main}>
            <button onClick={prevImage} className={styles.left}>
                <IoIosArrowBack/>
            </button>
            <div className={styles.list}>
                {imagesToShow.map((src, index) => (
                    <div className={styles.imgContainer} key={index}>
                        <Image src={src} width={250} height={250} alt={`Image ${index + 1}`}/>
                    </div>
                ))}
            </div>
            <button onClick={nextImage} className={styles.right}>
                <IoIosArrowForward/>
            </button>
        </div>
    );
}
