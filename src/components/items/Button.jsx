import React from 'react';

import styles from '../../styles/components/Button.module.css';

import "../../app/globals.css"

import LittleSpinner from "@/components/items/LittleSpinner";

export default function Button({text, isLoading, onClick, disabled}) {
    return (
        disabled ? (
            <button
                className={styles.button}
                disabled
            >
                {text}
            </button>
        ) : (
            <button
                className={styles.button}
                disabled={isLoading}
                onClick={onClick}
            >
                {isLoading ? <LittleSpinner/> : text}
            </button>
        )
    );
}

