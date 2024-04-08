import styles from './Confiance.module.scss';
import Image from "next/image";

export default function Confiance() {
    return (
        <div className={styles.main}>
            <h2>Il nous font confiance</h2>
            <div className={styles.list}>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/bioxa.png"}
                        alt={"Logo de bioxa"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/caf.png"}
                        alt={"Logo de la CAF"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/cafe_miguel.jpg"}
                        alt={"Logo de cafe miguel"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/champagne charles cazanove.png"}
                        alt={"Logo du champagne charles cazanove"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/champagne_palmer.png"}
                        alt={"Logo du champagne palmer"}
                        width={1500}
                        height={1500}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/confiance/chaserne chanzy.png"}
                        alt={"Logo de la chaserne chanzy à Reims"}
                        width={1500}
                        height={1500}
                    />
                </div>
            </div>
        </div>
    )
}