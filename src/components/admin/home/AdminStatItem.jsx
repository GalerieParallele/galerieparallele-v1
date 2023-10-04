import React from 'react';

import PropTypes from "prop-types";

import styles from "./AdminStatItem.module.css"

export default function AdminStatItem({number, type}) {
    return <div className={styles.adminStatItem}>
        <h1>{number}</h1>
        <p>{type}</p>
    </div>
}

AdminStatItem.propTypes = {
    number: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
}