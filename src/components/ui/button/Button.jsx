import React from 'react';

import styles from './Button.module.css';

import "../../../app/globals.css"

import LittleSpinner from "@/components/ui/LittleSpinner";

export default function Button({text, isLoading, onClick, disabled, isWhite}) {
    const buttonStyle = isWhite ? `${styles.button} ${styles.white}` : styles.button;

    return (
        disabled ? (
            <button
                className={buttonStyle}
                disabled
            >
                {text}
            </button>
        ) : (
            <button
                className={buttonStyle}
                disabled={isLoading}
                onClick={onClick}
            >
                {isLoading ? <LittleSpinner/> : text}
            </button>
        )
    );
}
