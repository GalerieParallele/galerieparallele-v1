import React from "react";

import Image from "next/image";

import styles from "../../../styles/components/artiste/ArtisteCard.module.css"

export default function ArtisteCard({pseudo}) {

    return (
        <div className={styles.artisteCard}>
            <div>
                <div className={styles.imageContainer}>
                    <Image
                        src={"/assets/img/avatar.png"}
                        alt={`Avatar de l'ariste ${pseudo}`}
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div>
                <h5>{pseudo}</h5>
            </div>
        </div>
    )
}