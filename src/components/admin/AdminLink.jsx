import React from "react";

import Link from "next/link";
import PropTypes from "prop-types";

import ROUTES from "@/constants/ROUTES";

import {MdQuestionMark} from "react-icons/md";

import styles from "../../styles/components/admin/AdminLink.module.css"

export default function AdminLink({IconComponent, text, to}) {
    return <Link
        href={to}
        className={styles.adminLink}>
        <div>
            {IconComponent && <IconComponent className={styles.icon}/>}
        </div>
        <div>
            <p>  {text}</p>
        </div>
    </Link>
}

AdminLink.propTypes = {
    IconComponent: PropTypes.elementType,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
}

AdminLink.defaultProps = {
    IconComponent: MdQuestionMark,
    to: ROUTES.ADMIN.INDEX
}