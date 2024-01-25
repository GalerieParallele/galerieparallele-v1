import {useRouter} from "next/router";

import styles from './Index.module.scss';
import Navbar from "@/components/items/navbar/Navbar";
import {useArtists} from "@/hooks/useArtists";
import LittleSpinner from "@/components/items/LittleSpinner";
import Image from "next/image";
import {useEffect} from "react";
import ROUTES from "@/constants/ROUTES";

export default function ArtistesHomeIndex() {

    const router = useRouter();

    const {loading, artists, reloadArtists} = useArtists();

    useEffect(() => {
        console.log(artists);
    }, [artists]);

    return (
        <div className={styles.main}>
            <Navbar/>
            <div style={{
                padding: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {
                    loading ? <LittleSpinner/> : (
                        <div className={styles.artists}>
                            {artists.map((artist, index) => (
                                <div
                                    className={styles.artist}
                                    key={index}
                                    style={{
                                        backgroundColor: "var(--white)",
                                        boxShadow: "var(--shadow)",
                                        padding: "20px",
                                    }}
                                    onClick={() => router.push(ROUTES.ARTISTES.PROFIL(artist.id))}
                                >
                                    <Image src={artist.user.avatarURL || "/assets/img/avatar.png"} width={200} height={200} alt={"Photo test"}/>
                                    <div className={styles.artistName}>
                                        {artist.pseudo ? artist.pseudo : artist.user.lastname.toUpperCase() + " " + artist.user.firstname}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}