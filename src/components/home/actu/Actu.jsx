import React from "react";

import styles from "./Actu.module.css"
import Image from "next/image";
import Button from "@/components/ui/button/Button";

export default function Actu() {
    return (
        <div className={styles.actu}>
            <div className={styles.imgContainer}>
                <video autoPlay loop muted>
                    <source src="https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/actus%2FVid%C3%A9o%20Juan%20Carlos%20Just%20Fontaine.mp4?alt=media&token=04597630-7418-42c3-8e1b-fb0dea2b001b" type="video/mp4"/>
                </video>
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