import Admin from "@/components/admin/Admin";
import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from "@/pages/admin/artistes/new/Index.module.scss";
import Button from "@/components/items/button/Button";
import {AiOutlineArrowLeft} from "react-icons/ai";
import React from "react";
import ROUTES from "@/constants/ROUTES";
import {useRouter} from "next/router";

export default function OeuvresIndex() {

    const router = useRouter();

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
                        <h3>Création/Édition des oeuvres</h3>
                    </div>
                </div>
            </main>
        </Admin>
    )

}