import React from "react";

import styles from "@/components/home/shop/Shop.module.css"
import ShopItem from "@/components/home/shop/ShopItem";
import Button from "@/components/ui/button/Button";

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
            <div className={styles.buttonSpace}>
                <Button
                    text={"VOIR PLUS"}
                />
            </div>
        </div>
    )
}