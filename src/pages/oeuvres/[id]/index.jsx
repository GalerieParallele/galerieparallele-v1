import styles from './Index.module.scss';
import Navbar from "@/components/ui/navbar/Navbar";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Carousel from "@/components/ui/carousel/Carousel";
import {FaFacebook, FaHeart, FaInstagram, FaRegHeart, FaWhatsapp} from "react-icons/fa";
import Link from "next/link";

export default function OeuvreHomePage() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [oeuvreId, setOeuvreId] = useState(null);

    useEffect(() => {

        const routerId = router.query.id;

        if (routerId && /^\d+$/.test(routerId)) {
            setOeuvreId(parseInt(routerId));
            setError(false);
        } else {
            setError(true);
        }

        setLoading(false);

    }, [router, router.query.id]);


    return (
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.carouselContainer}>
                        <Carousel images={[
                            '/assets/img/no-img.jpg',
                            '/assets/img/harcourt2.jpg',
                            '/assets/img/harcourt1.jpg'
                        ]}/>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.head}>
                            <h2>La joconde</h2>
                            <span><FaRegHeart className={styles.emptyHeart}/><FaHeart style={styles.fillHeart}/></span>
                        </div>
                        <div className={styles.shareContainer}>
                            <p>Partagez-moi</p>
                            <div>
                                <Link href={"#"} target={"_blank"} className={styles.socialButton}><FaFacebook/></Link>
                                <Link href={"#"} target={"_blank"} className={styles.socialButton}><FaInstagram/></Link>
                                <Link href={"#"} target={"_blank"} className={styles.socialButton}><FaWhatsapp/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Picto/>
            <Footer/>
        </div>
    )

}