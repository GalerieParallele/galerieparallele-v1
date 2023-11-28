import React from "react";

import ROUTES from "@/constants/ROUTES";

import Image from "next/image";
import Link from "next/link";

import AdminBottom from "@/components/admin/AdminBottom";
import AdminLink from "@/components/admin/AdminLink";

import styles from "./AdminNav.module.css"
import {FaFileContract, FaPaintBrush} from "react-icons/fa";
import {AiOutlineUnorderedList} from "react-icons/ai";
import {GoLaw} from "react-icons/go";
import {BsCalendarDate, BsImages} from "react-icons/bs";
import {LuFolderHeart} from "react-icons/lu";

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
            <div style={{
                marginTop: "1rem",
                width: "100%",
                backgroundColor: "white",
                height: "1px",
            }}/>
            <div style={{
                fontSize: "0.95rem",
                width: "100%",
                padding: "10px 1.5rem",
            }}>
                <p style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                }}>Artistes</p>
            </div>
            <AdminLink
                text={"Liste"}
                IconComponent={AiOutlineUnorderedList}
                to={ROUTES.ADMIN.ARTISTES.HOME}
            />
            <AdminLink
                text={"Oeuvres"}
                IconComponent={FaPaintBrush}
                to={"#"}
            />
            <AdminLink
                text={"Juridique"}
                IconComponent={GoLaw}
                to={ROUTES.ADMIN.ARTISTES.LEGAL_INFORMATION}
            />
            <AdminLink
                text={"Relations contractuelles"}
                IconComponent={FaFileContract}
                to={"#"}
            />
            <AdminLink
                text={"Illustrations"}
                IconComponent={BsImages}
                to={"#"}
            />
            <AdminLink
                text={"SaveTheDate"}
                IconComponent={BsCalendarDate}
                to={"#"}
            />
            <div style={{
                marginTop: "1rem",
                width: "100%",
                backgroundColor: "white",
                height: "1px",
            }}/>
        </div>
        <AdminBottom/>
    </>
}