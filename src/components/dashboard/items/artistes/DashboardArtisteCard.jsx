import Image from "next/image";

import styles from './DashboardArtisteCard.module.scss';
import Button from "@/components/ui/button/Button";
import {MdDelete, MdEdit} from "react-icons/md";
import {useRouter} from "next/router";
import ROUTES from "@/constants/ROUTES";
import Link from "next/link";
import {Toast} from "@/constants/ToastConfig";
import Swal from "sweetalert2";
import useArtistsStore from "@/stores/artistsStore";
import {BsQrCodeScan} from "react-icons/bs";

export default function DashboardArtisteCard({artiste}) {

    const router = useRouter();

    const {
        removeArtistById,
    } = useArtistsStore();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(ROUTES.API.ARTISTES.HOME, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id})
            });
            if (!response.ok) {
                throw new Error('Échec de la suppression de l’artiste');
            }
            Toast.fire({
                icon: 'success',
                title: 'Artiste supprimé'
            });
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            Toast.fire({
                icon: 'error',
                title: 'Erreur lors de la suppression de l’artiste'
            });
        }
    }


    const handleConfirmModal = async (id) => {
        await Swal.fire({
            title: 'Êtes-vous sûr(e) de vouloir supprimer cet artiste ?',
            text: "Cette action est irréversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--red)',
            cancelButtonColor: 'var(--black)',
            confirmButtonText: 'Supprimer',
            cancelButtonText: 'Annuler'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleDelete(id);
                removeArtistById(id);
            }
        })
    }

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
                    <button
                        className={styles.buttonDelete}
                        onClick={() => handleConfirmModal(artiste.id)}
                    >
                        <MdDelete/>
                    </button>
                    <Link
                        className={styles.qrcode}
                        href={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ROUTES.ARTISTES.PROFIL(artiste.id)}`}>
                        <BsQrCodeScan/>
                    </Link>
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