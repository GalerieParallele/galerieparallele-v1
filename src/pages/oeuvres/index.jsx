import Navbar from "@/components/ui/navbar/Navbar";

import styles from './Index.module.scss';
import SliderRange from "@/components/ui/SliderRange";
import {useEffect, useState} from "react";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";
import {useOeuvres} from "@/hooks/useOeuvres";
import Link from "next/link";
import ROUTES from "@/constants/ROUTES";
import Image from "next/image";
import OeuvreBreakCard from "@/components/oeuvres/OeuvreBreakCard";
import {RiVipCrownLine} from "react-icons/ri";
import Skeleton from "@/components/ui/Skeleton";

export default function OeuvresIndex() {

    const {oeuvres, loading: oeuvreLoading} = useOeuvres();

    const [rangeValue, setRangeValue] = useState([0, 50000]);
    const [hoverAllOfFame, setHoverAllOfFame] = useState(false);
    const [hoverType, setHoverType] = useState(false);

    /**
     * Liste des types d'œuvres disponibles sans doublons
     * @type {FlatArray<any[], 1>[]|*[]}
     */
    const types = oeuvres && oeuvres.length > 0 ? oeuvres.map(oeuvre => oeuvre.types).flat().filter((value, index, self) => self.indexOf(value) === index) : [];

    const tags = oeuvres && oeuvres.length > 0 ? oeuvres.map(oeuvre => oeuvre.tags).flat().filter((value, index, self) => self.indexOf(value) === index) : [];


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

    useEffect(() => {
        const allOfFameContainer = document.querySelector('#allOfFameContainer');
        if (allOfFameContainer) {
            const scrollInterval = setInterval(() => {
                if (hoverAllOfFame)
                    return;
                if (allOfFameContainer.scrollLeft < allOfFameContainer.scrollWidth - allOfFameContainer.clientWidth) {
                    allOfFameContainer.scrollLeft += 1; // Ajustez ce chiffre pour contrôler la vitesse
                } else {
                    // retour au début de manière fluide
                    allOfFameContainer.scrollLeft = 0;
                }
            }, 50); // Ajustez le timing pour contrôler la vitesse de défilement

            return () => clearInterval(scrollInterval); // Nettoyez l'intervalle quand le composant est démonté
        }
    }, [hoverAllOfFame]);

    useEffect(() => {
        const typeContainer = document.querySelector('#typeContainer');
        if (typeContainer) {
            const scrollInterval = setInterval(() => {
                if (hoverType)
                    return;
                if (typeContainer.scrollLeft < typeContainer.scrollWidth - typeContainer.clientWidth) {
                    typeContainer.scrollLeft += 1;
                } else {
                    typeContainer.scrollLeft = 0;
                }
            }, 20);

            return () => clearInterval(scrollInterval);
        }
    }, [hoverType]);

    return (
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.content}>
                <div
                    onMouseEnter={() => setHoverType(true)}
                    onMouseLeave={() => setHoverType(false)}
                    className={styles.type}
                    id={"typeContainer"}
                >
                    {
                        oeuvreLoading ? (
                            Array.from({length: 3}, (_, index) => {
                                return (
                                    <div
                                        className={styles.skeleton}
                                        key={index}>
                                        <Skeleton/>
                                    </div>
                                )
                            })
                        ) : (
                            types && types.length > 0 ? (
                                types && types.map((type, index) => {
                                    return (
                                        <Link
                                            href={"#"}
                                            className={styles.typeItem}
                                            key={index}>
                                            <div className={styles.imgContainer}>
                                                <Image
                                                    src={oeuvres.find(oeuvre => oeuvre.types.includes(type)).images[0].mediaURL}
                                                    alt={type}
                                                    width={500}
                                                    height={500}
                                                />
                                            </div>
                                            <div className={styles.name}>
                                                {type}
                                            </div>
                                            <div className={styles.filter}/>
                                        </Link>
                                    )
                                })
                            ) : null
                        )
                    }
                </div>
                <div
                    onMouseEnter={() => setHoverAllOfFame(true)}
                    onMouseLeave={() => setHoverAllOfFame(false)}
                    className={styles.allOfFameContainer}
                    id={"allOfFameContainer"}>
                    <div id={"startAllOfFameContainer"}/>
                    {
                        oeuvreLoading ? (
                            Array.from({length: 10}, (_, index) => {
                                return (
                                    <div
                                        className={styles.allOfFameItem}
                                        key={index}>
                                        <div className={styles.skeleton}>
                                            <Skeleton/>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            oeuvres && oeuvres.length > 0 ? (
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
                            ) : (
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "3rem",

                                }}>
                                    <p style={{
                                        color: "white",
                                        fontSize: "1.5rem",
                                        textAlign: "center",

                                    }}>
                                        Aucune oeuvre trouvée
                                    </p>
                                </div>
                            )
                        )
                    }
                </div>
                <div className={styles.list}>
                    <div className={styles.left}>
                        <div className={styles.filtresContainer}>
                            <h4 className={styles.filtresTitle}>
                                Types
                            </h4>
                            <div className={styles.filtresList}>
                                {
                                    oeuvreLoading ? (
                                        Array.from({length: 5}, (_, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: "flex",
                                                        gap: 5,
                                                    }}
                                                >
                                                    <div style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        overflow: "hidden",
                                                    }}>
                                                        <Skeleton/>
                                                    </div>
                                                    <div style={{
                                                        width: "100%",
                                                        height: "20px",
                                                        overflow: "hidden",
                                                    }}>
                                                        <Skeleton/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        types && types.map((type, index) => {
                                            return (
                                                <div className={styles.filtreRow}
                                                     key={index}>
                                                    <input type="checkbox" name={type}/>
                                                    <label htmlFor={type}>{type}</label>
                                                </div>
                                            )
                                        })
                                    )
                                }
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
                                {
                                    oeuvreLoading ? (
                                        Array.from({length: 5}, (_, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: "flex",
                                                        gap: 5,
                                                    }}
                                                >
                                                    <div style={{
                                                        width: "70px",
                                                        height: "25px",
                                                        overflow: "hidden",
                                                        borderRadius: "20px",
                                                    }}>
                                                        <Skeleton/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        tags && tags.map((tag, index) => {
                                            return (
                                                <span className={styles.tagItem} key={index}>
                                                    {tag}
                                                </span>
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        {
                            oeuvreLoading ? (
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "1rem",
                                    flexWrap: "wrap",
                                }}>
                                    {
                                        Array.from({length: 10}, (_, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        width: "300px",
                                                        height: "300px",
                                                        display: "flex",
                                                        margin: "1rem 0",
                                                    }}
                                                >
                                                    <Skeleton/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                oeuvres && oeuvres.map((oeuvre, index) => {
                                    if (oeuvre.prix < rangeValue[0] || oeuvre.prix > rangeValue[1]) {
                                        return null;
                                    }
                                    return (
                                        <>
                                            <div
                                                className={styles.oeuvreItem}
                                                key={index}>
                                                <Link
                                                    href={ROUTES.OEUVRES.VIEW(oeuvre.id)}
                                                    className={styles.imgContainer}>
                                                    <Image
                                                        src={oeuvre.images[0].mediaURL}
                                                        alt={oeuvre.name}
                                                        layout={"fill"}
                                                        objectFit={"contain"}
                                                    />
                                                </Link>
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
                                                                                <Link
                                                                                    href={ROUTES.ARTISTES.PROFIL(artist.id)}
                                                                                    key={index}>
                                                                                    {artist.pseudo ? artist.pseudo : artist.user.lastname.toUpperCase() + " " + artist.user.firstname}
                                                                                </Link>
                                                                            ) : (
                                                                                <Link
                                                                                    href={ROUTES.ARTISTES.PROFIL(artist.id)}
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
                                            {
                                                index === oeuvres.length - 2 ? (
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
                                                ) : null
                                            }
                                        </>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
            <Picto/>
            <Footer/>
        </div>
    )

}