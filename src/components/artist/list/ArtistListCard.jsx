import styles from "./ArtistListCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/ROUTES";
import {useEffect, useState} from "react";
import LittleSpinner from "@/components/ui/LittleSpinner";

export default function ArtistListCard({artist, countries}) {

    const displayname = artist.pseudo ? artist.pseudo : artist.user.firstname + " " + artist.user.lastname;
    const [displayFlag, setDisplayFlag] = useState('');
    const [isFlagLoading, setIsFlagLoading] = useState(true);

    useEffect(() => {
        if (countries.length > 0 && artist.nationality) {
            setIsFlagLoading(true);
            const foundCountry = countries.find(country => country.translations.fra.common === artist.nationality);
            if (foundCountry) {
                setDisplayFlag(foundCountry.flags.png);
            } else {
                setDisplayFlag('');
            }
            setIsFlagLoading(false);
        }
    }, [countries, artist.nationality]);

    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <div className={styles.imgContainer}>
                    <Image
                        src={artist && artist.user.avatarURL ? artist.user.avatarURL : "/assets/img/avatar.png"}
                        alt={"Photo de l'artiste " + displayname}
                        width={1300}
                        height={1300}
                    />
                    {
                        artist.nationality && (isFlagLoading ? (
                            <LittleSpinner/>
                        ) : displayFlag ? (
                            <div className={styles.nationality}>
                                <Image
                                    src={displayFlag}
                                    alt={"Drapeau"}
                                    width={500}
                                    height={500}
                                />
                            </div>
                        ) : null)
                    }
                </div>
                <div className={styles.infoContainer}>
                    <h3>{displayname}</h3>
                    <Link href={ROUTES.ARTISTES.PROFIL(artist.id)}>
                        <button>
                            Voir le profil
                        </button>
                    </Link>
                </div>
            </div>
            <div className={styles.oeuvres}>
                <div className={styles.oeuvreContainer}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={"/assets/img/oeuvres/oeuvre1.jpg"}
                            alt={"Photo de l'oeuvre de l'artiste Levalet"}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className={styles.oeuvreInfo}>
                        <h4>Titre de l&apos;oeuvre</h4>
                    </div>
                </div>
                <div className={styles.oeuvreContainer}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={"/assets/img/oeuvres/oeuvre1.jpg"}
                            alt={"Photo de l'oeuvre de l'artiste Levalet"}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className={styles.oeuvreInfo}>
                        <h4>Titre de l&apos;oeuvre</h4>
                    </div>
                </div>
                <div className={styles.oeuvreContainer}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={"/assets/img/oeuvres/oeuvre1.jpg"}
                            alt={"Photo de l'oeuvre de l'artiste Levalet"}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className={styles.oeuvreInfo}>
                        <h4>Titre de l&apos;oeuvre</h4>
                    </div>
                </div>
            </div>
            <div className={styles.moreOeuvres}>
                <button>
                    Voir plus...
                </button>
            </div>
        </div>
    )
}