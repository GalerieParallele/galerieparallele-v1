import {useRouter} from "next/router";

import styles from './Index.module.scss';
import Navbar from "@/components/ui/navbar/Navbar";
import {useArtists} from "@/hooks/useArtists";
import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import SliderRange from "@/components/ui/SliderRange";
import ArtistListCard from "@/components/artist/list/ArtistListCard";

export default function ArtistesHomeIndex() {

    const router = useRouter();

    const {loading, artists, reloadArtists} = useArtists();

    const [rangeValue, setRangeValue] = useState([0, 100]);
    const [countries, setCountries] = useState([]);


    const handleRangeChange = (newValue) => {
        setRangeValue(newValue);
    };

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
            })
            .catch((error) => console.error("Erreur lors du chargement des pays", error));
    }, []);

    return (<div className={styles.main}>
        <Navbar/>
        <div className={styles.content}>
            <div className={styles.bigHead}>
                <h2>Nos artistes</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu
                    fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore
                    et
                    dolore magna aliqua.</p>
            </div>
            <div className={styles.atTheTop}>
                <h3>Artistes à la une</h3>
                <div className={styles.atTheTopContainer}>
                    <div className={styles.left}>
                        <div className={styles.imgContainer}>
                            <Image
                                src={'/assets/img/oeuvres/oeuvre2.jpg'}
                                alt={"Photo oeuvre à la une numéro 2"}
                                width={500}
                                height={500}
                            />
                            <div className={styles.artistLink}>
                                <Link href={"#"}>
                                    Nom de l&apos;artiste
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.imgContainer}>
                            <Image
                                src={'/assets/img/oeuvres/oeuvre1.jpg'}
                                alt={"Photo oeuvre à la une numéro 1"}
                                width={500}
                                height={500}
                            />
                            <div className={styles.artistLink}>
                                <Link href={"#"}>
                                    Nom de l&apos;artiste
                                </Link>
                            </div>
                        </div>

                        <div className={styles.imgContainer}>
                            <Image
                                src={'/assets/img/oeuvres/oeuvre3.jpg'}
                                alt={"Photo oeuvre à la une numéro 3"}
                                width={500}
                                height={500}
                            />
                            <div className={styles.artistLink}>
                                <Link href={"#"}>
                                    Nom de l&apos;artiste
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.allOfFameContainer}>
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
                        <div className={styles.filtresList}>
                            <div className={styles.filtreRow}>
                                <input type="checkbox" name={"peinture"} onClick={
                                    () => setRangeValue([0, 100])
                                }/>
                                <label htmlFor="peinture">Entre 0€ et 100€</label>
                            </div>
                            <div className={styles.filtreRow}>
                                <input type="checkbox" name={"sculpture"} onClick={
                                    () => setRangeValue([100, 500])
                                }/>
                                <label htmlFor="sculpture">Entre 100€ et 500€</label>
                            </div>
                            <div className={styles.filtreRow}>
                                <input type="checkbox" name={"photographie"} onClick={
                                    () => setRangeValue([500, 1000])
                                }/>
                                <label htmlFor="photographie">Plus de 500€</label>
                            </div>
                            <SliderRange
                                initialMin={0}
                                initialMax={50000}
                                initialValue={[100, 50000]}
                                onChange={handleRangeChange}
                            />
                        </div>
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
                        artists.map((artist, index) => {
                            return <ArtistListCard key={index} artist={artist} countries={countries}/>
                        })
                    }
                    {/*<div className={styles.loadMore}>*/}
                    {/*    <button>*/}
                    {/*        <FaPlus/>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    </div>)
}