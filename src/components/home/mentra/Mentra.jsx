import React from "react";

import styles from "../../../styles/components/home/Mentra.module.css"
import Button from "@/components/items/Button";

export default function Mentra() {
    return (
        <div className={styles.mentra}>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua
            </h3>
            <Button
                text={"Bouton"}
            />
        </div>
    )
}