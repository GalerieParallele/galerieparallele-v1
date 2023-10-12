import {AuthProvider} from "@/hooks/useAuth";
import NextNProgress from 'nextjs-progressbar';
import SocketProvider from "@/provider/SocketProvider";

import "@/app/globals.css"

function MyApp({Component, pageProps}) {
    return (
        <AuthProvider>
            <SocketProvider>
                <NextNProgress options={{easing: 'ease', speed: 500}}/>
                <Component {...pageProps} />
            </SocketProvider>
        </AuthProvider>
    );
}

export default MyApp;
