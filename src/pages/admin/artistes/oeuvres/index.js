import Admin from "@/components/admin/Admin";
import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from "@/pages/admin/artistes/new/Index.module.scss";
import Button from "@/components/items/button/Button";
import {AiOutlineArrowLeft} from "react-icons/ai";
import React from "react";
import ROUTES from "@/constants/ROUTES";
import {useRouter} from "next/router";
import OeuvresList from "@/components/admin/artistes/oeuvres/OeuvresList";

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
                    <div className={styles.head}>
                        <h1>Oeuvres</h1>
                        <h3>Listes des oeuvres</h3>
                    </div>
                    <div className={styles.content}>
                        <OeuvresList oeuvres={oeuvresTest}/>
                    </div>
                </div>
            </main>
        </Admin>
    )

}