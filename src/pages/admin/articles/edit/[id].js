import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Correction de l'importation du routeur
import ROUTES from "@/constants/ROUTES";
import PageLoader from "@/components/ui/PageLoader";
import styles from "@/components/admin/articles/AdminArticlesNew.module.css";
import Button from "@/components/ui/button/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import BigSpinner from "@/components/ui/BigSpinner";
import EditorSkeleton from "@/components/admin/articles/EditorSkeleton";
import Admin from "@/components/admin/Admin";

export default function AdminArticlesEdit() {
    const [isLoading, setIsLoading] = useState(true);
    const [isPageReady, setIsPageReady] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        private: false,
    });

    const router = useRouter(); // Utilisation directe de useRouter
    const id = Number(router.query.id);

    useEffect(() => {
        const fetchData = async () => {
            if (router.isReady) {
                if (Number.isNaN(id) || id <= 0) {
                    await router.push(ROUTES.ADMIN.ARTICLES.HOME);
                } else {
                    setIsPageReady(true);
                    try {
                        const resArticleInfo = await fetch(`${ROUTES.API.ARTICLES.GET_SPECIAL}${id}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                        });

                        if (resArticleInfo.status === 200) {
                            const articleInfo = await resArticleInfo.json();
                            setFormData({
                                title: articleInfo.title,
                                content: articleInfo.content,
                                private: articleInfo.private,
                            });
                        } else {
                            await router.push(ROUTES.ADMIN.ARTICLES.HOME);
                        }
                    } catch (error) {
                        console.error("There was an error fetching the article:", error);
                        await router.push(ROUTES.ADMIN.ARTICLES.HOME);
                    }
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, router, router.isReady]);

    const handleSubmit = async () => {
        setIsLoading(false);
    };

    if (!isPageReady) {
        return <PageLoader />;
    }

    return (
        <Admin>
            <main className={styles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft />}
                        onClick={() => router.push(ROUTES.ADMIN.ARTICLES.HOME)}
                    />
                </div>
                {isLoading ? (
                    <div>
                        <BigSpinner />
                    </div>
                ) : (
                    <EditorSkeleton onSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
                )}
            </main>
        </Admin>
    );
}
