import Image from "next/image";

import styles from "./FooterMap.module.scss";

export default function FooterMap() {
    return (
        <div className={styles.main}>
            <p>Retrouvez-nous</p>
            <div className={styles.imgContainer}>
                <Image
                    src={"/assets/img/map.png"}
                    alt={"Map vers la galerie"}
                    width={300}
                    height={300}
                />
            </div>
        </div>
    )
}