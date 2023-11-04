import React from "react";

import Link from "next/link";
import PropTypes from "prop-types";

import {MdQuestionMark} from "react-icons/md";

import styles from "./AdminLink.module.css"

export default function AdminLink({IconComponent, text, to}) {

    const isActive = to && to !== "#";

    if (!isActive) {
        return (
            <div className={`${styles.inactive} ${styles.adminLink}`}>
                <div>
                    {IconComponent && <IconComponent className={styles.icon}/>}
                </div>
                <div>
                    <p>{text}</p>
                </div>
            </div>
        )
    }

    return (
        <Link href={to} className={styles.adminLink}>
            <div>
                {IconComponent && <IconComponent className={styles.icon}/>}
            </div>
            <div>
                <p>{text}</p>
            </div>
        </Link>
    )
}

AdminLink.propTypes = {
    IconComponent: PropTypes.elementType,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
}

AdminLink.defaultProps = {
    IconComponent: MdQuestionMark,
    to: "#"
}