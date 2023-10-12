import React from 'react';

import Link from "next/link";
import Image from "next/image";

import {IoIosSettings} from "react-icons/io";
import {BiSolidUser} from "react-icons/bi";
import {SlMenu} from "react-icons/sl";

import Amo from "@/components/items/amo/Amo";

import styles from './Navbar.module.css';

import {useAuth} from "@/hooks/useAuth";

import ROLES from "@/constants/ROLES";
import ROUTES from "@/constants/ROUTES";

export default function Navbar() {

    const {user, hasRole} = useAuth();

    return (
        <>
            <Amo/>
            <div className={styles.navbar} key={user ? user.id : 'unlogged'}>
                <div className={styles.left}>
                    <button>
                        <SlMenu/>
                    </button>
                </div>
                <div className={styles.center}>
                    <div className={styles.bigLogoName}>
                        <Link href={ROUTES.ACCUEIL}>
                            <Image
                                src={"/assets/img/dark-name-w-logo.svg"}
                                alt={"logo"}
                                width={200}
                                height={200}
                                priority/>
                        </Link>
                    </div>
                    <div className={styles.littleLogoName}>
                        <Link href={ROUTES.ACCUEIL}>
                            <Image
                                src={"/assets/img/dark-logo.svg"}
                                alt={"logo"}
                                width={30}
                                height={30}
                                priority/>
                        </Link>
                    </div>
                </div>
                <div className={styles.right}>
                    <Link href={ROUTES.LOGIN}>
                        <BiSolidUser/>
                        <p>{user ? "Mon compte" : "S'identifier"}</p>
                    </Link>
                    {hasRole(ROLES.ADMIN) && (
                        <>
                            <span className={styles.verticalSeparator}/>
                            <Link href={ROUTES.ADMIN.HOME}>
                                <IoIosSettings className={styles.adminIcon}/>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}