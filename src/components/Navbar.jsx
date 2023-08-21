import React from 'react';

import styles from '@/styles/components/Navbar.module.css';
import {AiOutlineMenu} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import {BiSolidUser} from "react-icons/bi";
import {SlMenu} from "react-icons/sl";
import Amo from "@/components/Amo";
import {useAuth} from "@/hooks/useAuth";

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
                    <Link href="/">
                        <Image src={"/assets/img/dark-name-w-logo.svg"} alt={"logo"} width={200} height={200}
                               layout={"responsive"}/>
                    </Link>
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