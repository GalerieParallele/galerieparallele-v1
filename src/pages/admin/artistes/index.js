import Button from "@/components/ui/button/Button";
import {AiOutlineArrowLeft} from "react-icons/ai";
import ROUTES from "@/constants/ROUTES";
import Admin from "@/components/admin/Admin";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import SearchBar from "@/components/ui/searchbar/SearchBar";
import {BsPersonAdd} from "react-icons/bs";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from './Index.module.scss';
import ArtisteCard from "@/components/admin/artistes/ArtisteCard";
import LittleSpinner from "@/components/ui/LittleSpinner";

export default function ArtistesIndex() {

    const router = useRouter();

    const [artistes, setArtistes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtistes = async () => {
            const res = await fetch(ROUTES.API.ARTISTES.HOME);
            const artistes = await res.json();
            setArtistes(artistes.list);
            setLoading(false);
        }
        fetchArtistes();
    }, []);

    const handleDeleteSuccess = (deletedArtisteId) => {
        const updatedArtistes = artistes.filter(artiste => artiste.id !== deletedArtisteId);
        setArtistes(updatedArtistes);
    };

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
                            <LittleSpinner/> : artistes?.length ? (artistes.length + ` artiste${artistes.length > 1 ? 's' : ''} trouvé${artistes.length > 1 ? 's' : ''}`) : "Aucun artiste trouvé"}
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
                                        onDeleteSuccess={handleDeleteSuccess}
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
