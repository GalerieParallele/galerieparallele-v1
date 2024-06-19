import React from "react";

import styles from "./PictoItem.module.css"
import PropTypes from "prop-types";
import Image from "next/image";

export default function PictoItem({mediaURL, title}) {
    return (
        <div className={styles.pictoItem}>
            <div className={styles.icon}>
                <Image src={mediaURL} alt={title} width={50} height={50} />
            </div>
            <h6>{title}</h6>
        </div>
    )
}

PictoItem.propTypes = {
    mediaURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}