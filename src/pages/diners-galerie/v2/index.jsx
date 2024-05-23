import {useEffect, useState} from "react";
import StorageUtils from "@/utils/StorageUtils";
import Image from "next/image";
import Link from "next/link";

import styles from '../SpecificSoiree.module.scss';
import Button from "@/components/ui/button/Button";
import {useRouter} from "next/router";
import Skeleton from "@/components/ui/Skeleton";
import LittleSpinner from "@/components/ui/LittleSpinner";

export default function DinersGalerieV1() {

    const router = useRouter();

    const [imagesLinks, setImagesLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        StorageUtils.listFiles("diners-galerie/v2").then(async files => {
            const urls = [];
            for (const file of files) {
                const url = await StorageUtils.getFileURL(file.fullPath);
                urls.push(url);
            }
            setImagesLinks(urls);
            setLoading(false);
        });
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <Button
                    onClick={() => router.back()}
                    text={"Retour"}
                    isWhite
                />
                <h1>Les Diners Galerie</h1>
                <h3>Soirée 2 - 16/05/2024</h3>

            </div>
            <div className={styles.list}>
                {
                    loading && Array.from({length: 150}).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: "400px",
                                height: "250px",

                            }}
                        >
                            <Skeleton/>
                        </div>
                    ))
                }
                {
                    imagesLinks.map((link, index) => (
                        <Link
                            href={link}
                            key={index}
                            target={"_blank"}
                        >
                            <div className={styles.imgContainer}>
                                <Image
                                    src={link}
                                    alt="Photo des Diners Galeries"
                                    fill
                                />
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}
