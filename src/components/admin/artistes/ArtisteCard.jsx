import Image from "next/image";

import styles from './ArtisteCard.module.scss';
import {FaTrashCan} from "react-icons/fa6";
import {MdModeEditOutline} from "react-icons/md";
import Swal from "sweetalert2";
import ROUTES from "@/constants/ROUTES";
import {Toast} from "@/constants/ToastConfig";
import {useRouter} from "next/router";

const noimg = "/assets/img/no-img.jpg";

export default function ArtisteCard({artiste, onDeleteSuccess}) {

    const router = useRouter();

    console.log(artiste);

    const handleDelete = () => {
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cet artiste ?',
            showCancelButton: true,
            confirmButtonText: 'Supprimer',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Annuler',
        }).then(async (result) => {
            if (result.isConfirmed) {

                const response = await fetch(ROUTES.API.ARTISTES.HOME, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: artiste.id})
                });

                if (response.ok) {
                    Toast.fire({
                        icon: 'success',
                        title: 'Artiste supprimé'
                    })
                    onDeleteSuccess(artiste.id);
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Une erreur est survenue lors de la suppression de l\'artiste'
                    })
                }
            }
        })
    }

    const handleEdit = () => {
        const path = ROUTES.ADMIN.ARTISTES.EDIT.HOME(artiste.id);
        return router.push(path);
    }

    const displayname = artiste.pseudo ? artiste.pseudo : artiste.user.lastname + " " + artiste.user.firstname;

    return (
        <div className={styles.main}>
            <div>
                <div className={styles.imgContainer}>
                    <Image
                        src={artiste.user.avatarURL || noimg}
                        alt={"Photo de " + displayname}
                        width={300}
                        height={300}
                    />
                </div>
            </div>
            <div>
                <h3>{displayname}</h3>
            </div>
            <div className={styles.actionsButtons}>
                <button
                    onClick={handleEdit}
                    className={styles.edit}>
                    <MdModeEditOutline/>
                </button>
                <button
                    onClick={handleDelete}
                    className={styles.delete}>
                    <FaTrashCan/>
                </button>
            </div>
        </div>
    );
}