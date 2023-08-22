import React from "react";

import ArtisteCard from "@/components/accueil/artistes/ArtisteCard";
import Button from "@/components/items/Button";

import styles from "../../../styles/components/Artiste.module.css";

export default function Artiste() {
    return (
        <div className={styles.artiste}>
            <div className={styles.top}>
                <ArtisteCard/>
                <ArtisteCard/>
                <ArtisteCard/>
                <ArtisteCard/>
            </div>
            <div className={styles.bottom}>
                <Button
                    text={"Nos artistes"}
                    isWhite
                />
            </div>
        </div>
    )
}