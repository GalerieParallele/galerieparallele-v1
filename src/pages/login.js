import React from 'react';

import {useAuth} from "@/hooks/useAuth";

import Image from "next/image";
import Link from "next/link";

import "@/app/globals.css";
import styles from '/src/styles/pages/login.module.css';

import LoginComponent from "@/components/LoginComponent";
import RegisterComponent from "@/components/RegisterComponent";

import {FaArrowLeft} from "react-icons/fa";

export default function Login() {

    const [login, setLogin] = React.useState(true);
    const randomImageNumber = chooseRandomNumber();

    const {signIn, user} = useAuth();

    return (<main className={styles.main}>
        <div className={styles.left}>
            <Image
                src={`/assets/img/login/login${randomImageNumber}.jpg`}
                alt={`Photo d'illustration de connexion numéro ${randomImageNumber}`}
                width={500} height={500}
            />
        </div>
        <div className={styles.right}>
            <Link href={"/"} className={styles.iconBox}>
                <FaArrowLeft className={styles.icon}/>
            </Link>
            <div className={styles.authSpace}>
                <div className={styles.head}>
                    <h4
                        className={login ? styles.activeSection : ""}
                        onClick={() => setLogin(true)}
                    >
                        Connexion
                    </h4>
                    <h4
                        className={!login ? styles.activeSection : ""}
                        onClick={() => setLogin(false)}
                    >
                        Inscription
                    </h4>
                </div>
                <form className={styles.inputs}>
                    {login ? <LoginComponent/> : <RegisterComponent/>}
                </form>
            </div>
        </div>
    </main>);
}

function chooseRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}
