import Image from "next/image";

import styles from './DashboardArtisteEditOeuvreCard.module.scss';
import {MdDelete, MdEdit} from "react-icons/md";

import {FaEye} from "react-icons/fa";
import ROUTES from "@/constants/ROUTES";
import Link from "next/link";
import {Toast} from "@/constants/ToastConfig";
import Swal from "sweetalert2";

export default function DashboardArtisteEditOeuvreCard({oeuvre, artist, onDelete}) {

    const handleConfirmModal = async () => {
        await Swal.fire({
            title: 'Êtes-vous sûr(e) de vouloir supprimer cette oeuvre ?',
            text: "Cette action est irréversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--red)',
            cancelButtonColor: 'var(--black)',
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleDelete();
                onDelete();
            }
        })
    }


    const handleDelete = async () => {

        const response = await fetch(ROUTES.API.OEUVRES.HOME, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: oeuvre.id
            })
        })

        if (response.ok) {
            Toast.fire({
                icon: 'success',
                title: 'Oeuvre supprimée avec succès'
            })
            onDelete();
            return;
        }

        Toast.fire({
            icon: 'error',
            title: 'Une erreur est survenue lors de la suppression de l\'oeuvre'
        })

    }

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
                            href={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artist.id, oeuvre.id)}
                            className={styles.edit}
                        >
                            <MdEdit/>
                        </Link>
                        <button
                            className={styles.delete}
                            onClick={handleConfirmModal}
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
