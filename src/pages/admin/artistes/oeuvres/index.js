import Admin from "@/components/admin/Admin";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from './Index.module.scss';
import Button from "@/components/items/button/Button";
import {AiOutlineArrowLeft} from "react-icons/ai";
import React from "react";
import ROUTES from "@/constants/ROUTES";
import {useRouter} from "next/router";
import OeuvresList from "@/components/admin/artistes/oeuvres/OeuvresList";
import SearchBar from "@/components/items/searchbar/SearchBar";
import {BsPersonAdd} from "react-icons/bs";
import {FaPaintBrush} from "react-icons/fa";

export default function OeuvresIndex() {

    const router = useRouter();

    const oeuvresTest = [
        {
            "id": 1,
            "name": "Mona Lisa",
            "description": "Description de l'oeuvre 1",
            "images": [
                "https://picsum.photos/200/300",
                "https://picsum.photos/200/300",
                "https://picsum.photos/200/300",
            ]
        },
        {
            "id": 2,
            "name": "École d'Athènes",
            "description": "Description de l'oeuvre 2",
            "images": [
                "https://picsum.photos/200/300",
                "https://picsum.photos/200/300",
                "https://picsum.photos/200/300",
            ]
        },
        {
            "id": 3,
            "name": "La Jeune Fille à la perle",
            "description": "Description de l'oeuvre 3",
            "images": [
                "https://picsum.photos/200/300",
                "https://picsum.photos/200/300",
                "https://picsum.photos/200/300",
            ]
        }
    ]


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
                            placeholder={"Rechercher une oeuvre"}
                        />
                        <button
                            onClick={() => router.push(ROUTES.ADMIN.ARTISTES.OEUVRES.NEW)}
                            className={styles.addButton}>
                            <div className={styles.tooltip}>
                                Ajouter une oeuvre
                            </div>
                            <FaPaintBrush/>
                        </button>
                    </div>
                    <div className={styles.content}>
                        <OeuvresList oeuvres={oeuvresTest}/>
                    </div>
                </div>
            </main>
        </Admin>
    )

}