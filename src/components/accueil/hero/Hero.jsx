import React from "react";

import {BiChevronsDown} from "react-icons/bi";

import styles from "@/styles/components/Hero.module.css";
import Image from "next/image";

export default function Hero() {

    return (<div className={styles.hero}>
        <div className={styles.top}>
            <div className={styles.experienceButton}>
                <p>Démarrer l&rsquo;expérience</p>
            </div>
        </div>
        <div className={styles.center}>
            <Image
                src={"/assets/img/logo.svg"}
                alt={"test"}
                width={220}
                height={220}
            />
        </div>
        <div className={styles.bottom}>
            <BiChevronsDown className={styles.icon}/>
        </div>
    </div>)
}