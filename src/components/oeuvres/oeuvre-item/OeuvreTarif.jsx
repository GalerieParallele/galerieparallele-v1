import styles from './OeuvreTarif.module.scss';

import {IoIosArrowForward} from "react-icons/io";
import {useState} from "react";
import Link from "next/link";
import {LuMousePointerClick} from "react-icons/lu";

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
                <span className={open ? styles.open : styles.close}>
                    <IoIosArrowForward/>
                </span>
                <p>Tarifs</p>
                {
                    !open && (
                        <span className={styles.clickMe}>
                    <LuMousePointerClick/>
                </span>
                    )
                }
            </div>
            <div className={`${styles.content} ${open ? styles.open : styles.close}`}>
                <p>Prix: {prix}€</p>
                <div className={styles.buyContainer}>
                    <Link
                        href={'#'}
                        className={styles.bailArt}
                    >
                        Acheter
                    </Link>
                    <Link
                        href={'#'}
                        className={styles.bailArt}
                    >
                        Bail Art
                    </Link>
                </div>
            </div>
        </div>
    )

}