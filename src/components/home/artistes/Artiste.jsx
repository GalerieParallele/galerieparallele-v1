import React, {useEffect} from "react";

import Button from "@/components/ui/button/Button";

import styles from "./Artiste.module.css";
import {useRouter} from "next/router";
import ArtisteCard from "@/components/home/artistes/ArtisteCard";
import useArtistsStore from "@/stores/artistsStore";
import ROUTES from "@/constants/ROUTES";

export default function Artiste() {

    const router = useRouter();

    const {
        artists,
        reloadArtists,
    } = useArtistsStore();

    useEffect(() => {
        reloadArtists()
    }, [artists]);

    return (
        <div className={styles.artiste}>
            <div className={styles.top}>
                {artists.length === 0 ? <h3>Aucun artiste trouvé...</h3> :
                    artists.map((artist, index) => (
                        <>
                            <ArtisteCard
                                artist={artist}
                                key={index}
                            />
                        </>
                    ))
                }
            </div>
            <div className={styles.bottom}>
                <Button
                    text={"Nos artist"}
                    isWhite
                    onClick={() => router.push(ROUTES.ARTISTES.HOME)}
                />
            </div>
        </div>
    );
}
