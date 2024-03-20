import React, {useEffect, useRef, useState} from 'react';

import Link from "next/link";
import Image from "next/image";

import {BiSolidUser} from "react-icons/bi";
import {SlMenu} from "react-icons/sl";

import Amo from "@/components/ui/amo/Amo";

import styles from './Navbar.module.scss';

import {useAuth} from "@/hooks/useAuth";

import ROUTES from "@/constants/ROUTES";
import {FaHome, FaRegHeart, FaSearch, FaShoppingCart} from "react-icons/fa";
import {IoBook} from "react-icons/io5";
import {AiFillStar} from "react-icons/ai";
import {useRouter} from "next/router";
import {ImArrowLeft2} from "react-icons/im";
import {IoIosSettings} from "react-icons/io";
import {FiHelpCircle} from "react-icons/fi";

export default function Navbar() {

    const router = useRouter();

    const {user} = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleOpenSideMenu = () => {
        setIsMenuOpen(true);
    };

    const handleCloseSideMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {

        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                handleCloseSideMenu();
            }
        }

        // Ajoutez l'event listener lors de l'ouverture du menu
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Nettoyez l'event listener lors du démontage
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, user]);


    return (
        <>
            <Amo/>
            <div className={styles.navbar} key={user ? user.id : 'unlogged'}>
                <div className={styles.left}>
                    <button onClick={handleOpenSideMenu}>
                        <SlMenu/>
                    </button>
                </div>
                <div className={styles.center}>
                    <div className={styles.bigLogoName}>
                        <Link href={ROUTES.HOME}>
                            <Image
                                src={"/assets/img/dark-name-w-logo.svg"}
                                alt={"logo"}
                                width={200}
                                height={200}
                                priority/>
                        </Link>
                    </div>
                    <div className={styles.littleLogoName}>
                        <Link href={ROUTES.HOME}>
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
                    <Link href={ROUTES.AUTH}>
                        <p>{user ? <BiSolidUser/> : "S'identifier"}</p>
                    </Link>
                    <span className={styles.verticalSeparator}/>
                    <Link href={"#"}>
                        <FaRegHeart/>
                    </Link>
                    <span className={styles.verticalSeparator}/>
                    <Link href={"#"}>
                        <FaShoppingCart/>
                    </Link>
                    <span className={styles.verticalSeparator}/>
                    <Link href={"#"}>
                        <FiHelpCircle/>
                    </Link>
                    {user && user.roles && user.roles.includes("ROLE_ADMIN") && (
                        <>
                            <span className={styles.verticalSeparator}/>
                            <Link href={ROUTES.ADMIN.HOME}>
                                <IoIosSettings className={styles.adminIcon}/>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.menu}>
                {
                    isMenuOpen && <div className={styles.filter}/>
                }
                <div
                    className={styles.content}
                    style={{left: isMenuOpen ? "0" : "-500px"}}
                    ref={menuRef}
                >
                    <div className={styles.closeSpace}>
                        <button
                            onClick={handleCloseSideMenu}
                        >
                        <ImArrowLeft2/>
                        </button>
                    </div>
                    <div className={styles.top}>
                        <div
                            className={styles.homeIcon}
                            onClick={() => {
                                router.push(ROUTES.HOME)
                                handleCloseSideMenu()
                            }}
                        >
                            <FaHome/>
                        </div>
                        <div className={styles.searchSpace}>
                            <div className={styles.searchBar}>
                                <input
                                    type={"text"}
                                    id={"search"}
                                    name={"search"}
                                    placeholder={"Rechercher"}
                                />
                                <div className={styles.searchIcon}>
                                    <FaSearch/>
                                </div>
                            </div>
                            <div className={styles.horizontalLine}/>
                        </div>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.container}>
                            <Link
                                onClick={handleCloseSideMenu}
                                href={ROUTES.ARTISTES.HOME}
                            >
                                Artistes
                            </Link>
                            <Link
                                onClick={handleCloseSideMenu}
                                href={"#"}
                            >
                                Expositions
                            </Link>
                            <Link
                                onClick={handleCloseSideMenu}
                                href={"#"}
                            >
                                La galerie
                            </Link>
                            <Link
                                onClick={handleCloseSideMenu}
                                href={"#"}
                            >
                                Shop
                            </Link>
                            <Link
                                onClick={handleCloseSideMenu}
                                href={"#"}
                            >
                                Espace entreprises
                            </Link>
                            <Link
                                onClick={handleCloseSideMenu}
                                href={"#"}
                            >
                                Événements privés
                            </Link>
                            <Link
                                onClick={handleCloseSideMenu}
                                href={"#"}
                            >
                                Contact
                            </Link>
                            <div
                                className={styles.horizontalLine}
                                style={{
                                    margin: "20px 0"
                                }}
                            />
                            <div className={styles.specialLinks}>
                                <Link
                                    onClick={handleCloseSideMenu}
                                    href={"#"}
                                >
                                    <IoBook/>
                                    <p className={styles.magazine}>Magazine</p>
                                </Link>
                                <Link
                                    onClick={handleCloseSideMenu}
                                    href={"#"}
                                >
                                    <AiFillStar/>
                                    <p>Arts Member Only</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <button>
                            Démarrer l&apos;expérience
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}