import {AuthProvider} from "@/hooks/useAuth";
import NextNProgress from 'nextjs-progressbar';

function MyApp({Component, pageProps}) {
    return (
        <AuthProvider>
            <NextNProgress options={{ easing: 'ease', speed: 500 }}/>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
