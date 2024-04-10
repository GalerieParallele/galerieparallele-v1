import styles from './Index.module.scss';
import Navbar from "@/components/ui/navbar/Navbar";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import {useRouter} from "next/router";
import Confiance from "@/components/ui/confiance/Confiance";

export default function MagazineIndex() {

    const router = useRouter();

    const fakeArticles = [
        {
            date: "25 juillet 2024",
            title: "L'art de la montagne",
            img: "https://picsum.photos/500/500?random=1",
            alt: "Photo de l'article à la une",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            date: "25 juillet 2024",
            title: "L'art de la montagne",
            img: "https://picsum.photos/500/500?random=2",
            alt: "Photo de l'article à la une",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            date: "25 juillet 2024",
            title: "L'art de la montagne",
            img: "https://picsum.photos/500/500?random=3",
            alt: "Photo de l'article à la une",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            date: "25 juillet 2024",
            title: "L'art de la montagne",
            img: "https://picsum.photos/500/500?random=4",
            alt: "Photo de l'article à la une",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            date: "25 juillet 2024",
            title: "L'art de la montagne",
            img: "https://picsum.photos/500/500?random=4",
            alt: "Photo de l'article à la une",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            date: "25 juillet 2024",
            title: "L'art de la montagne",
            img: "https://picsum.photos/500/500?random=4",
            alt: "Photo de l'article à la une",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ]

    return (
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.content}>
                <Link href={"#"} className={styles.atTheTop}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={'/assets/img/back_error2.jpg'}
                            alt={"Photo de l'article à la une"}
                            width={1920}
                            height={1080}
                        />
                    </div>
                    <h6>25 juillet 2024</h6>
                    <h3>L&apos;art de la montagne</h3>
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua.</h5>
                </Link>
                <div className={styles.lastArticles}>
                    <h2>Derniers articles</h2>
                    <div className={styles.list}>
                        {
                            fakeArticles.map((article, index) => {
                                return (
                                    <Link href={"#"} key={index} className={styles.article}>
                                        <div className={styles.imgContainer}>
                                            <Image
                                                src={article.img}
                                                alt={article.alt}
                                                width={500}
                                                height={500}
                                            />
                                        </div>
                                        <h6>{article.date}</h6>
                                        <h4>{article.title}</h4>
                                        <h5>{article.content.trim().substring(0, 150)}...</h5>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className={styles.moreArticle}>
                        <Button
                            text={"Voir plus"}
                            onClick={() => router.push("#")}
                        />
                    </div>
                </div>
                <div className={styles.conseils}>
                    <div className={styles.container}>
                        <div className={styles.atTheTop}>
                            <h2>Les conseils de nos galeristes</h2>
                            <div className={styles.imgContainer}>
                                <Image
                                    src={'https://picsum.photos/500/900?random=5'}
                                    alt={'Photo de l\'article à la une du conseil de nos galeristes'}
                                    width={500}
                                    height={900}
                                />
                            </div>
                            <h6>25 juillet 2024</h6>
                            <h4>L&apos;art de la montagne</h4>
                            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed
                                do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.</h5>
                        </div>
                        <div className={styles.conseilsGaleristes}>
                            {
                                fakeArticles.map((article, index) => {
                                    if (index > 2) return;
                                    return <Link
                                        href={"#"}
                                        className={styles.conseilsGaleristesItem}
                                        key={index}
                                    >
                                        <div className={styles.imgContainer}>
                                            <Image
                                                src={'https://picsum.photos/500/900?random=6'}
                                                alt={'Photo de l\'article à la une du conseil de nos galeristes'}
                                                width={500}
                                                height={900}
                                            />
                                        </div>
                                        <div>
                                            <h6>25 juillet 2024</h6>
                                            <h4>L&apos;art de la montagne</h4>
                                        </div>
                                    </Link>
                                })
                            }
                        </div>
                    </div>
                    <Button
                        text={"Voir plus"}
                        onClick={() => router.push("#")}
                    />
                </div>
            </div>
            <Picto/>
            <Footer/>
        </div>
    )

}