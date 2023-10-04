import React from "react";

import ROUTES from "@/constants/ROUTES";

import Image from "next/image";
import Link from "next/link";

import AdminBottom from "@/components/admin/AdminBottom";
import AdminLink from "@/components/admin/AdminLink";

import {TfiWrite} from "react-icons/tfi";
import {BiSolidUser} from "react-icons/bi";

import styles from "./AdminNav.module.css"
import {AiOutlineCloudUpload} from "react-icons/ai";

export default function AdminNav() {
    return <>
        <div>
            <Link href={ROUTES.ADMIN.HOME}>
                <div className={styles.imageContainer}>
                    <Image
                        src={"/assets/img/white-logo.svg"}
                        alt={"Logo de la galerie"}
                        width={100}
                        height={100}
                    />
                </div>
            </Link>
        </div>
        <div className={styles.center}>
            <AdminLink
                text={"Articles"}
                IconComponent={TfiWrite}
                to={ROUTES.ADMIN.ARTICLES.HOME}
            />
            <AdminLink
                text={"Utilisateurs"}
                IconComponent={BiSolidUser}
                to={ROUTES.ADMIN.USERS.HOME}
            />
            <AdminLink
                text={"Cloud"}
                IconComponent={AiOutlineCloudUpload}
                to={ROUTES.ADMIN.MY_CLOUD.HOME}
            />
        </div>
        <AdminBottom/>
    </>
}