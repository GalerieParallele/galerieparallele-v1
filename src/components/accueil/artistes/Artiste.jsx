import React, {useEffect, useState} from "react";

import ArtisteCard from "@/components/accueil/artistes/ArtisteCard";
import Button from "@/components/items/Button";

import styles from "../../../styles/components/Artiste.module.css";

export default function Artiste() {

    const [artists, setArtists] = useState([]);

    useEffect(() => {

        fetch('/api/artistes')
            .then(response => response.json())
            .then(data => {
                if (data.list) {
                    setArtists(data.list);
                }
            })
            .catch(error => {
                // GERER LES ERREURS
            });
    }, []);

    return (
        <div className={styles.artiste}>
            <div className={styles.top}>
                {artists.map(artist => (
                    <ArtisteCard key={artist.pseudo} pseudo={artist.pseudo}/>
                ))}
            </div>
            <div className={styles.bottom}>
                <Button text={"Nos artistes"} isWhite/>
            </div>
        </div>
    );
}
