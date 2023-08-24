import React, {useEffect, useState} from "react";

import ArtisteCard from "@/components/accueil/artistes/ArtisteCard";
import Button from "@/components/items/Button";

import styles from "../../../styles/components/artiste/Artiste.module.css";
import ROUTES from "@/constants/ROUTES";

export default function Artiste() {

    const [artists, setArtists] = useState([]);

    useEffect(() => {

        fetch(ROUTES.API.ARTISTES.GET)
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
                {artists.length === 0 ? <h3>Aucun artiste trouvé...</h3> :
                    artists.map(artist => (
                        <ArtisteCard key={artist.pseudo} pseudo={artist.pseudo}/>
                    ))

                }
            </div>
            <div className={styles.bottom}>
                <Button text={"Nos artistes"} isWhite/>
            </div>
        </div>
    );
}
