import styles from './Index.module.scss';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import useUpdateOeuvre from "@/stores/useUpdateOeuvre";
import {useOeuvres} from "@/hooks/useOeuvres";
import ROUTES from "@/constants/ROUTES";
import {Toast} from "@/constants/ToastConfig";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/button/Button";
import MultiColors from "@/components/ui/select/MultiColors";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";

export default function HomeOeuvreDashboardEditColors() {

    const router = useRouter();

    const [artisteId, setArtisteId] = useState(null);
    const [oeuvreId, setOeuvreId] = useState(null);

    const {
        formData,
        updateFormData,
        resetFormData
    } = useUpdateOeuvre();

    const {
        oeuvre,
        getOeuvreById,
        loading,
    } = useOeuvres();

    const handleSubmit = async () => {

        if (formData.couleurs !== undefined) {

            const couleurs = formData.couleurs.map(couleur => {
                return {
                    hexa: couleur,
                }
            });

            const response = await fetch(ROUTES.API.OEUVRES.HOME, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: oeuvre.id,
                    couleurs,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Toast.fire({
                    icon: 'error',
                    title: `Erreur lors de la modification de l'oeuvre: ${data.message}`
                });
                return;
            }

            Toast.fire({
                icon: 'success',
                title: "L'oeuvre a bien été modifiée."
            });

            router.push(ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artisteId, oeuvreId));

        } else {
            Toast.fire({
                icon: 'error',
                title: "Vous n'avez pas modifié d'informations."
            });
        }

    };

    useEffect(() => {
        resetFormData();
    }, [resetFormData]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                handleSubmit();
            }

            if (e.ctrlKey && e.key === 'Escape') router.push(ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artisteId, oeuvreId));
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });

    useEffect(() => {
        if (router.isReady) {
            setArtisteId(router.query.id);
            setOeuvreId(router.query.oeuvreId);
        }
    }, [router, router.isReady]);

    useEffect(() => {
        if (oeuvreId)
            getOeuvreById(oeuvreId)
                .catch(() => {
                    Toast.fire({
                        icon: 'error',
                        title: "Une erreur est survenue lors de la récupération de l'oeuvre."
                    });
                });
    }, [oeuvreId])

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artisteId, oeuvreId)}
            />
            <div className={styles.content}>
                {
                    loading || !oeuvre ? (
                        <>
                            <div className={styles.topSpace}>
                                <div style={{
                                    width: '120px',
                                    height: '40px',
                                }}>
                                    <Skeleton/>
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '70px',
                                    }}
                                >
                                    <Skeleton/>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.topSpace}>
                                <Button
                                    text={"Enregistrer"}
                                    type={"submit"}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    isLoading={loading}
                                />
                            </div>
                            {
                                oeuvre && oeuvre.couleurs && (
                                    <DashboardSectionItem
                                        sectionName={"Couleur(s)"}
                                        defaultOpen
                                    >
                                        <MultiColors
                                            onChange={(e) => {
                                                updateFormData('couleurs', e)
                                            }}
                                            defaultHexaSelected={oeuvre && oeuvre.couleurs.map(couleur => couleur.hexa)}
                                        />
                                    </DashboardSectionItem>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )

}