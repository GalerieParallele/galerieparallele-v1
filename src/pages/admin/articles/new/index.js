import React, {useEffect, useState} from "react";

import ROUTES from "@/constants/ROUTES";

import Admin from "@/components/admin/Admin";
import Button from "@/components/items/button/Button";

import {AiOutlineArrowLeft} from "react-icons/ai";

import styles from "@/components/admin/articles/AdminArticlesNew.module.css";
import {useRouter} from "next/router";
import BigSpinner from "@/components/items/BigSpinner";
import {Toast} from "@/constants/ToastConfig";
import EditorSkeleton from "@/components/admin/articles/EditorSkeleton";

export default function AdminArticlesIndex() {

    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        private: false,
    });

    const router = useRouter();

    useEffect(() => {
        setIsLoading(false);
    }, [formData]);

    const handleSubmit = async () => {
        setIsLoading(true);

        const data = {
            title: formData.title,
            content: formData.content,
            private: formData.private,
        };

        const res = await fetch(ROUTES.API.ARTICLES.GET, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (res.status === 201) {
            router.push(ROUTES.ADMIN.ARTICLES.HOME);
            await Toast.fire({
                icon: "success",
                title: "Article publié !",
            });
        } else {
            setIsLoading(false);
        }
    }

    return (
        <Admin>
            <main className={styles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft/>}
                        onClick={() => router.push(ROUTES.ADMIN.ARTICLES.HOME)}
                    />
                </div>
                {isLoading ? (
                    <div>
                        <BigSpinner/>
                    </div>
                ) : (
                    <>
                        <EditorSkeleton
                            onSubmit={handleSubmit}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </>
                )}
            </main>
        </Admin>
    );
}
