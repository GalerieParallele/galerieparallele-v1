import {AuthProvider} from "@/hooks/useAuth";
import NextNProgress from 'nextjs-progressbar';
import "@/app/globals.css"
import Head from "next/head";

function MyApp({Component, pageProps}) {
    return (
        <AuthProvider>
            <Head>
                <title>GalerieParallèle</title>
                <description>Bienvenue sur le site officiel de la GalerieParallèle. Retrouvez toutes nos oeuvres,
                    artistes, et bien plus encore.
                </description>
            </Head>
            <NextNProgress options={{easing: 'ease', speed: 500, showSpinner: false}}/>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
