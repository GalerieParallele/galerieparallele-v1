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
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import MultiTypes from "@/components/ui/select/MultiTypes";
import sectionStyles from "@/components/dashboard/items/sections/DashboardSectionItem.module.scss";
import {FaHashtag} from "react-icons/fa";
import MultiTags from "@/components/ui/select/MultiTags";
import {CiCircleList} from "react-icons/ci";

export default function HomeOeuvreDashboardEditAutres() {

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

        if (formData.tags === undefined && formData.types === undefined) {
            Toast.fire({
                icon: 'error',
                title: "Vous n'avez pas modifié d'informations."
            });
        }

        let body = undefined;

        if (formData.tags !== undefined) {
            body = {
                tag: formData.tags.map(tag => tag),
            }
        }

        if (formData.types !== undefined) {
            body = {
                ...body,
                type: formData.types.map(type => type),
            }
        }

        const response = await fetch(ROUTES.API.OEUVRES.HOME, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: oeuvre.id,
                ...body,
            }),
        });
        console.log(body);
        console.log(response);
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

    }

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
                            <DashboardSectionItem
                                sectionName={"Autres"}
                                defaultOpen
                            >
                                {
                                    oeuvre && oeuvre.types && (
                                        <div className={sectionStyles.specialSection}>
                                            <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <CiCircleList/>
                                    </span>
                                                <div>
                                                    <p>Type(s) d&apos;oeuvre</p>
                                                </div>
                                            </div>
                                            <MultiTypes
                                                onChange={(e) => updateFormData('types', e)}
                                                defaultTypesSelected={oeuvre && oeuvre.types.map(type => type)}
                                            />
                                        </div>
                                    )
                                }
                                {
                                    oeuvre && oeuvre.tags && (
                                        <div className={sectionStyles.specialSection}>
                                            <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <FaHashtag/>
                                    </span>
                                                <div>
                                                    <p>Tags</p>
                                                </div>
                                            </div>
                                            <MultiTags
                                                onChange={(e) => updateFormData('tags', e)}
                                                defaultTagsSelected={oeuvre && oeuvre.tags.map(tag => tag)}
                                            />
                                        </div>
                                    )
                                }
                            </DashboardSectionItem>

                        </>
                    )
                }
            </div>
        </div>
    )

}