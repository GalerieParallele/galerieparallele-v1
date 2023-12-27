import React from "react";

import ROUTES from "@/constants/ROUTES";

import Admin from "@/components/admin/Admin";
import Button from "@/components/items/button/Button";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from "@/pages/admin/artistes/new/Index.module.scss";

import {AiOutlineArrowLeft} from "react-icons/ai";
import {useRouter} from "next/router";

export default function OeuvreNew() {

    const router = useRouter();

    return (
        <Admin>
            <main className={adminStyles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft/>}
                        onClick={() => router.push(ROUTES.ADMIN.ARTISTES.OEUVRES)}
                    />
                </div>
                <div className={styles.main}>

                </div>
            </main>
        </Admin>
    )
}