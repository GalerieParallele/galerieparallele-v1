import React, {useEffect} from "react";

import styles from "@/components/home/shop/Shop.module.css"
import ShopItem from "@/components/home/shop/ShopItem";
import Button from "@/components/ui/button/Button";
import {useRouter} from "next/router";
import ROUTES from "@/constants/ROUTES";
import useOeuvresStore from "@/stores/oeuvresStore";

export default function Shop() {

    const router = useRouter();

    const {
        oeuvres,
        error,
        loading,
        reloadOeuvres
    } = useOeuvresStore();

    useEffect(() => {
        reloadOeuvres();
    }, [reloadOeuvres]);

    return (
        <div className={styles.shop}>

            <div className={styles.list}>
                {
                    loading ? (
                        <div>Chargement...</div>
                    ) : (
                        error ? (
                            <div>Erreur: {error}</div>
                        ) : (
                            oeuvres.length > 0 ? (
                                <>
                                    {
                                        oeuvres.map(oeuvre => {
                                            console.log(oeuvre)
                                            return (
                                                <ShopItem
                                                    key={oeuvre.id}
                                                    articleName={oeuvre.name}
                                                    imgSrc={oeuvre.images && oeuvre.images.length > 0 && oeuvre.images[0].mediaURL || "/assets/img/no-img.jpg"}
                                                />
                                            )

                                        })
                                    }
                                </>
                            ) : (
                                <div>Aucune oeuvre disponible</div>
                            )
                        )
                    )
                }
            </div>
            {
                oeuvres && oeuvres.length > 0 && (
                    <div className={styles.buttonSpace}>
                        <Button
                            text={"VOIR PLUS"}
                            onClick={() => router.push(ROUTES.OEUVRES.HOME)}
                        />
                    </div>
                )
            }
        </div>
    )
}