import AdminBottom from "@/components/admin/AdminBottom";
import AdminLink from "@/components/admin/AdminLink";

import Image from "next/image";

import {TfiWrite} from "react-icons/tfi";

import styles from "../styles/pages/admin.module.css"
import {BiSolidUser} from "react-icons/bi";
import Link from "next/link";
import ROUTES from "@/constants/ROUTES";

export default function Admin() {
    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <div>
                    <Link href={ROUTES.ACCUEIL}>
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
                        to={"/admin/articles"}
                    />
                    <AdminLink
                        text={"Utilisateurs"}
                        IconComponent={BiSolidUser}
                        to={"/admin/users"}
                    />
                </div>
                <AdminBottom/>
            </div>
            <div className={styles.right} style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h2>Bienvenue sur le tableau de bord</h2>
                <p>Ici, vous pourrez gérer les articles, les utilisateurs et plein d'autres choses...</p>
            </div>
        </main>
    )
}