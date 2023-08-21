import React from "react";

import {useAuth} from "@/hooks/useAuth";

import Hero from "@/components/accueil/hero/Hero";
import Navbar from "@/components/Navbar";

import BigSpinner from "@/components/items/BigSpinner";

import styles from '../styles/pages/accueil.module.css'

export default function () {

    const {isLoading} = useAuth()

    return (
        <>
            <main className={styles.main}>
                {isLoading ? (
                    <BigSpinner/>
                ) : (
                    <>
                        <Hero/>
                        <Navbar/>
                    </>

                )}
            </main>
        </>
    )
}