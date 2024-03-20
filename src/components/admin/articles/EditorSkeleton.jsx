import React from "react";

import Editor from "@/components/ui/Editor";
import IconInput from "@/components/ui/iconinput/IconInput";
import Button from "@/components/ui/button/Button";

import {BsTextParagraph} from "react-icons/bs";

import styles from "./AdminArticlesNew.module.css";

export default function EditorSkeleton({
                                           onSubmit,
                                           formData,
                                           setFormData,
                                           defaultTitle,
                                           defaultContent,
                                           defaultChecked
                                       }) {
    return (
        <>
            <div className={styles.content}>
                <div className={`${styles.center} ${styles.title}`}>
                    <IconInput
                        label="Titre"
                        IconComponent={BsTextParagraph}
                        value={formData.title || defaultTitle}
                        type="text"
                        onChange={(e) => {
                            setFormData(prevState => ({
                                ...prevState,
                                title: e.target.value
                            }));
                        }}
                        required
                    />
                </div>
                <Editor
                    defaultContent={formData.content || defaultContent}
                    onEditorChange={(content) => {
                        setFormData(prevState => ({...prevState, content}));
                    }}
                />
                <div className={styles.center}>
                    <p>Privé</p>
                    <input
                        type="checkbox"
                        checked={formData.private || defaultChecked}
                        onChange={(e) => {
                            setFormData(prevState => ({
                                ...prevState,
                                private: e.target.checked
                            }));
                        }}
                    />
                </div>
            </div>
            <div className={styles.center}>
                <Button text="Publier" onClick={onSubmit}/>
            </div>
        </>
    );
}

EditorSkeleton.defaultProps = {
    defaultTitle: "",
    defaultContent: "",
    defaultChecked: false,
    onSubmit: () => {
    },
};
