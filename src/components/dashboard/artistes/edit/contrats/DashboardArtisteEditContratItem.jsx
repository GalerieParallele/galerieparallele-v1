import {FcFolder} from "react-icons/fc";

import styles from './DashboardArtisteEditContratItem.module.scss';
import {FaRegFileLines} from "react-icons/fa6";
import {MdEdit} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";

export default function DashboardArtisteEditContratItem({folder, name}) {

    return (
        <div className={styles.main}>
            <div>
                {
                    folder ? <FcFolder/> : <FaRegFileLines/>
                }
            </div>
            <div>
                <p>{name}</p>
            </div>
            <div className={styles.actions}>
                <button
                className={styles.edit}
                >
                    <MdEdit/>
                </button>
                <button
                className={styles.delete}
                >
                    <FaRegTrashAlt/>
                </button>
            </div>
        </div>
    )
}