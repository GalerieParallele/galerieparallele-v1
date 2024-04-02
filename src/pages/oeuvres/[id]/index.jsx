import styles from './Index.module.scss';
import Navbar from "@/components/ui/navbar/Navbar";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Carousel from "@/components/ui/carousel/Carousel";
import {
    FaChair,
    FaFacebook,
    FaHeart,
    FaInstagram,
    FaPaintBrush,
    FaRegHeart,
    FaRulerHorizontal,
    FaSignature,
    FaWhatsapp
} from "react-icons/fa";
import Link from "next/link";
import OeuvreTarif from "@/components/oeuvres/oeuvre-item/OeuvreTarif";
import Image from "next/image";
import OeuvreFeatureItem from "@/components/oeuvres/oeuvre-item/OeuvreFeatureItem";
import {MdOutlineFilterFrames} from "react-icons/md";
import {TbFileOrientation} from "react-icons/tb";
import {AiOutlineFieldNumber} from "react-icons/ai";
import MultiCarousel from "@/components/ui/carousel/MultiCarousel";

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
                <div className={styles.headSection}>
                    <div className={styles.carouselContainer}>
                        <Carousel images={[
                            '/assets/img/no-img.jpg',
                            '/assets/img/harcourt2.jpg',
                            '/assets/img/harcourt1.jpg'
                        ]}/>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.info}>
                            <div className={styles.head}>
                                <div className={styles.oeuvreName}>
                                    <h2>La joconde</h2>
                                    <span>
                                    <FaRegHeart className={styles.emptyHeart}/>
                                    <FaHeart
                                        style={styles.fillHeart}/>
                                </span>
                                </div>
                                <Link href={"#"}>
                                    <h5>Leonard de Vinci</h5>
                                </Link>
                            </div>
                            <div style={{
                                width: "100%",
                            }}>
                                <OeuvreTarif
                                    prix={100}
                                />
                            </div>
                            <div className={styles.shareContainer}>
                                <p>Partagez-moi :</p>
                                <div>
                                    <Link href={"#"} target={"_blank"}
                                          className={styles.socialButton}><FaFacebook/></Link>
                                    <Link href={"#"} target={"_blank"}
                                          className={styles.socialButton}><FaInstagram/></Link>
                                    <Link href={"#"} target={"_blank"}
                                          className={styles.socialButton}><FaWhatsapp/></Link>
                                </div>
                            </div>
                        </div>
                        <div className={styles.tagsSection}>
                            <span>#Leonard de Vinci</span>
                            <span>#Peinture</span>
                            <span>#Portrait</span>
                            <span>#Art</span>
                            <span>#Leonard de Vinci</span>
                            <span>#Portrait</span>
                            <span>#Art</span>
                            <span>#Leonard de Vinci</span>
                            <span>#Portrait</span>
                            <span>#Art</span>
                            <span>#Leonard de Vinci</span>
                            <span>#Portrait</span>
                            <span>#Art</span>
                            <span>#Leonard de Vinci</span>
                        </div>
                    </div>
                </div>
                <div className={styles.featureAndIASection}>
                    <div className={styles.featuresSection}>
                        <OeuvreFeatureItem
                            Icon={FaRulerHorizontal}
                            title={"Dimensions (cm)"}
                            content={"153 x 77 x 5"}
                            description={"Hauteur x Largeur x Profondeur"}
                        />
                        <OeuvreFeatureItem
                            Icon={TbFileOrientation}
                            title={"Orientation"}
                            content={"Portrait"}
                        />
                        <OeuvreFeatureItem
                            Icon={FaChair}
                            title={"Support"}
                            content={"Toile"}
                        />
                        <OeuvreFeatureItem
                            Icon={FaPaintBrush}
                            title={"Technique"}
                            content={"Peinture à l'huile"}
                        />
                        <OeuvreFeatureItem
                            Icon={MdOutlineFilterFrames}
                            title={"Encadrement"}
                            content={"Cadre en bois"}
                        />
                        <span className={styles.separator}/>
                        <OeuvreFeatureItem
                            Icon={FaSignature}
                            title={"Signature"}
                            content={"En bas à droite"}
                        />
                        <OeuvreFeatureItem
                            Icon={AiOutlineFieldNumber}
                            title={"Numérotation"}
                            content={"Oeuvre unique"}
                        />
                        <OeuvreFeatureItem
                            Icon={AiOutlineFieldNumber}
                            title={"Limitation"}
                            content={"Oeuvre unique"}
                        />
                    </div>
                    <div className={styles.moreInfoContainer}>
                        <div className={styles.messages}>
                            <div className={styles.responseMessage}>
                                <span>Test</span>
                                <p>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor
                                </p>
                            </div>
                            <div className={styles.requestMessage}>
                                <p>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                    eirmod
                                    tempor.
                                </p>
                            </div>
                            <div className={styles.responseMessage}>
                                <p>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr
                                </p>
                            </div>
                            <div className={styles.requestMessage}>
                                <p>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                </p>
                            </div>
                            <div className={styles.responseMessage}>
                                <p>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                                </p>
                            </div>
                        </div>
                        <textarea placeholder={"Posez votre question ici..."}/>
                    </div>
                </div>
                <div className={styles.mockupSection}>
                    <div className={styles.head}>
                        <h2>Encore plus belle chez vous...</h2>
                    </div>
                    <div className={styles.mockups}>
                        <div className={styles.imgContainer}>
                        <Image
                                src={'/assets/img/mockups/mockup1.avif'}
                                alt={'Mockup 1'}
                                width={1000}
                                height={1000}
                            />
                        </div>
                        <div className={styles.imgContainer}>
                            <Image
                                src={'/assets/img/mockups/mockup2.jpg'}
                                alt={'Mockup 1'}
                                width={1000}
                                height={1000}
                            />
                        </div>
                        <div className={styles.imgContainer}>
                            <Image
                                src={'/assets/img/mockups/mockup3.avif'}
                                alt={'Mockup 1'}
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.oeuvreMemeStyleSection}>
                    <h2>Découvrez d&apos;autres oeuvres dans le même style</h2>
                    <MultiCarousel/>
                </div>
                <div className={styles.artistSection}>
                    <div className={styles.artistContainer}>
                        <div className={styles.left}>
                            <div className={styles.imgContainer}>
                                <Image src={'/assets/img/avatar.png'} alt={"Photo de l'artiste"} width={500}
                                       height={500}/>
                                <div className={styles.flag}>
                                    <Image src={"/assets/img/drapeau_france.png"} alt={"Drapeau de la France"}
                                           width={50} height={50}/>
                                </div>
                            </div>
                            <div>
                                <h3>Leonard de Vinci</h3>
                            </div>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                accusam
                                et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                                Lorem ipsum dolor sit amet...</p>
                            <div className={styles.showMore}>
                                <button>
                                    Voir plus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.autreOeuvreArtiste}>
                    <h2>Découvrez d&apos;autres oeuvres du même artiste</h2>
                    <MultiCarousel/>
                </div>
            </div>
            <Picto/>
            <Footer/>
        </div>
    )

}