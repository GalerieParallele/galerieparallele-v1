import {useRouter} from "next/router";

import styles from './Index.module.scss';
import Navbar from "@/components/ui/navbar/Navbar";
import {useArtists} from "@/hooks/useArtists";
import {useEffect} from "react";
import Image from "next/image";
import ArtisteCard from "@/components/home/artistes/ArtisteCard";
import Link from "next/link";

export default function ArtistesHomeIndex() {

    const router = useRouter();

    const {loading, artists, reloadArtists} = useArtists();

    useEffect(() => {
        console.log(artists);
    }, [artists]);

    return (<div className={styles.main}>
        <Navbar/>
        <div className={styles.content}>
            <div className={styles.bigHead}>
                <h2>Nos artistes</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu
                    fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore
                    et
                    dolore magna aliqua.</p>
            </div>
            <div className={styles.atTheTop}>
                <h3>Artistes à la une</h3>
                <div className={styles.atTheTopContainer}>
                    <div className={styles.left}>
                        <div className={styles.imgContainer}>
                            <Image
                                src={'/assets/img/oeuvres/oeuvre2.jpg'}
                                alt={"Photo oeuvre à la une numéro 2"}
                                width={500}
                                height={500}
                            />
                            <div className={styles.artistLink}>
                                <Link href={"#"}>
                                    Nom de l&apos;artiste
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.imgContainer}>
                            <Image
                                src={'/assets/img/oeuvres/oeuvre1.jpg'}
                                alt={"Photo oeuvre à la une numéro 1"}
                                width={500}
                                height={500}
                            />
                            <div className={styles.artistLink}>
                                <Link href={"#"}>
                                    Nom de l&apos;artiste
                                </Link>
                            </div>
                        </div>

                        <div className={styles.imgContainer}>
                            <Image
                                src={'/assets/img/oeuvres/oeuvre3.jpg'}
                                alt={"Photo oeuvre à la une numéro 3"}
                                width={500}
                                height={500}
                            />
                            <div className={styles.artistLink}>
                                <Link href={"#"}>
                                    Nom de l&apos;artiste
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.allOfFameContainer}>
                <ArtisteCard
                    pseudo={"Artiste 1"}
                />
                <ArtisteCard
                    pseudo={"Artiste 1"}
                />
                <ArtisteCard
                    pseudo={"Artiste 1"}
                />
                <ArtisteCard
                    pseudo={"Artiste 1"}
                />
                <ArtisteCard
                    pseudo={"Artiste 1"}
                />
            </div>
            <div className={styles.list}>
                <div className={styles.left}>

                </div>
                <div className={styles.right}>

                </div>
            </div>
        </div>
    </div>)
}