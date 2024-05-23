import styles from './Index.module.scss';
import StorageUtils from "@/utils/StorageUtils";
import Image from "next/image";
import Link from "next/link";

export default function DinersGaleriesIndex() {

    const handleGetImages = async () => {
        StorageUtils.listFiles("diners-galerie")
    };

    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <h1>Les Diners Galerie</h1>
            </div>
            <div className={styles.list}>
                <Link
                    href={"/diners-galerie/v1"}
                    className={styles.soireeItem}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={"https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/diners-galerie%2Fv1%2FDSC_6814.jpg?alt=media&token=32930f4a-ef30-43ae-a178-69dcf4ed5c5d"}
                            alt={"Photo des Diners Galeries"} width={1000} height={1000}/>
                        <div className={styles.content}>
                            <h3>Soirée 1</h3>
                            <h4>Le 18/04/2024</h4>
                        </div>
                    </div>
                </Link>
                <Link
                    href={"/diners-galerie/v2"}
                    className={styles.soireeItem}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={"https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/diners-galerie%2Fv2%2FIMG_5658.jpg?alt=media&token=0d3130c6-f224-4d0c-898b-d19b63d38614"}
                            alt={"Photo des Diners Galeries"} width={1000} height={1000}/>
                        <div className={styles.content}>
                            <h3>Soirée 2</h3>
                            <h4>Le 16/05/2024</h4>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )

}