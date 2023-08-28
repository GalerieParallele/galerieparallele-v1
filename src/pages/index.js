import React from "react";

import {useAuth} from "@/hooks/useAuth";

import Hero from "@/components/accueil/hero/Hero";
import Navbar from "@/components/items/Navbar";
import Actu from "@/components/accueil/actu/Actu";

import BigSpinner from "@/components/items/BigSpinner";

import styles from '../styles/pages/Accueil.module.css'
import Artiste from "@/components/accueil/artistes/Artiste";
import Head from "next/head";
import Mentra from "@/components/accueil/mentra/Mentra";
import PageLoader from "@/components/items/PageLoader";

export default function Index() {

    const {isLoading} = useAuth()

    return (
        <>
            <Head>
                <title>GP - Accueil</title>
            </Head>

            {isLoading ? (
                <PageLoader/>
            ) : (
                <>
                    <main className={styles.main}>
                        <Hero/>
                        <Navbar/>
                        <Actu/>
                        <Artiste/>
                        <Mentra/>
                    </main>
                </>

            )}

        </>
    )
}