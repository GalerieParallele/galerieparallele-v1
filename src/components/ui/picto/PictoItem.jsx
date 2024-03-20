import React from "react";

import styles from "./PictoItem.module.css"
import PropTypes from "prop-types";

export default function PictoItem({IconComponent, title}) {
    return (
        <div className={styles.pictoItem}>
            <div className={styles.icon}>
                {IconComponent && <IconComponent/>}
            </div>
            <h6>{title}</h6>
        </div>
    )
}

PictoItem.propTypes = {
    IconComponent: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired
}