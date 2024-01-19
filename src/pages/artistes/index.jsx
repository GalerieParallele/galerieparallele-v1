import {useRouter} from "next/router";

import styles from './Index.module.scss';
import Navbar from "@/components/items/navbar/Navbar";
import {useArtists} from "@/hooks/useArtists";
import LittleSpinner from "@/components/items/LittleSpinner";
import Image from "next/image";

export default function ArtistesHomeIndex() {

    const router = useRouter();

    const {loading, artists, reloadArtists} = useArtists();

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
                                    onClick={() => router.push(`/artistes/${artist.id}/profil`)}
                                >
                                    <Image src={artist.user.avatarURL} width={200} height={200} alt={"Photo test"}/>
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