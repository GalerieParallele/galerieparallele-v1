import React from "react";

import styles from "@/components/home/shop/Shop.module.css"
import ShopItem from "@/components/home/shop/ShopItem";
import Button from "@/components/ui/button/Button";
import {useRouter} from "next/router";
import ROUTES from "@/constants/ROUTES";

export default function Shop() {

    const router = useRouter();

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
                    onClick={() => router.push(ROUTES.OEUVRES.HOME)}
                />
            </div>
        </div>
    )
}