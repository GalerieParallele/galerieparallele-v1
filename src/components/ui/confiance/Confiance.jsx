import styles from './Confiance.module.scss';
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Confiance() {

    const [hoverContainer, setHoverContainer] = useState(false);

    useEffect(() => {
        const listContainer = document.querySelector('#container');
        if (listContainer) {
            const scrollInterval = setInterval(() => {
                if (hoverContainer)
                    return;
                if (listContainer.scrollLeft < listContainer.scrollWidth - listContainer.clientWidth) {
                    listContainer.scrollLeft += 1; // Ajustez ce chiffre pour contrôler la vitesse
                } else {
                    // retour au début de manière fluide
                    listContainer.scrollLeft = 0;
                }
            }, 40); // Ajustez le timing pour contrôler la vitesse de défilement

            return () => clearInterval(scrollInterval); // Nettoyez l'intervalle quand le composant est démonté
        }
    }, [hoverContainer]);

    return (
        <div className={styles.main}>
            <h2>Il nous font confiance</h2>
            <div
                className={styles.list}
                id={"container"}
                onMouseEnter={() => setHoverContainer(true)}
                onMouseLeave={() => setHoverContainer(false)}
            >
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/bioxa.png"}
                        alt={"Logo de bioxa"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/caf.png"}
                        alt={"Logo de la CAF"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/cafe_miguel.jpg"}
                        alt={"Logo de cafe miguel"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/champagne charles cazanove.png"}
                        alt={"Logo du champagne charles cazanove"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/champagne_palmer.png"}
                        alt={"Logo du champagne palmer"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/chaserne chanzy.png"}
                        alt={"Logo de la chaserne chanzy à Reims"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/eiffage.png"}
                        alt={"Logo d'eiffage"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/gabrielle.png"}
                        alt={"Logo de gabrielle"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/justice.png"}
                        alt={"Logo de la justice française"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/lorem_avocats.png"}
                        alt={"Logo du cabinet lorem avocats"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/lunion.png"}
                        alt={"Logo de l'union à Reims"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/otium capital.jpg"}
                        alt={"Logo de otium capital"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/stade de reims.png"}
                        alt={"Logo du stade de reims"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/veuve_clicquot.png"}
                        alt={"Logo de la maison de champagne veuve clicquot"}
                        width={1500}
                        height={1500}
                    />
                </div>
            </div>
        </div>
    )
}