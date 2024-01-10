import {FcFolder} from "react-icons/fc";

import styles from './DashboardArtisteEditContratItem.module.scss';
import {FaRegFileLines} from "react-icons/fa6";

export default function DashboardArtisteEditContratItem({folder, name}) {

    return (
        <div className={styles.main}>
            <div>
                {
                    folder ? <FcFolder/> : <FaRegFileLines />
                }
            </div>
            <div>
                <p>{name}</p>
            </div>
        </div>
    )
}