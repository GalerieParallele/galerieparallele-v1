import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import React, {useState} from "react";

import styles from './DashboardSectionItem.module.scss';
import Swal from "sweetalert2";

export default function DashboardSectionItem({sectionName, description, required, children, defaultOpen}) {

    const [open, setOpen] = useState(defaultOpen ? defaultOpen : false);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleOpenModalRequired = () => {
        Swal.fire({
            icon: 'info',
            title: "Section requise avant de compléter",
            text: "Veillez à remplir tous les champs requis dans cette section avant d'enregistrer l'artiste",
        })
    }

    return (<div className={styles.section}>
        <button
            onClick={handleClick}
            className={styles.sectionHead}>
            <div>
                {open ? <FaChevronDown/> : <FaChevronRight/>}
            </div>
            <div>
                <h3>{sectionName}{required ?
                    <span
                        onClick={handleOpenModalRequired}
                        title={"Section requise avant de compléter"}
                        style={{
                            color: "red",
                        }}> *
                </span> : ""}
                </h3>
                {description && <p>{description}</p>}
            </div>
        </button>
        <form
            onSubmit={(e) => e.preventDefault()}
            className={`${!open ? styles.close : styles.open} ${styles.sectionContent}`}>
            {children}
        </form>
    </div>)
}