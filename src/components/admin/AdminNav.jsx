import React from "react";

import ROUTES from "@/constants/ROUTES";

import Image from "next/image";
import Link from "next/link";

import AdminBottom from "@/components/admin/AdminBottom";
import AdminLink from "@/components/admin/AdminLink";

import {TfiWrite} from "react-icons/tfi";
import {BiSolidUser} from "react-icons/bi";

import styles from "../../styles/components/admin/AdminNav.module.css"

export default function AdminNav() {
    return <>
        <div>
            <Link href={ROUTES.ADMIN.INDEX}>
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
                to={ROUTES.ADMIN.ARTICLES.INDEX}
            />
            <AdminLink
                text={"Utilisateurs"}
                IconComponent={BiSolidUser}
                to={ROUTES.ADMIN.USERS.INDEX}
            />
        </div>
        <AdminBottom/>
    </>
}