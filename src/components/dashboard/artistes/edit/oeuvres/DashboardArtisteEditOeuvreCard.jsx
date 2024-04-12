import Image from "next/image";

import styles from './DashboardArtisteEditOeuvreCard.module.scss';
import {MdDelete, MdEdit} from "react-icons/md";

import {FaEye} from "react-icons/fa";
import ROUTES from "@/constants/ROUTES";
import Link from "next/link";
import {ar} from "@faker-js/faker";

export default function DashboardArtisteEditOeuvreCard({oeuvre, artist}) {

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <Image
                        src={oeuvre && oeuvre.images.length > 0 && oeuvre.images[0].url || "/assets/img/no-img.jpg"}
                        alt={"Oeuvre"}
                        width={200}
                        height={300}
                    />
                    <div className={styles.oeuvreActions}>
                        <Link
                            href={ROUTES.OEUVRES.VIEW(oeuvre.id)}
                            target={"_blank"}
                            className={styles.show}
                        >
                            <FaEye/>
                        </Link>
                        <Link
                            href={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRE_EDIT(artist.id, oeuvre.id)}
                            className={styles.edit}
                        >
                            <MdEdit/>
                        </Link>
                        <button
                            className={styles.delete}
                        >
                            <MdDelete/>
                        </button>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.oeuvreName}>
                        <div>
                            <h4>{oeuvre.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
