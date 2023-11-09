import Image from "next/image";

import styles from "./HeadReimsIndex.module.scss"

export default function HeadReimsIndex() {
    return (
        <div className={styles.main}>
            <div
                className={styles.mainContent}>
                <h1>Reims depuis</h1>
                <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.</p>
            </div>
            <Image
                src={"/assets/img/back-cathe.jpg"}
                alt={"Cathédrale de Reims"}
                width={2000}
                height={2000}
            />
            <div
                className={styles.overlay}
            />
        </div>
    )
}