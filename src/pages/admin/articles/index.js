import React, {useEffect, useState} from "react";

import ROUTES from "@/constants/ROUTES";

import {useRouter} from "next/router";

import ArticleItem from "@/components/admin/articles/ArticleItem";
import Admin from "@/components/admin/Admin";
import Button from "@/components/items/Button";

import {AiOutlineArrowLeft} from "react-icons/ai";

import styles from "@/styles/components/admin/articles/AdminArticles.module.css"
import BigSpinner from "@/components/items/BigSpinner";

export default function AdminArticles() {

    const [loading, setLoading] = useState(false)
    const [articlesList, setArticlesList] = useState([])

    const router = useRouter();

    useEffect(() => {

        setLoading(true);

        fetch(ROUTES.API.ARTICLES.GET)
            .then(response => response.json())
            .then(data => {
                if (data.list) {
                    setArticlesList(data.list);
                }
            })
            .catch(error => {
                // GERER LES ERREURS
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Admin>
            <main className={styles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft/>}
                        onClick={() => router.push(ROUTES.ADMIN.HOME)}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        text={"Créer un article"}
                        onClick={() => router.push(ROUTES.ADMIN.ARTICLES.NEW)}
                    />
                </div>
                <div className={styles.articlesItem}>
                    {loading ? (
                        <div style={{
                            textAlign: "center",
                        }}>
                            <BigSpinner/>
                        </div>
                    ) : articlesList && articlesList.length > 0 ? (
                        articlesList.map(article => (
                            <ArticleItem
                                key={article.id}
                                title={article.title}
                                content={article.content}
                                lock={article.private}
                                id={article.id}
                            />
                        ))
                    ) : (
                        <p>Aucun article trouvé</p>
                    )}
                </div>
            </main>
        </Admin>
    );
}
