import React from "react";

import styles from "@/styles/components/home/ShopItem.module.css"
import Button from "@/components/items/Button";

export default function ShopItem() {
    return (
        <div className={styles.shopItem}>
            <div>
                <h5>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant
                    impression.</h5>
                <Button
                    text={"BOUTON"}
                />
            </div>
        </div>
    )
}