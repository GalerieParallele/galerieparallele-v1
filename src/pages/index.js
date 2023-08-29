import React from "react";

import Head from "next/head";

import {useAuth} from "@/hooks/useAuth";

import Hero from "@/components/home/hero/Hero";
import Navbar from "@/components/items/Navbar";
import Actu from "@/components/home/actu/Actu";
import Artiste from "@/components/home/artistes/Artiste";
import Mentra from "@/components/home/mentra/Mentra";
import Shop from "@/components/home/shop/Shop";

import PageLoader from "@/components/items/PageLoader";

import styles from '../styles/pages/Accueil.module.css'

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
                        <Shop/>
                    </main>
                </>

            )}

        </>
    )
}