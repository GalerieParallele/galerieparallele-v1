import React from "react";

import Image from "next/image";

import Button from "@/components/items/Button";

import styles from "@/styles/components/home/ShopItem.module.css";

export default function ShopItem({imgSrc, articleName}) {
    return (
        <div className={styles.shopItem}>
            <div className={styles.imgContainer}>
                <Image
                    src={`/assets/img/shop/${imgSrc}`}
                    alt={`Photo du shop de l'article ${articleName}`}
                    fill
                />
            </div>
            <div className={styles.informations}>
                <h5>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant
                    impression.</h5>
                <Button
                    text={"BOUTON"}
                />
            </div>
            <div className={styles.bottom}>
                <h5>{articleName}</h5>
            </div>
        </div>
    )
}