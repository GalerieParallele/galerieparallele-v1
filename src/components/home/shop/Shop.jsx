import React from "react";

import styles from "@/styles/components/home/Shop.module.css"
import ShopItem from "@/components/home/shop/ShopItem";
import Button from "@/components/items/Button";

export default function Shop() {
    return (
        <div className={styles.shop}>
            <div className={styles.list}>
                <ShopItem
                    articleName={"Oeuvre test"}
                    imgSrc={"article1.png"}
                />
                <ShopItem
                    articleName={"Oeuvre test"}
                    imgSrc={"article1.png"}
                />
                <ShopItem
                    articleName={"Oeuvre test"}
                    imgSrc={"article1.png"}
                />
            </div>
            <div>
                <Button
                    text={"VOIR PLUS"}
                />
            </div>
        </div>
    )
}