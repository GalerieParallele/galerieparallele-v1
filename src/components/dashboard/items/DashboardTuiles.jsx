import {FaRegQuestionCircle} from "react-icons/fa";

import styles from './DashboardTuiles.module.scss';
import Link from "next/link";

export default function DashboardTuiles({IconComponent, name, to}) {
    return (
        <Link
            href={to}
            className={styles.main}
        >
            <div className={styles.icon}>
                {IconComponent ? <IconComponent/> : <FaRegQuestionCircle/>}
            </div>
            <h2>{name}</h2>
        </Link>
    )
}