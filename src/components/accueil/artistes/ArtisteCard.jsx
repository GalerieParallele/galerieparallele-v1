import React from "react";

import Image from "next/image";

import styles from "../../../styles/components/ArtisteCard.module.css"

export default function ArtisteCard() {
    return (
        <div className={styles.artisteCard}>
            <div className={styles.top}>
                <div className={styles.imageContainer}>
                    <Image
                        src={"/assets/img/avatar.png"}
                        alt={"Avatar de l'artiste"}
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div className={styles.botttom}>
                <h5>LOREM IPSUM</h5>
            </div>
        </div>
    )
}