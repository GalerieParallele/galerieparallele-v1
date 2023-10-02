import styles from "./InstagramItem.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function InstagramItem({src, layoutType, href}) {
    let itemStyle = {};

    switch (layoutType) {
        case '2x2':
            itemStyle = {
                gridColumn: "span 2",
                gridRow: "span 2"
            };
            break;
        case '1x2':
            itemStyle = {
                gridRow: "span 2"
            };
            break;
        case '2x1':
            itemStyle = {
                gridColumn: "span 2"
            };
            break;
        case '3x1':
            itemStyle = {
                gridColumn: "span 3"
            };
            break;
        case '1x3':
            itemStyle = {
                gridRow: "span 3"
            };
            break;
        case '3x2':
            itemStyle = {
                gridColumn: "span 3",
                gridRow: "span 2"
            };
            break;
        default:
            itemStyle = {
                gridColumn: "span 1",
                gridRow: "span 1"
            };
            break;
    }

    return (
        <div className={styles.instagramItem} style={itemStyle}>
            <Image src={src} alt="Instagram Photo" layout="fill" objectFit="cover"/>
            <div className={styles.hover}>
                <Link href={href}>
                    <p>Lien</p>
                </Link>
            </div>
        </div>
    );
}
