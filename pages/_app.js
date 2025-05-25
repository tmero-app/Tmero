import Head from 'next/head';
import "swiper/css";
import "swiper/css/navigation";
import '../public/css/bootstrap.min.css';
import '../public/css/style.css';
import '../public/css/responsive.css';
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); 

        setTimeout(() => {
            setLoading(false);
        }, 2000);

        // import('wowjs').then((WOW) => {
        //     const wowInstance = new WOW.WOW({ live: false });
        //     wowInstance.init();
        // });
    }, []);

    if (!isClient) {
        return null; 
    }

    return (
        <>
        <Head>
        <link rel="icon" href="/images/favicon.png" />
        <title>Tmero</title>
      </Head>
            {!loading ? (
                <Component {...pageProps} />
            ) : (
                <div className="preloader"></div>
            )}
        </>
    );
}

export default MyApp;
