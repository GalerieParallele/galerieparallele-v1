import Navbar from "@/components/ui/navbar/Navbar";

import styles from './Index.module.scss';
import SliderRange from "@/components/ui/SliderRange";
import {useState} from "react";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";
import {useOeuvres} from "@/hooks/useOeuvres";
import Link from "next/link";
import ROUTES from "@/constants/ROUTES";
import Image from "next/image";
import OeuvreBreakCard from "@/components/oeuvres/OeuvreBreakCard";
import {RiVipCrownLine} from "react-icons/ri";

export default function OeuvresIndex() {

    const {oeuvres} = useOeuvres();

    const [rangeValue, setRangeValue] = useState([0, 50000]);


    const handleRangeChange = (newValue) => {
        setRangeValue(newValue);
    };

    const oeuvresBreakCards = [
        {
            Icon: RiVipCrownLine,
            title: "Arts Member Only",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, nisl nec vehicula.",
            buttonText: "Devenir membre",
            buttonAction: () => {
                alert("debug")
            }
        },
        {
            Icon: RiVipCrownLine,
            title: "Arts Member Only",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, nisl nec vehicula.",
            buttonText: "Devenir membre",
            buttonLink: "#"
        },
        {
            Icon: RiVipCrownLine,
            title: "Arts Member Only",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, nisl nec vehicula.",
            buttonText: "Devenir membre",
            buttonAction: () => {
                alert("debug")
            }
        },
    ]


    return (
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.content}>
                <div className={styles.allOfFameContainer}>
                    {
                        oeuvres.map((oeuvre, index) => {
                            return (
                                <Link
                                    href={ROUTES.OEUVRES.VIEW(oeuvre.id)}
                                    className={styles.allOfFameItem}
                                    key={index}>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={oeuvre.images[0].mediaURL}
                                            alt={'test'}
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className={styles.list}>
                    <div className={styles.left}>
                        <div className={styles.filtresContainer}>
                            <h4 className={styles.filtresTitle}>
                                Types
                            </h4>
                            <div className={styles.filtresList}>
                                <div className={styles.filtreRow}>
                                    <input type="checkbox" name={"peinture"}/>
                                    <label htmlFor="peinture">Peinture</label>
                                </div>
                                <div className={styles.filtreRow}>
                                    <input type="checkbox" name={"sculpture"}/>
                                    <label htmlFor="sculpture">Sculpture</label>
                                </div>
                                <div className={styles.filtreRow}>
                                    <input type="checkbox" name={"photographie"}/>
                                    <label htmlFor="photographie">Photographie</label>
                                </div>
                                <div className={styles.filtreRow}>
                                    <input type="checkbox" name={"peinture"}/>
                                    <label htmlFor="peinture">Peinture</label>
                                </div>
                                <div className={styles.filtreRow}>
                                    <input type="checkbox" name={"sculpture"}/>
                                    <label htmlFor="sculpture">Sculpture</label>
                                </div>
                                <div className={styles.filtreRow}>
                                    <input type="checkbox" name={"photographie"}/>
                                    <label htmlFor="photographie">Photographie</label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.filtresContainer}>
                            <h4 className={styles.filtresTitle}>
                                Prix
                            </h4>
                            <form className={styles.filtresList}>
                                <div className={styles.filtreRow}>
                                    <input type="radio" name={"peinture"} onClick={
                                        () => setRangeValue([0, 100])
                                    }/>
                                    <label htmlFor="radio">Entre 0€ et 100€</label>
                                </div>
                                <div className={styles.filtreRow}>
                                    <input type="radio" name={"peinture"} onClick={
                                        () => setRangeValue([100, 500])
                                    }/>
                                    <label htmlFor="sculpture">Entre 100€ et 500€</label>
                                </div>
                                <div className={styles.filtreRow}>
                                    <input type="radio" name={"peinture"} onClick={
                                        () => setRangeValue([500, 50000])
                                    }/>
                                    <label htmlFor="photographie">Plus de 500€</label>
                                </div>
                                <SliderRange
                                    initialMin={0}
                                    initialMax={50000}
                                    initialValue={[100, 50000]}
                                    onChange={handleRangeChange}
                                    currentValue={rangeValue}
                                />
                            </form>
                        </div>

                        <div className={styles.tagsContainer}>
                            <h4 className={styles.tagsTitle}>
                                Tags
                            </h4>
                            <div className={styles.tagsList}>
                                <span className={styles.tagItem}>#Tag 1</span>
                                <span className={styles.tagItem}>#Tag 2</span>
                                <span className={styles.tagItem}>#Tag 3</span>
                                <span className={styles.tagItem}>#Tag 4</span>
                                <span className={styles.tagItem}>#Tag 5</span>
                                <span className={styles.tagItem}>#Tag 6</span>
                                <span className={styles.tagItem}>#Tag 7</span>
                                <span className={styles.tagItem}>#Tag 8</span>
                                <span className={styles.tagItem}>#Tag 9</span>
                                <span className={styles.tagItem}>#Tag 10</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        {
                            oeuvres && oeuvres.map((oeuvre, index) => {
                                if (oeuvre.prix < rangeValue[0] || oeuvre.prix > rangeValue[1]) {
                                    return null;
                                }
                                return (
                                    <div
                                        className={styles.oeuvreItem}
                                        key={index}>
                                        <div className={styles.imgContainer}>
                                            <Image
                                                src={oeuvre.images[0].mediaURL}
                                                alt={oeuvre.name}
                                                layout={"fill"}
                                                objectFit={"contain"}
                                            />
                                        </div>
                                        <div className={styles.oeuvreInfos}>
                                            {
                                                oeuvre && oeuvre.name && (
                                                    <h4 className={styles.title}>
                                                        {oeuvre.name}
                                                    </h4>
                                                )
                                            }
                                            {
                                                oeuvre.artists.length > 0 && (
                                                    <div className={styles.artists}>
                                                        {
                                                            oeuvre.artists.map((artist, index) => {
                                                                return (
                                                                    index === oeuvre.artists.length - 1 ? (
                                                                        <Link href={ROUTES.ARTISTES.PROFIL(artist.id)}
                                                                              key={index}>
                                                                            {artist.pseudo ? artist.pseudo : artist.user.lastname.toUpperCase() + " " + artist.user.firstname}
                                                                        </Link>
                                                                    ) : (
                                                                        <Link href={ROUTES.ARTISTES.PROFIL(artist.id)}
                                                                              key={index}>
                                                                            {artist.pseudo}, {" "}
                                                                        </Link>
                                                                    )
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }
                                            {
                                                oeuvre.types.length > 0 && (
                                                    <p className={styles.types}>
                                                        {
                                                            oeuvre.types.map((type, index) => {
                                                                return (
                                                                    index === oeuvre.types.length - 1 ? (
                                                                        type
                                                                    ) : (
                                                                        type + " - "
                                                                    )
                                                                )
                                                            })
                                                        }
                                                    </p>
                                                )
                                            }
                                            {
                                                oeuvre && oeuvre.prix && (
                                                    <p className={styles.prix}>
                                                        {oeuvre.prix} €
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>
                                )

                            })
                        }
                        <div style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <OeuvreBreakCard
                                Icon={RiVipCrownLine}
                                title={"Arts Member Only"}
                                content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, nisl nec vehicula."}
                                buttonText={"Devenir membre"}
                                buttonAction={() => {
                                    alert("debug")
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
            <Picto/>
            <Footer/>
        </div>
    )

}