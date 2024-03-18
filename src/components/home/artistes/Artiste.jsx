import React, {useEffect, useState} from "react";

import Button from "@/components/items/button/Button";

import styles from "./Artiste.module.css";
import ROUTES from "@/constants/ROUTES";
import {useRouter} from "next/router";

export default function Artiste() {

    const router = useRouter();

    const [artists, setArtists] = useState([]);

    useEffect(() => {

        fetch(ROUTES.API.ARTISTES.HOME)
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
                    artists.map((artist, index) => (
                        // <ArtisteCard key={artist.pseudo} pseudo={artist.pseudo}/>
                        <div key={index}>test</div>
                    ))
                }
            </div>
            <div className={styles.bottom}>
                <Button
                    text={"Nos artist"}
                    isWhite
                onClick={() => router.push("/artistes")}
                />
            </div>
        </div>
    );
}
