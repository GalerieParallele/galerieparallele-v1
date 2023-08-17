import React from 'react';

import Image from "next/image";

import {FaArrowLeft} from "react-icons/fa";

import "@/app/globals.css";
import styles from '/src/pages/login.module.css';
import Link from "next/link";
import IconInput from "@/components/IconInput";
import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";
import Button from "@/components/Button";

export default function Login() {

    const [login, setLogin] = React.useState(false);

    return (<main className={styles.main}>
            <div className={styles.left}>
                <Image
                    src={"/assets/img/login/login" + chooseRandomNumber() + ".jpg"}
                    alt={"Photo d'illustration de connexion numéro " + chooseRandomNumber()}
                    width={500} height={500}
                />
            </div>
            <div className={styles.right}>
                <Link href={"/"} className={styles.iconBox}>
                    <FaArrowLeft className={styles.icon}/>
                </Link>
                <div className={styles.authSpace}>
                    <div className={styles.head}>
                        <h4>Connexion</h4>
                        <h4>Inscription</h4>
                    </div>
                    <div className={styles.inputs}>
                        <IconInput
                            label={"E-mail"}
                            IconComponent={MdEmail}
                            type={"email"}
                        />
                        <IconInput
                            label={"Mot de passe"}
                            IconComponent={FiLock}
                            type={"password"}
                        />
                    </div>
                    <div>
                        <Button text={"Connexion"}/>
                    </div>
                </div>
            </div>
        </main>
    );
}

function chooseRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}