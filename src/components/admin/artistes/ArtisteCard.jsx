import Image from "next/image";
import {FaUserEdit} from "react-icons/fa";

import styles from './ArtisteCard.module.scss';
import {FaTrashCan} from "react-icons/fa6";
import {MdModeEditOutline} from "react-icons/md";

export default function ArtisteCard({artiste}) {

    const displayname = artiste.pseudo ? artiste.pseudo : artiste.User.lastname + " " + artiste.User.firstname;

    return (
        <div className={styles.main}>
            <div>
                <div className={styles.imgContainer}>
                    <Image
                        src={artiste.User.avatarURL}
                        alt={"Photo de " + displayname}
                        width={300}
                        height={300}
                    />
                </div>
            </div>
            <div>
                <h3>{displayname}</h3>
            </div>
            <div className={styles.actionsButtons}>
                <button className={styles.edit}>
                    <MdModeEditOutline/>
                </button>
                <button className={styles.delete}>
                    <FaTrashCan/>
                </button>
            </div>
        </div>
    );
}