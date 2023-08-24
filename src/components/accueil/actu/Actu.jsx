import React from "react";

import styles from "../../../styles/components/home/Actu.module.css"
import Image from "next/image";
import Button from "@/components/items/Button";

export default function Actu() {
    return (
        <div className={styles.actu}>
            <div className={styles.imgContainer}>
                <Image
                    src={"/assets/img/actualite.jpeg"}
                    alt={"Photo d'actualité"}
                    fill
                />
            </div>
            <div className={styles.layoutFilter}></div>
            <div className={styles.content}>
                <h2>LOREM IPSUM</h2>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</h4>
                <Button
                    text={"BOUTON"}
                />
            </div>
        </div>
    )
}