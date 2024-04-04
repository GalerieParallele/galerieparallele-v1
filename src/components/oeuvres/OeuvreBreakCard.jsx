import Link from "next/link";

import styles from './OeuvreBreakCard.module.scss';

export default function OeuvreBreakCard({Icon, title, content, buttonText, buttonLink, buttonAction}) {

    return (
        <div className={styles.main}>
            <div className={styles.icon}>
                {Icon && <Icon/>}
            </div>
            <div className={styles.title}>
                <h3>{title}</h3>
            </div>
            <div className={styles.content}>
                <p>{content}</p>
            </div>
            <div className={styles.button}>
                {
                    buttonAction && <button onClick={buttonAction}>{buttonText}</button>
                }
                {
                    buttonLink && <Link href={buttonLink}>{buttonText}</Link>
                }
            </div>
        </div>
    )

}