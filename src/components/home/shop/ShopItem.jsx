import React from "react";

import Image from "next/image";

import Button from "@/components/ui/button/Button";

import styles from "@/components/home/shop/ShopItem.module.css";
import ROUTES from "@/constants/ROUTES";
import {useRouter} from "next/router";
import {htmlToText} from "html-to-text";

export default function ShopItem({id, imgSrc, articleName, articleDesc}) {

    const router = useRouter();

    // Fonction pour supprimer les URLs des balises <a> avant conversion
    const cleanHtml = (html) => {
        const cleanedHtml = html.replace(/<a [^>]*>(.*?)<\/a>/gi, "$1");
        const cleanImg = cleanedHtml.replace(/<img [^>]*>/gi, "");
        return cleanImg;
    };

    // Assurez-vous que le HTML est nettoyé avant de convertir
    const cleanedDescription = cleanHtml(articleDesc);

    const oeuvreDesc = cleanedDescription && htmlToText(cleanedDescription, {
        wordwrap: 250,
        ignoreHref: true, // Cette option pourrait être redondante maintenant
        ignoreImage: true
    });

    return (
        <div className={styles.shopItem}>
            <div className={styles.imgContainer}>
                <Image
                    src={imgSrc}
                    alt={`Photo du shop de l'article ${articleName}`}
                    fill
                />
            </div>
            <div className={styles.informations}>
                {
                    articleDesc ? (
                        <h5>{oeuvreDesc.length > 150 ? oeuvreDesc.slice(0, 150) + "..." : oeuvreDesc}</h5>
                    ) : (
                        <h5>Cette oeuvre n&apos;a pas de description</h5>
                    )
                }

                <Button
                    text={"Voir"}
                    onClick={() => router.push(ROUTES.OEUVRES.VIEW(id))}
                />
            </div>
            <div className={styles.bottom}>
                <h5>{articleName}</h5>
            </div>
        </div>
    )
}