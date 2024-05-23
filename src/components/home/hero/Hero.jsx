import React from "react";

import {BiChevronsDown} from "react-icons/bi";

import styles from "./Hero.module.css";

import Spline from '@splinetool/react-spline';

export default function Hero() {

    return (
        <div className={styles.hero}>
            <div className={styles.top}>
                <div className={styles.experienceButton}>
                    <p>Démarrer l&rsquo;expérience</p>
                </div>
            </div>
            <div className={styles.center}>
                {/*<Image*/}
                {/*    src={"/assets/img/white-logo.svg"}*/}
                {/*    alt={"test"}*/}
                {/*    width={200}*/}
                {/*    height={200}*/}
                {/*    style={{transform: `rotate(${rotation}deg) scale(${scale})`}}*/}
                {/*/>*/}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Spline scene="https://prod.spline.design/zlSkwnLSpKd6R4wS/scene.splinecode"
                            className={styles.canva}/>
                </div>

            </div>
            <div className={styles.bottom}>
                <BiChevronsDown className={styles.icon}/>
            </div>
        </div>
    );
}

