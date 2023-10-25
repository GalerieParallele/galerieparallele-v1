import Admin from "@/components/admin/Admin";
import Button from "@/components/items/button/Button";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiOutlineArrowLeft,
    AiOutlineFieldNumber
} from "react-icons/ai";
import ROUTES from "@/constants/ROUTES";
import React from "react";
import {useRouter} from "next/router";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from './Index.module.scss';
import IconInput from "@/components/items/iconinput/IconInput";
import {MdEmail, MdPassword} from "react-icons/md";
import {RxAvatar} from "react-icons/rx";
import {BsFillFileEarmarkPersonFill, BsTelephoneFill} from "react-icons/bs";
import ArtisteNewSectionItem from "@/components/admin/artistes/new/ArtisteNewSectionItem";
import {IoHome} from "react-icons/io5";
import {PiTextIndentBold} from "react-icons/pi";
import Editor from "@/components/items/Editor";
import {GrTextAlignCenter} from "react-icons/gr";
import {FaEarthAfrica} from "react-icons/fa6";

export default function ArtisteAdminNew() {

    const router = useRouter();

    return (
        <Admin>
            <main className={adminStyles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft/>}
                        onClick={() => router.push(ROUTES.ADMIN.ARTISTES.HOME)}
                    />
                </div>
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>Artistes</h1>
                        <h3>Création d&apos;un nouvel artiste</h3>
                    </div>
                    <div className={styles.sectionList}>
                        <div className={styles.part}>
                            <ArtisteNewSectionItem
                                sectionName={"Informations utilisateur"}
                            >
                                <IconInput
                                    label={"E-mail"}
                                    type={"email"}
                                    IconComponent={MdEmail}
                                    placeholder={"Ex: example@mail.com"}
                                />
                                <IconInput
                                    label={"Mot de passe"}
                                    type={"password"}
                                    IconComponent={MdPassword}
                                    placeholder={"Ex: euI8k%$uYvg"}
                                />
                                <IconInput
                                    label={"Avatar"}
                                    type={"file"}
                                    IconComponent={RxAvatar}
                                />
                                <IconInput
                                    label={"Prénom"}
                                    type={"text"}
                                    IconComponent={BsFillFileEarmarkPersonFill}
                                    placeholder={"Ex: Jean"}
                                />
                                <IconInput
                                    label={"Nom"}
                                    type={"text"}
                                    IconComponent={BsFillFileEarmarkPersonFill}
                                    placeholder={"Ex: Dupont"}
                                />
                                <IconInput
                                    label={"Numéro de téléphone"}
                                    type={"tel"}
                                    IconComponent={BsTelephoneFill}
                                    placeholder={"Ex: 0769141995"}
                                />
                                <IconInput
                                    label={"Adresse"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={"Ex: 1 rue de la paix"}
                                />
                                <IconInput
                                    label={"Ville"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={"Ex: Paris"}
                                />
                                <IconInput
                                    label={"Code postal"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={"Ex: 75000"}
                                />
                            </ArtisteNewSectionItem>
                            <ArtisteNewSectionItem
                                sectionName={"Informations artiste"}
                            >
                                <IconInput
                                    label={"Nom d'artiste"}
                                    type={"text"}
                                    IconComponent={BsFillFileEarmarkPersonFill}
                                    placeholder={"Ex: M4TRIX"}
                                />
                                <div className={styles.specialSection}>
                                    <div className={styles.specialSectionHead}>
                                        <span>
                                            <GrTextAlignCenter/>
                                        </span>
                                        <div>
                                            <p>Biographie</p>
                                        </div>
                                    </div>
                                    <Editor/>
                                </div>
                                <IconInput
                                    label={"Facebook"}
                                    type={"text"}
                                    IconComponent={AiFillFacebook}
                                    placeholder={"Ex: https://www.facebook.com/..."}
                                />
                                <IconInput
                                    label={"Instagram"}
                                    type={"text"}
                                    IconComponent={AiFillInstagram}
                                    placeholder={"Ex: https://www.instagram.com/..."}
                                />
                                <IconInput
                                    label={"LinkedIn"}
                                    type={"text"}
                                    IconComponent={AiFillLinkedin}
                                    placeholder={"Ex: https://www.linkedin.com/..."}
                                />
                                <IconInput
                                    label={"Site web"}
                                    type={"text"}
                                    IconComponent={FaEarthAfrica}
                                    placeholder={"Ex: https://www.m4trix.com"}
                                />
                                <IconInput
                                    label={"Numéro de SIRET"}
                                    type={"text"}
                                    IconComponent={AiOutlineFieldNumber}
                                    placeholder={"Ex: 12345678912345"}
                                />
                                <IconInput
                                    label={"Numéro de TVA"}
                                    type={"text"}
                                    IconComponent={AiOutlineFieldNumber}
                                    placeholder={"Ex: 12345678912345"}
                                />
                            </ArtisteNewSectionItem>
                        </div>
                    </div>
                </div>
            </main>
        </Admin>
    )

}