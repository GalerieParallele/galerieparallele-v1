import Link from "next/link";

import styles from "./FooterLegal.module.scss";

export default function FooterLegal() {
    return (
        <div className={styles.main}>
            <div className={styles.horizontalSeparator}/>
            <Link
                href={"#"}>
                CGV
            </Link>
            <DotComponent/>
            <Link
                href={"#"}>
                CGU
            </Link>
            <DotComponent/>
            <Link
                href={"#"}>
                Mentions légales
            </Link>
            <DotComponent/>
            <Link
                href={"#"}>
                Charte de confidentialité et cookies
            </Link>
            <div className={styles.horizontalSeparator}/>
        </div>
    )
}

const DotComponent = () => (
    <span className={styles.dot}>•</span>
)