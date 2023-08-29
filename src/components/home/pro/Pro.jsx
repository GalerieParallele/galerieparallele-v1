import React from "react";

import Image from "next/image";

import Button from "@/components/items/Button";

import styles from "@/styles/components/home/Pro.module.css"

export default function Pro() {
    return (
        <div className={styles.pro}>
            <div className={styles.left}>
                <Image
                    src={"/assets/img/pro.png"}
                    alt={"test"}
                    fill
                    priority
                />
            </div>
            <div className={styles.right}>
                <h4>Lorem ipsum dolor sit amet. Aut sunt beatae in optio expedita eos accusantium laboriosam qui
                    cupiditate nulla.</h4>
                <Button
                    text={"BOUTON"}
                />
            </div>
        </div>
    )
}