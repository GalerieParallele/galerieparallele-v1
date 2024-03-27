import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import React, {useState} from "react";

import styles from './ArtisteNewSectionItem.module.scss';
import Swal from "sweetalert2";

export default function ArtisteNewSectionItem({sectionName, description, required, children}) {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleOpenModalRequired = () => {
        Swal.fire({
            icon: 'info',
            title: "Section à champ(s) requis",
            text: "Veillez à bien remplir tous les champs requis dans cette section avant de continuer.",
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
                <h3>{sectionName}{required &&
                    <span
                        onClick={handleOpenModalRequired}
                        title={"Section requise avant de compléter"}
                        style={{
                            color: "red",
                        }}> *
                </span>}
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