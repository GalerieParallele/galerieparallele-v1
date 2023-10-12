import React from "react";

import Head from "next/head";

import {useAuth} from "@/hooks/useAuth";

import Hero from "@/components/home/hero/Hero";
import Actu from "@/components/home/actu/Actu";
import Artiste from "@/components/home/artistes/Artiste";
import Mentra from "@/components/home/mentra/Mentra";
import Shop from "@/components/home/shop/Shop";

import PageLoader from "@/components/items/PageLoader";

import styles from './Index.module.css'
import Pro from "@/components/home/pro/Pro";
import Picto from "@/components/items/picto/Picto";
import Amo from "@/components/home/amo/Amo";
import MainMagazine from "@/components/home/magazine/MainMagazine";
import Footer from "@/components/items/footer/Footer";
import MainInstagram from "@/components/home/instagram/MainInstagram";
import Navbar from "@/components/items/navbar/Navbar";
import Newletters from "@/components/home/newsletters/Newletters";

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
                        <Pro/>
                        <Picto/>
                        <Amo/>
                        <MainMagazine/>
                        <MainInstagram/>
                        <Newletters/>
                        <Footer/>
                    </main>
                </>

            )}
        </>
    )
}