import Navbar from "@/components/ui/navbar/Navbar";

import styles from './Index.module.scss';
import SliderRange from "@/components/ui/SliderRange";
import ArtistListCard from "@/components/artist/list/ArtistListCard";
import {useState} from "react";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";

export default function OeuvresIndex() {

    const fakeOeuvres = [
        {
            id: 9,
            name: "Oeuvre 9",
            images: [
                "https://picsum.photos/200",
            ]
        },
        {
            id: 10,
            name: "Oeuvre 10",
            images: [
                "https://picsum.photos/200",
            ]
        },
        {
            id: 11,
            name: "Oeuvre 11",
            images: [
                "https://picsum.photos/200",
            ]
        }
    ];

    const [rangeValue, setRangeValue] = useState([0, 100]);


    const handleRangeChange = (newValue) => {
        setRangeValue(newValue);
    };


    return (
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.content}>
                <div className={styles.allOfFameContainer}>
                    {
                        fakeOeuvres.map((oeuvre, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                        <img
                                            src={oeuvre.images[0]}
                                            alt={'test'}
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                </div>
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
                        <p>Ici les artistes</p>
                        {/*<div className={styles.loadMore}>*/}
                        {/*    <button>*/}
                        {/*        <FaPlus/>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
            <Picto/>
            <Footer/>
        </div>
    )

}