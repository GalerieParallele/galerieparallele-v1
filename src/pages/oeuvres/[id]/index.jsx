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
    FaRobot,
    FaRulerHorizontal,
    FaSignature,
    FaUser,
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
import {IoSend} from "react-icons/io5";
import LittleSpinner from "@/components/ui/LittleSpinner";
import {useOeuvres} from "@/hooks/useOeuvres";
import PageLoader from "@/components/ui/PageLoader";
import Error from "@/components/error/Error";
import ROUTES from "@/constants/ROUTES";
import {useAuth} from "@/hooks/useAuth";
import {Toast} from "@/constants/ToastConfig";

export default function OeuvreHomePage() {

    const MESSAGE_TYPE = {
        REQUEST: 'REQUEST',
        RESPONSE: 'RESPONSE'
    }

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [oeuvreId, setOeuvreId] = useState(null);

    const [message, setMessage] = useState([]);
    const [messageValue, setMessageValue] = useState('');
    const [convLoading, setConvLoading] = useState(false);

    const {oeuvre, loading: oeuvreLoading, error: oeuvreError, getOeuvreById} = useOeuvres();
    const {user, loading: userLoading} = useAuth();

    /**
     * Ajouter un nouveau message à la conversation
     * @param type
     * @param content
     */
    const handleAddNewMessage = (type, content) => {
        setMessage(prevMessages => [...prevMessages, [type, content]]);
    }

    /**
     * Envoyer un message à l'API
     * @param userMessage
     * @returns {Promise<void>}
     */
    const sendMessageToAPI = async (userMessage) => {

        if (userLoading) {
            Toast.fire({
                icon: 'warning',
                title: "Veuillez patienter..."
            });
            return;
        }

        if (!user) {
            Toast.fire({
                icon: 'warning',
                title: "Vous devez être connecté pour envoyer un message"
            });
            return;
        }

        setConvLoading(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message: userMessage, subject: oeuvre && oeuvre.name, oeuvre}),
            });

            if (!response.ok) {
                throw new Error('Erreur de réseau ou du serveur');
            }

            const data = await response.json();

            handleAddNewMessage(MESSAGE_TYPE.RESPONSE, data.message);
        } finally {
            setConvLoading(false);
        }
    };

    /**
     * Gérer l'envoi d'un message
     * @returns {Promise<void>}
     */
    const handleSendMessage = async () => {
        if (!messageValue.trim()) return; // Ne rien faire si le message est vide ou ne contient que des espaces

        handleAddNewMessage(MESSAGE_TYPE.REQUEST, messageValue);
        await sendMessageToAPI(messageValue);
        setMessageValue(''); // Réinitialiser le champ de texte après l'envoi
    };

    let sendHelloMessage = false;

    useEffect(() => {
        if (sendHelloMessage) return;
        handleAddNewMessage(MESSAGE_TYPE.RESPONSE, "Bonjour, je suis un assistant virtuel, je suis là pour répondre à vos questions. N'hésitez pas à me poser des questions sur cette oeuvre.");
        sendHelloMessage = true;
    }, []);

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

    useEffect(() => {
        if (oeuvreId) {
            const fetchOeuvreById = getOeuvreById(oeuvreId)
            if (!fetchOeuvreById) {
                setError(true);
            }
        }
    }, [oeuvreId]);

    if (loading || oeuvreLoading) {
        return <PageLoader/>;
    }

    if (error) {
        return <Error
            code={400}
            title={"Oops..."}
            message={"Une erreur est survenue, il semble que l'identifiant de l'oeuvre soit incorrect."}
        />;
    }

    if (oeuvreError) {
        switch (oeuvreError.code) {
            case 404:
                return <Error
                    code={404}
                    title={"Oeuvre introuvable"}
                    message={"L'oeuvre que vous recherchez n'existe pas ou a été supprimée."}
                />;
            default:
                return <Error
                    code={400}
                    title={"Oops..."}
                    message={"Une erreur est survenue lors de la requête de récupération de l'oeuvre."}
                />;
        }
    }

    return (
            <div className={styles.main}>
                <Navbar/>
                <div className={styles.content}>
                    <div className={styles.headSection}>
                        <div className={styles.carouselContainer}>
                            <Carousel
                                images={oeuvre && oeuvre.images ? oeuvre.images.map(image => image.url) : ['/assets/img/no-img.jpg']}/>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.info}>
                                <div className={styles.head}>
                                    <div className={styles.oeuvreName}>
                                        <h2>{oeuvre && oeuvre.name}</h2>
                                        <span>
                                    <FaRegHeart className={styles.emptyHeart}/>
                                    <FaHeart
                                        style={styles.fillHeart}/>
                                </span>
                                    </div>
                                    <span style={{
                                        display: 'flex',
                                        gap: 3,
                                    }}>
                                    {
                                        oeuvre && oeuvre.artists.map((artist, index) => {
                                            return (
                                                <Link href={ROUTES.ARTISTES.PROFIL(artist.id)} key={index}>
                                                    <h5 key={index}>
                                                        {artist.pseudo ? artist.pseudo : artist.user.lastname.toUpperCase() + " " + artist.user.firstname}
                                                        {index < oeuvre.artists.length - 1 ? ', ' : ''}
                                                    </h5>
                                                </Link>
                                            )
                                        })
                                    }
                                </span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}>
                                    <OeuvreTarif
                                        oeuvre={oeuvre}
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
                            {
                                oeuvre && oeuvre.tags.length > 0 && (
                                    <div className={styles.tagsSection}>
                                        {
                                            oeuvre.tags.map((tag, index) => {
                                                return (
                                                    <span key={index}>#{tag}</span>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles.featureAndIASection}>
                        <div className={styles.featuresSection}>
                            <OeuvreFeatureItem
                                Icon={FaRulerHorizontal}
                                title={"Dimensions (cm)"}
                                content={oeuvre && (
                                    oeuvre.hauteur + ' x ' + oeuvre.longueur + (oeuvre.profondeur ? ' x ' + oeuvre.profondeur : '')
                                )}
                                description={"Hauteur x Largeur" + (oeuvre && oeuvre.profondeur ? ' x Profondeur' : '')}
                            />
                            <OeuvreFeatureItem
                                Icon={TbFileOrientation}
                                title={"Orientation"}
                                content={oeuvre && oeuvre.orientation !== "NO_DEFINED" ? oeuvre.orientation : "Non renseignée"}
                            />
                            <OeuvreFeatureItem
                                Icon={FaChair}
                                title={"Support"}
                                content={oeuvre && oeuvre.support ? oeuvre.support : "Non renseigné"}
                            />
                            <OeuvreFeatureItem
                                Icon={FaPaintBrush}
                                title={"Technique"}
                                content={oeuvre && oeuvre.technique ? oeuvre.technique : "Non renseignée"}
                            />
                            <OeuvreFeatureItem
                                Icon={MdOutlineFilterFrames}
                                title={"Encadrement"}
                                content={oeuvre && oeuvre.encadrement ? oeuvre.encadrement : "Non renseigné"}
                            />
                            <span className={styles.separator}/>
                            <OeuvreFeatureItem
                                Icon={FaSignature}
                                title={"Signature"}
                                content={oeuvre && oeuvre.signature ? oeuvre.signature : "Non renseignée"}
                            />
                            <OeuvreFeatureItem
                                Icon={AiOutlineFieldNumber}
                                title={"Numérotation"}
                                content={oeuvre && oeuvre.numerotation ? (oeuvre.numerotation == 1 ? "Œuvre unique" : oeuvre.numerotation) : "Non renseignée"}
                            />
                            <OeuvreFeatureItem
                                Icon={AiOutlineFieldNumber}
                                title={"Limitation"}
                                content={oeuvre && oeuvre.limitation ? oeuvre.limitation == 1 ? "Œuvre unique" : oeuvre.limitation : "Non renseignée"}
                            />
                        </div>
                        <div className={styles.moreInfoContainer}>
                            {
                                !user && !userLoading && (
                                    <div className={styles.noAuthFilter}>
                                        <p>Vous devez être connecté pour accéder à cette fonctionnalité</p>
                                    </div>
                                )
                            }
                            <div className={styles.messages}>
                                {message.map((msg, index) => {
                                    if (msg[0] === MESSAGE_TYPE.REQUEST) {
                                        return (
                                            <div
                                                key={index}
                                                className={styles.requestContainer}>
                                                <p className={styles.authorMessage}>
                                                    <FaUser/>{user && user.firstname && user.lastname ? (user.firstname + " " + user.lastname) : "Vous"}
                                                </p>
                                                <div key={index} className={styles.requestMessage}>
                                                    <p>
                                                        {msg[1]}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div
                                                key={index}
                                                className={styles.responseContainer}>
                                                <p className={styles.authorMessage}><FaRobot/>Assistant Virtuel</p>
                                                <div key={index} className={styles.responseMessage}>
                                                    <p>
                                                        {msg[1]}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                                {
                                    convLoading && <div className={styles.responseMessage}>
                                        <p>
                                            <LittleSpinner/>
                                        </p>
                                    </div>
                                }
                            </div>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                await handleSendMessage();
                            }}>
                                <div className={styles.textspace}>
                                <textarea
                                    placeholder="Parles moi de cette oeuvre"
                                    value={messageValue}
                                    onChange={(e) => setMessageValue(e.target.value)}
                                    disabled={convLoading}
                                    onKeyPress={async (e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            await handleSendMessage();
                                        }
                                    }}
                                    rows={1}
                                />
                                    <button
                                        type="submit"
                                        disabled={convLoading}
                                    >
                                        {
                                            convLoading ? <LittleSpinner/> : <IoSend style={{fontSize: 20}}/>
                                        }
                                    </button>
                                </div>
                            </form>
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
                        {
                            oeuvre && oeuvre.artists.length && oeuvre.artists.map((artist, index) => {
                                return <div className={styles.artistContainer} key={index}>
                                    <div className={styles.left}>
                                        <div className={styles.imgContainer}>
                                            <Image
                                                src={artist && artist.user && artist.user.avatarURL ? artist.user.avatarURL : '/assets/img/avatar.png'}
                                                alt={"Photo de l'artiste"} width={500}
                                                height={500}/>
                                            <div className={styles.flag}>
                                                <Image src={"/assets/img/drapeau_france.png"} alt={"Drapeau de la France"}
                                                       width={50} height={50}/>
                                            </div>
                                        </div>
                                        <div>
                                            <h3>{artist.pseudo ? artist.pseudo : artist.user.lastname.toUpperCase() + " " + artist.user.firstname}</h3>
                                            <Link
                                                href={ROUTES.ARTISTES.PROFIL(artist.id)}
                                                className={styles.showMore}
                                            >
                                                <button>
                                                    Voir plus
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={styles.right}>
                                        {
                                            artist && !artist.bio && <p>Cet artiste ne possède pas de biographie</p>
                                        }
                                        {
                                            artist.bio && artist.bio.length > 200 ? artist.bio.substr(0, 200) + '...' : artist.bio
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className={styles.autreOeuvreArtiste}>
                        <h2>Découvrez d&apos;autres oeuvres du même artiste</h2>
                        <MultiCarousel/>
                    </div>
                    <div>
                        <Picto/>
                        <Footer/>
                    </div>
                </div>
            </div>
    )

}