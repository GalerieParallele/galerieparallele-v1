import styles from './OeuvreTarif.module.scss';
import {useState} from "react";
import Link from "next/link";

export default function OeuvreTarif({oeuvre}) {

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
                <p>{oeuvre && oeuvre.prix} €</p>
                <div className={styles.buyContainer}>
                    {
                        oeuvre && oeuvre.artsperURL && (
                            <Link
                                href={oeuvre.artsperURL}
                                className={styles.buyButton}
                                target={'_blank'}
                            >
                                Acheter cette oeuvre
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )

}