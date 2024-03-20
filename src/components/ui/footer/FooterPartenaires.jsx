import Image from "next/image";

import styles from "./FooterPartenaires.module.scss";

export default function FooterPartenaires() {

    const partners = ["amcompo", "bertacchi", "dphome", "eclat", "jacquart", "uh5", "yk"];

    return (
        <div className={styles.list}>
            {partners.map(imgName => (
                <div key={imgName} className={styles.imgContainer}>
                    <Image
                        src={`/assets/img/partenaires/${imgName}.png`}
                        alt={`Logo de l'entreprise ${imgName}`}
                        width={200}
                        height={200}
                    />
                </div>
            ))}
        </div>
    )
}
