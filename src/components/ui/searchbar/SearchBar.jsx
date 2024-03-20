import {FaSearch} from "react-icons/fa";
import React from "react";

import styles from './SearchBar.module.scss';

export default function SearchBar({placeholder, IconComponent}) {
    return (
        <div className={styles.main}>
            <input
                className={styles.searchBarInput}
                type={"text"}
                name={"search"}
                placeholder={placeholder}
            />
            <span className={styles.searchBarIcon}>
                {IconComponent ? <IconComponent/> : <FaSearch/>}
            </span>
        </div>
    )
}