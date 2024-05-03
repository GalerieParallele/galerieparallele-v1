import React, {useEffect, useState} from 'react';

import {useAuth} from "@/hooks/useAuth";

import Image from "next/image";

import "@/app/globals.css";
import styles from './Index.module.css';

import AlreadyLoginComponent from "@/components/authentication/AlreadyLoginComponent";
import BigSpinner from "@/components/ui/BigSpinner";

import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/router";
import RegisterMultiStep from "@/components/ui/multi-step-form/forms/RegisterMultiStep";
import LoginMultiStep from "@/components/ui/multi-step-form/forms/LoginMultiStep";


export default function Index() {

    const router = useRouter();

    const [login, setLogin] = useState(true);
    const [imageNumber, setImageNumber] = useState(0);

    useEffect(() => {
        setImageNumber(chooseRandomNumber());
    }, []);

    const {user, isLoading} = useAuth();

    return (
        <main className={styles.main}>
            <div className={styles.left}>
                {
                    imageNumber === 0 ? (
                        <BigSpinner/>
                    ) : (
                        <Image
                            src={`/assets/img/login/login${imageNumber}.jpg`}
                            alt={`Photo d'illustration de connexion numéro ${imageNumber}`}
                            width={500}
                            height={500}
                            priority
                        />
                    )
                }
            </div>
            <div className={styles.right}>
                <button
                    onClick={() => {
                        router.back();
                    }}
                    className={styles.iconBox}>
                    <FaArrowLeft className={styles.icon}/>
                </button>
                <div className={styles.authSpace}>
                    {isLoading && !user ? (
                        <BigSpinner/>
                    ) : (
                        (user ? (
                            <>
                                <AlreadyLoginComponent/>
                            </>
                        ) : (
                            <>
                                <div className={styles.head}>
                                    <h4>
                                        <button
                                            onClick={() => {
                                                router.back();
                                            }}
                                            className={styles.headButton}>
                                            <FaArrowLeft className={styles.icon}/>
                                        </button>
                                    </h4>
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
                                        Devenir Membre
                                    </h4>
                                </div>
                                <form className={styles.inputs}>
                                    {login ? <LoginMultiStep/> : <RegisterMultiStep/>}
                                </form>
                            </>
                        ))
                    )}
                </div>
            </div>
        </main>);
}

function chooseRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}
