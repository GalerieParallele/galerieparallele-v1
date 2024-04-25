import {useEffect, useState} from "react";

import useFiltersStore from "@/stores/oeuvresFiltersStore";
import {useOeuvres} from "@/hooks/useOeuvres";

import Link from "next/link";
import Image from "next/image";

import ROUTES from "@/constants/ROUTES";

import Navbar from "@/components/ui/navbar/Navbar";
import OeuvreBreakCard from "@/components/oeuvres/OeuvreBreakCard";
import Skeleton from "@/components/ui/Skeleton";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";

import FiltresOrientations from "@/components/oeuvres/filtres/FiltresOrientations";
import {IoMdClose} from "react-icons/io";
import FiltresTypes from "@/components/oeuvres/filtres/FiltresTypes";
import FiltresPrix from "@/components/oeuvres/filtres/FiltresPrix";
import FiltresCouleurs from "@/components/oeuvres/filtres/FiltresCouleurs";
import FiltresTags from "@/components/oeuvres/filtres/FiltresTags";
import FiltresDimensions from "@/components/oeuvres/filtres/FiltresDimensions";

import {RiVipCrownLine} from "react-icons/ri";

import styles from './Index.module.scss';

export default function OeuvresIndex() {

    const {oeuvres, loading: oeuvreLoading} = useOeuvres();
    const {filters, setFilter, getFilteredOeuvres, setOeuvres, removeAllFilters, initialState} = useFiltersStore();

    const [hoverAllOfFame, setHoverAllOfFame] = useState(false);
    const [hoverType, setHoverType] = useState(false);

    /**
     * Liste des types d'œuvres disponibles sans doublons
     * @type {FlatArray<any[], 1>[]|*[]}
     */
    const types = oeuvres && oeuvres.length > 0 ? oeuvres.map(oeuvre => oeuvre.types).flat().filter((value, index, self) => self.indexOf(value) === index) : [];
    /**
     * Liste des tags d'œuvres disponibles sans doublons
     * @type {T[]|*[]}
     */
    const tags = oeuvres && oeuvres.length > 0 ? oeuvres.map(oeuvre => oeuvre.tags).flat().filter((value, index, self) => self.indexOf(value) === index) : [];
    /**
     * Listes des couleurs d'œuvres disponibles sans doublons
     * @param newValue
     */
    let colors = oeuvres && oeuvres.length > 0 ? Array.from(new Set(oeuvres.map(oeuvre => oeuvre.couleurs).flat().filter((value, index, self) => self.indexOf(value) === index))) : [];

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

    useEffect(() => {
        setOeuvres(oeuvres);
    }, [oeuvres])

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
                                                    src={oeuvres.find(oeuvre => oeuvre.types.includes(type) && oeuvre.images.length > 0) && oeuvres.find(oeuvre => oeuvre.types.includes(type) && oeuvre.images.length > 0).images[0].mediaURL || "/assets/img/no-img.jpg"}
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
                                        <>
                                            <Link
                                                href={ROUTES.OEUVRES.VIEW(oeuvre.id)}
                                                className={styles.allOfFameItem}
                                                key={index}>
                                                <div className={styles.imgContainer}>
                                                    <Image
                                                        src={oeuvre && oeuvre.images.length > 0 ? oeuvre.images[0].mediaURL : "/assets/img/no-img.jpg"}
                                                        alt={'test'}
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                            </Link>
                                        </>
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

                {
                    filters && JSON.stringify(filters) !== JSON.stringify(initialState) && (
                        <div className={styles.filtresHeadList}>
                            <p>Filtres actifs :</p>
                            {
                                filters && (
                                    <>
                                        {
                                            filters.orientation && filters.orientation.length > 0 && (
                                                filters.orientation.map((orientation, index) => {
                                                    return (
                                                        <span
                                                            key={"orientation." + index}>
                                        <p>
                                            {orientation.charAt(0) + orientation.slice(1).toLowerCase()}
                                        </p>
                                        <button onClick={() => {
                                            setFilter('orientation', filters.orientation.filter(o => o !== orientation));
                                        }}>
                                            <IoMdClose/>
                                        </button>
                                    </span>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            filters.types && filters.types.length > 0 && (
                                                filters.types.map((type, index) => {
                                                    return (
                                                        <span
                                                            key={index}>
                                        <p>
                                            {type.charAt(0) + type.slice(1).toLowerCase()}
                                        </p>
                                        <button onClick={() => {
                                            setFilter('types', filters.types.filter(o => o !== type));
                                        }}>
                                            <IoMdClose/>
                                        </button>
                                    </span>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            filters.priceRange && filters.priceRange.length > 0 && (
                                                filters.priceRange[0] === initialState.priceRange[0] && filters.priceRange[1] === initialState.priceRange[1] ? null : (
                                                    <span>
                                                <p>
                                                    {filters.priceRange[0]}€ - {filters.priceRange[1]}€
                                                </p>
                                                <button onClick={() => {
                                                    setFilter('priceRange', [initialState.priceRange[0], initialState.priceRange[1]]);
                                                }}>
                                                    <IoMdClose/>
                                                </button>
                                            </span>
                                                )
                                            )
                                        }
                                        {
                                            filters.colors && filters.colors.length > 0 && (
                                                filters.colors.map((color, index) => {
                                                    return (
                                                        <span
                                                            key={index}>
                                                            <p>
                                                                {colors.find(c => c.hexa === color).name}
                                                            </p>
                                                            <button
                                                                onClick={() => {
                                                                    setFilter('colors', filters.colors.filter(o => o !== color));
                                                                }
                                                                }>
                                                                <IoMdClose/>
                                                            </button>
                                                        </span>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            filters.tags && filters.tags.length > 0 && (
                                                filters.tags.map((tag, index) => {
                                                    return (
                                                        <span
                                                            key={index}>
                                                                <p>
                                                                    {tag}
                                                                </p>
                                                                <button onClick={() => {
                                                                    setFilter('tags', filters.tags.filter(o => o !== tag));
                                                                }}>
                                                                    <IoMdClose/>
                                                                </button>
                                                            </span>
                                                    )
                                                })
                                            )

                                        }
                                        {
                                            filters.heightRange && filters.heightRange.length > 0 && (
                                                filters.heightRange[0] === initialState.heightRange[0] && filters.heightRange[1] === initialState.heightRange[1] ? null : (
                                                    <span>
                                                <p>
                                                    Hauteur : {filters.heightRange[0]}cm - {filters.heightRange[1]}cm
                                                </p>
                                                <button onClick={() => {
                                                    setFilter('heightRange', [initialState.heightRange[0], initialState.heightRange[1]]);
                                                }}>
                                                    <IoMdClose/>
                                                </button>
                                            </span>

                                                )
                                            )
                                        }
                                        {
                                            filters.widthRange && filters.widthRange.length > 0 && (
                                                filters.widthRange[0] === initialState.widthRange[0] && filters.widthRange[1] === initialState.widthRange[1] ? null : (
                                                    <span>
                                                <p>
                                                    Longueur : {filters.widthRange[0]}cm - {filters.widthRange[1]}cm
                                                </p>
                                                <button onClick={() => {
                                                    setFilter('widthRange', [initialState.widthRange[0], initialState.widthRange[1]]);
                                                }}>
                                                    <IoMdClose/>
                                                </button>
                                            </span>

                                                )
                                            )
                                        }
                                        {
                                            filters.depthRange && filters.depthRange.length > 0 && (
                                                filters.depthRange[0] === initialState.depthRange[0] && filters.depthRange[1] === initialState.depthRange[1] ? null : (
                                                    <span>
                                                <p>
                                                    Profondeur : {filters.depthRange[0]}cm - {filters.depthRange[1]}cm
                                                </p>
                                                <button onClick={() => {
                                                    setFilter('depthRange', [initialState.depthRange[0], initialState.depthRange[1]]);
                                                }}>
                                                    <IoMdClose/>
                                                </button>
                                            </span>

                                                )
                                            )
                                        }
                                    </>
                                )
                            }
                            <button
                                style={{
                                    padding: "8px 10px",
                                    backgroundColor: "red",
                                    color: "white",
                                    borderRadius: "20px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                                onClick={() => {
                                    removeAllFilters();
                                }}>
                                Réinitialiser
                            </button>
                        </div>
                    )
                }


                <div className={styles.list}>
                    <div className={styles.left}>
                        <FiltresTypes
                            types={types}
                            loading={oeuvreLoading}
                        />
                        <FiltresPrix
                            min={0}
                            max={100000}
                        />


                        <FiltresDimensions/>

                        <FiltresOrientations/>
                        <FiltresCouleurs
                            loading={oeuvreLoading}
                            colors={colors}
                        />
                        <FiltresTags
                            loading={oeuvreLoading}
                            tags={tags}
                        />
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
                                getFilteredOeuvres && Array.from(getFilteredOeuvres()).map((oeuvre, index) => {
                                    return (
                                        <>
                                            <div
                                                className={styles.oeuvreItem}
                                                key={index}>
                                                <Link
                                                    href={ROUTES.OEUVRES.VIEW(oeuvre.id)}
                                                    className={styles.imgContainer}>
                                                    <Image
                                                        src={oeuvre && oeuvre.images.length > 0 ? oeuvre.images[0].mediaURL : "/assets/img/no-img.jpg"}
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