import React from "react";

import Image from "next/image";

import styles from "./ArtisteCard.module.css"

export default function ArtisteCard({artist}) {

    const displayname = artist.pseudo ? artist.pseudo : artist.user.firstname + artist.user.lastname;

    return (
        <div className={styles.artisteCard}>
            <div>
                <div className={styles.imageContainer}>
                    <Image
                        src={artist.user.avatarURL ? artist.user.avatarURL : "/assets/img/avatar.png"}
                        alt={`Avatar de l'ariste ${displayname}`}
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div>
                <h5>{displayname}</h5>
            </div>
        </div>
    )
}