import Button from "@/components/items/button/Button";
import {AiOutlineArrowLeft} from "react-icons/ai";
import ROUTES from "@/constants/ROUTES";
import Admin from "@/components/admin/Admin";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import SearchBar from "@/components/items/searchbar/SearchBar";
import {BsPersonAdd} from "react-icons/bs";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from './Index.module.scss';
import ArtisteCard from "@/components/admin/artistes/ArtisteCard";
import LittleSpinner from "@/components/items/LittleSpinner";

export default function ArtistesIndex() {

    const router = useRouter();

    const [artistes, setArtistes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const fetchArtistes = async () => {
        //     const res = await fetch(ROUTES.API.ARTISTES.GET);
        //     const artistes = await res.json();
        //     setArtistes(artistes.list);
            setLoading(false);
        // }
        // fetchArtistes();
    }, []);

    return (
        <Admin>
            <main className={adminStyles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft/>}
                        onClick={() => router.push(ROUTES.ADMIN.HOME)}
                    />
                </div>
                <div className={styles.main}>
                    <div className={styles.topContainer}>
                        <SearchBar
                            placeholder={"Rechercher un artiste"}
                        />
                        <button
                            onClick={() => router.push(ROUTES.ADMIN.ARTISTES.NEW)}
                            className={styles.addButton}>
                            <div className={styles.tooltip}>
                                Ajouter un artiste
                            </div>
                            <BsPersonAdd/>
                        </button>
                    </div>
                    <div className={styles.statCount}>
                        {loading ?
                            <LittleSpinner/> : artistes.length + ` artiste${artistes.length > 1 ? 's' : ''} trouvé${artistes.length > 1 ? 's' : ''}`}
                    </div>
                    <div className={styles.listContainer}>
                        {loading ? (
                            <div>
                                <LittleSpinner/>
                            </div>
                        ) : (
                            <div>
                                {artistes && artistes.map((artiste, index) => (
                                    <ArtisteCard
                                        key={index}
                                        artiste={artiste}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </Admin>
    )
}
