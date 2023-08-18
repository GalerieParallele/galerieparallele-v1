import React from 'react';

import styles from '../styles/components/Button.module.css';
import {ImSpinner6} from "react-icons/im";

export default function Button({text, isLoading, onClick}) {
    return (
        <button
            className={styles.button}
            disabled={isLoading}
            onClick={onClick}
        >
            {isLoading ? <ImSpinner6 className={styles.loader}/> : text}
        </button>
    );
}
