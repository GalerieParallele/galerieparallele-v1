import styles from './OeuvreTarif.module.scss';
import {useState} from "react";
import Link from "next/link";

export default function OeuvreTarif({prix}) {

    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    }

    return (
        <div className={styles.main}>
            <div
                className={styles.head}
                onClick={handleToggle}
            >
                <p>Tarifs</p>
            </div>
            <div className={`${styles.content} ${open ? styles.open : styles.close}`}>
                <p>{prix} €</p>
                <div className={styles.buyContainer}>
                    <Link
                        href={'#'}
                        className={styles.buyButton}
                    >
                        Acheter cette oeuvre
                    </Link>
                </div>
            </div>
        </div>
    )

}