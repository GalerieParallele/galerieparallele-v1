import React from "react";

import styles from "../styles/pages/admin.module.css"
import Image from "next/image";

export default function Admin() {
    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <div>
                    <div className={styles.imageContainer}>
                        <Image
                            src={"/assets/img/white-logo.svg"}
                            alt={"Logo de la galerie"}
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div>
                    <p>Utilisateurs</p>
                </div>
                <div>

                </div>
            </div>
            <div className={styles.right}>
                <p>right</p>
            </div>
        </main>
    )
}