import React from 'react';

import Link from "next/link";
import Image from "next/image";

import {BiSolidUser} from "react-icons/bi";
import {SlMenu} from "react-icons/sl";
import Amo from "@/components/Amo";

import {useAuth} from "@/hooks/useAuth";

import styles from '../styles/components/Navbar.module.css';

export default function Navbar() {

    const {user} = useAuth();
    return (
        <>
            <Amo/>
            <div className={styles.navbar}>
                <div className={styles.left}>
                    <button>
                        <SlMenu/>
                    </button>
                </div>
                <div className={styles.center}>
                    <div className={styles.bigLogoName}>
                        <Link href="/">
                            <Image
                                src={"/assets/img/dark-name-w-logo.svg"}
                                alt={"logo"}
                                width={200}
                                height={200}
                                priority/>
                        </Link>
                    </div>
                    <div className={styles.littleLogoName}>
                        <Link href="/">
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
                    <Link href="/login">
                        <BiSolidUser/>
                        <p>{user ? "Mon compte" : "S'identifier"}</p>
                    </Link>
                </div>
            </div>
        </>
    )
}