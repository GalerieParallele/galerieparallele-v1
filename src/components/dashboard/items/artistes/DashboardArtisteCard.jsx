import Image from "next/image";

import styles from './DashboardArtisteCard.module.scss';
import Button from "@/components/items/button/Button";
import {MdDelete, MdEdit} from "react-icons/md";
import {useRouter} from "next/router";
import ROUTES from "@/constants/ROUTES";
import Link from "next/link";

export default function DashboardArtisteCard({artiste}) {

    const router = useRouter();

    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image
                        src={artiste.user.avatarURL ? artiste.user.avatarURL : "/assets/img/avatar.png"}
                        alt={"Photo test de levalet"}
                        width={763}
                        height={558}
                    />
                </div>
                <div className={styles.buttonsSpace}>
                    <button
                        onClick={() => router.push(ROUTES.ADMIN.ARTISTES.EDIT.HOME(artiste.id))}
                        className={styles.buttonEdit}>
                        <MdEdit/>
                    </button>
                    <button className={styles.buttonDelete}>
                        <MdDelete/>
                    </button>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.content}>
                    <h2>{artiste.pseudo ? artiste.pseudo : (artiste.user.lastname + " " + artiste.user.firstname)}</h2>
                    <Link
                        href={ROUTES.ARTISTES.PROFIL(artiste.id)}
                        target={"_blank"}
                    >
                        <Button
                            type={"button"}
                            text={"Afficher"}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}