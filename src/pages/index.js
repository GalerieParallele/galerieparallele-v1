import React from "react";

import {useAuth} from "@/hooks/useAuth";

import Hero from "@/components/accueil/hero/Hero";
import Navbar from "@/components/Navbar";
import Actu from "@/components/accueil/actu/Actu";

import BigSpinner from "@/components/items/BigSpinner";

import styles from '../styles/pages/accueil.module.css'
import Artiste from "@/components/accueil/artistes/Artiste";
import Head from "next/head";
import Mentra from "@/components/accueil/mentra/Mentra";

export default function Index() {

    const {isLoading} = useAuth()

    return (
        <>
            <Head>
                <title>GP - Accueil</title>
            </Head>
            <main className={styles.main}>
                {isLoading ? (
                    <BigSpinner/>
                ) : (
                    <>
                        <Hero/>
                        <Navbar/>
                        <Actu/>
                        <Artiste/>
                        <Mentra/>
                    </>

                )}
            </main>
        </>
    )
}