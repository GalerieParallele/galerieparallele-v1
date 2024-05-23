import React, {useState} from "react";

import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import Switch from "react-switch";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";

import {MdOutlinePermMedia, MdTitle} from "react-icons/md";
import {CiTextAlignLeft} from "react-icons/ci";
import {FaExternalLinkAlt, FaEye} from "react-icons/fa";

import styles from './Index.module.scss';
import sectionStyles from "@/components/dashboard/items/sections/DashboardSectionItem.module.scss";
import Button from "@/components/ui/button/Button";
import {Toast} from "@/constants/ToastConfig";

export default function DashboardAccueilActualityIndex() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        actuality: {
            title: "",
            content: "",
            link: "",
            mediaURL: "",
            private: false
        }
    });

    const handleChangeFormData = (e) => {
        setFormData({
            ...formData,
            actuality: {
                ...formData.actuality,
                [e.target.name]: e.target.value
            }
        })
    }

    const acceptFileTypes = [
        "image/jpeg",
        "image/jpg",
        'image/tiff',
        "image/png",
        "video/mp4",
        "video/mp3",
    ];

    const handleSubmit = () => {

        if (file && !handleValidateFile(file)) {
            Toast.fire({
                icon: "error",
                title: "Le type de fichier n'est pas accepté"
            })
            return;
        }

    }

    const handleValidateFile = (file) => {
        return acceptFileTypes.includes(file.type);
    };

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.HOME}
            />
            <div className={styles.content}>
                <div className={styles.topSpace}>
                    <Button
                        text={"Enregistrer"}
                        type={"submit"}
                        onClick={handleSubmit}
                        disabled={loading}
                        isLoading={loading}
                    />
                </div>
                <DashboardSectionItem
                    sectionName={"Ajouter une actualité"}
                >
                    <IconInput
                        label={"Titre"}
                        type={"text"}
                        IconComponent={MdTitle}
                        placeholder={"Ex: Just Fontaine, le meilleur buteur..."}
                        onChange={(e) => handleChangeFormData(e)}
                        name={"title"}
                        value={formData?.actuality?.title}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Contenu"}
                        type={"text"}
                        IconComponent={CiTextAlignLeft}
                        placeholder={"Ex: Venez découvrir la sculpture directement en galerie"}
                        onChange={(e) => handleChangeFormData(e)}
                        name={"content"}
                        value={formData?.actuality?.content}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Lien de redirection"}
                        type={"text"}
                        IconComponent={FaExternalLinkAlt}
                        placeholder={"Ex: galerieparallele.com/magazine/1"}
                        onChange={(e) => handleChangeFormData(e)}
                        name={"link"}
                        value={formData?.actuality?.link}
                        disabled={loading}
                    />
                    <IconInput
                        label={"Media"}
                        type={"file"}
                        IconComponent={MdOutlinePermMedia}
                        onChange={(e) => setFile(e.target.files[0])}
                        multiple={false}
                        name={"mediaURL"}
                        value={formData?.actuality?.mediaURL}
                        disabled={loading}
                        required
                    />
                    <p className={styles.acceptFile}>Les types de fichiers acceptés
                        sont: {acceptFileTypes.join(", ")}</p>
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                <span>
                                    <FaEye/>
                                </span>
                            <div>
                                <p>Visibilité</p>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "1rem"
                            }}
                        >
                            <span
                                style={{
                                    color: formData?.actuality?.private ? "var(--light-gray)" : "var(--black)",
                                }}
                            >
                                Public
                            </span>
                            <Switch
                                onChange={(checked) => setFormData(
                                    {
                                        ...formData,
                                        actuality: {
                                            ...formData.actuality,
                                            private: checked
                                        }
                                    }
                                )}
                                checked={formData?.actuality?.private}
                                onColor={"#070707"}
                                offColor={"#070707"}
                                checkedIcon={false}
                                uncheckedIcon={false}
                            />
                            <span
                                style={{
                                    color: formData?.actuality?.private ? "var(--black)" : "var(--light-gray)",
                                }}
                            >
                                Privé
                            </span>
                        </div>
                    </div>
                </DashboardSectionItem>
            </div>
        </div>
    )
}