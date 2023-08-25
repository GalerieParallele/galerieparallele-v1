import React, {useEffect, useState} from "react";

import ROUTES from "@/constants/ROUTES";

import Admin from "@/components/admin/Admin";
import Editor from "@/components/items/Editor";
import Button from "@/components/items/Button";

import {AiOutlineArrowLeft} from "react-icons/ai";

import styles from "@/styles/components/admin/articles/AdminArticlesNew.module.css";
import IconInput from "@/components/items/IconInput";
import {BsTextParagraph} from "react-icons/bs";
import {useRouter} from "next/router";
import BigSpinner from "@/components/items/BigSpinner";
import {Toast} from "@/constants/ToastConfig";

export default function AdminArticlesIndex() {

    const [isLoading, setIsLoading] = useState(true);
    const [editorData, setEditorData] = useState("");
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

        const res = await fetch("/api/articles", {
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
                        <div className={styles.content}>
                            <div className={`${styles.center} ${styles.title}`}>
                                <IconInput
                                    label={"Titre"}
                                    IconComponent={BsTextParagraph}
                                    value={formData.title}
                                    type={"text"}
                                    onChange={(e) => {
                                        setFormData(prevState => ({...prevState, title: e.target.value}))
                                    }}
                                    required
                                />
                            </div>
                            <Editor onEditorChange={(content) => {
                                setEditorData(content);
                                setFormData(prevState => ({...prevState, content: content}))
                            }}/>
                            <div className={styles.center}>
                                <p>Privé</p>
                                <input type={"checkbox"} onChange={(e) => {
                                    setFormData(prevState => ({...prevState, private: e.target.checked}));
                                }}/>
                            </div>
                        </div>
                        <div className={styles.center}>
                            <Button
                                text={"Publier"}
                                onClick={handleSubmit}
                            />
                        </div>
                    </>
                )}
            </main>
        </Admin>
    );
}
