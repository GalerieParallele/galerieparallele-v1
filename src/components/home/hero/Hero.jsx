import React, {useEffect, useState, useRef} from "react";

import {BiChevronsDown} from "react-icons/bi";

import Image from "next/image";

import styles from "../../../styles/components/home/Hero.module.css";

export default function Hero() {

    const [rotation, setRotation] = useState(-110);
    const [scale, setScale] = useState(1);
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = (e) => {

            // Défilement vers le bas
            if (e.deltaY > 0 && rotation < 0) {
                e.preventDefault();
                const newRotation = Math.min(0, rotation + e.deltaY * 0.1);
                setRotation(newRotation);
                const newScale = 1 + (0.5 * (newRotation + 110) / 110);
                setScale(newScale);
            }

            // Défilement vers le haut, seulement si le scrollY est à 0 (haut de la page) et que la rotation est supérieure à -110
            if (e.deltaY < 0 && window.scrollY === 0 && rotation < -110) {
                e.preventDefault();
                const newRotation = Math.max(-110, rotation + e.deltaY * 0.1);
                setRotation(newRotation);
                const newScale = 1 + (0.8 * (newRotation + 110) / 110);
                setScale(newScale);
            }
        };

        window.addEventListener("wheel", handleScroll, {passive: false});

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [rotation]);

    return (
        <div className={styles.hero} ref={heroRef}>
            <div className={styles.top}>
                <div className={styles.experienceButton}>
                    <p>Démarrer l&rsquo;expérience</p>
                </div>
            </div>
            <div className={styles.center}>
                <Image
                    src={"/assets/img/white-logo.svg"}
                    alt={"test"}
                    width={200}
                    height={200}
                    style={{transform: `rotate(${rotation}deg) scale(${scale})`}}
                />
            </div>
            <div className={styles.bottom}>
                <BiChevronsDown className={styles.icon}/>
            </div>
        </div>
    );
}

