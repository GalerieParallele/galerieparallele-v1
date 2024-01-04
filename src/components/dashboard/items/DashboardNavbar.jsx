import styles from './DashboardNavbar.module.scss';
import Image from "next/image";
import React from "react";
import Button from "../../items/button/Button";
import {IoIosLogOut} from "react-icons/io";
import {FaHome} from "react-icons/fa";
import Link from "next/link";
import ROUTES from "../../../constants/ROUTES";
import {useRouter} from "next/router";
import {AiOutlineArrowLeft} from "react-icons/ai";

export default function DashboardNavbar({returnURL}) {

    const router = useRouter();

    return (
        <div className={styles.main}>
            {
                returnURL ?
                    (
                        <div>
                            <Button
                                isWhite
                                text={<AiOutlineArrowLeft/>}
                                onClick={() => router.push(returnURL)}
                            />
                        </div>
                    ) :
                    (
                        <div/>
                    )
            }
            <div className={styles.center}>
                <Link href={ROUTES.ADMIN.HOME}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={"/assets/img/white-logo.svg"}
                            alt={"Logo de la galerie"}
                            width={100}
                            height={100}
                        />
                    </div>
                </Link>
            </div>
            <div className={styles.right}>
                <Button
                    isWhite
                    text={<IoIosLogOut/>}
                />
                <Button
                    isWhite
                    text={<FaHome/>}
                    onClick={() => router.push(ROUTES.HOME)}
                />
            </div>
        </div>
    )
}