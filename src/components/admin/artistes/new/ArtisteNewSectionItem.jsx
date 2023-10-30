import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import React, {useState} from "react";

import styles from './ArtisteNewSectionItem.module.scss';

export default function ArtisteNewSectionItem({sectionName, children}) {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (<div className={styles.section}>
        <button
            onClick={handleClick}
            className={styles.sectionHead}>
            <div>
                {open ? <FaChevronDown/> : <FaChevronRight/>}
            </div>
            <h3>{sectionName}</h3>
        </button>
        <form
            onSubmit={(e) => e.preventDefault()}
            className={`${!open ? styles.close : styles.open} ${styles.sectionContent}`}>
            {children}
        </form>
    </div>)
}