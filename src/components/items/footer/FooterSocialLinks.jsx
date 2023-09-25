import Link from "next/link";
import Image from "next/image";

import {AiFillFacebook, AiFillInstagram, AiFillLinkedin} from "react-icons/ai";

import styles from "./FooterSocialLinks.module.scss";

export default function FooterSocialLinks() {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image
                        src={"/assets/img/white-logo.svg"}
                        alt={"Logo de la galerie parallèle"}
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div className={styles.right}>
                <h5>Nous suivre</h5>
                <div className={styles.separator}/>
                <div className={styles.links}>
                    <Link href={"#"}>
                        <AiFillInstagram/>
                    </Link>
                    <Link href={"#"}>
                        <AiFillFacebook/>
                    </Link>
                    <Link href={"#"}>
                        <AiFillLinkedin/>
                    </Link>
                </div>
            </div>
        </div>
    )
}