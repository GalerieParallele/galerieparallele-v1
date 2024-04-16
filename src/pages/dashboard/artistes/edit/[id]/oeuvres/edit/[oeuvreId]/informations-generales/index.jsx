import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import Button from "@/components/ui/button/Button";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import Editor from "@/components/ui/Editor";

import {FaEuroSign, FaExclamation} from "react-icons/fa";
import {MdDriveFileRenameOutline, MdOutlineDescription} from "react-icons/md";

import styles from './Index.module.scss';
import sectionStyles from "@/components/dashboard/items/sections/DashboardSectionItem.module.scss";
import useUpdateOeuvre from "@/stores/useUpdateOeuvre";
import {useOeuvres} from "@/hooks/useOeuvres";
import {Toast} from "@/constants/ToastConfig";
import Skeleton from "@/components/ui/Skeleton";

export default function HomeOeuvreDashboardEditInfoGen() {

    const router = useRouter();

    const [artisteId, setArtisteId] = useState(null);
    const [oeuvreId, setOeuvreId] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        formData,
        updateFormData,
        resetFormData
    } = useUpdateOeuvre();

    const {
        oeuvre,
        getOeuvreById,
        loading: oeuvreLoading,
    } = useOeuvres();


    const handleSubmit = async () => {

        if (Object.values(formData.informations_generales).some(value => value !== undefined)) {

            Object.values(formData.informations_generales).forEach(value => {
                value === "" ? value = undefined : value;
            });

            const response = await fetch(ROUTES.API.OEUVRES.HOME, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: oeuvre.id,
                    ...formData.informations_generales
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
    }

    useEffect(() => {
        resetFormData();

    }, [resetFormData]);

    // if touch ctrl + s submit form
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                handleSubmit();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    })

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
                    oeuvreLoading || loading || !oeuvre ? (
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
                                sectionName={"Informations générales"}
                            >
                                <IconInput
                                    label={"Nom de l'oeuvre"}
                                    type={"text"}
                                    IconComponent={MdDriveFileRenameOutline}
                                    placeholder={oeuvre && oeuvre.name ? oeuvre.name : "Ex: Mona lisa"}
                                    value={formData.informations_generales.name}
                                    name={"name"}
                                    onChange={(e) => updateFormData("informations_generales.name", e.target.value === "" || oeuvre.name ? undefined : e.target.value)}
                                    disabled={loading}
                                />
                                <div className={sectionStyles.specialSection}>
                                    <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <MdOutlineDescription/>
                                    </span>
                                        <p>Description</p>
                                    </div>
                                    <Editor
                                        defaultContent={oeuvre && oeuvre.description ? oeuvre.description : ""}
                                        onEditorChange={(content) => updateFormData("informations_generales.description", content === oeuvre.description ? undefined : content)}
                                    />
                                </div>
                                <div className={sectionStyles.specialSection}>
                                    <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <FaExclamation/>
                                    </span>
                                        <p>Anecdote</p>
                                    </div>
                                    <Editor
                                        onEditorChange={(content) => updateFormData("informations_generales.anecdote", content === oeuvre.anecdote ? undefined : content)}
                                        defaultContent={oeuvre && oeuvre.anecdote ? oeuvre.anecdote : ""}
                                    />
                                </div>
                                <IconInput
                                    label={"Prix"}
                                    step={"0.01"}
                                    type={"number"}
                                    IconComponent={FaEuroSign}
                                    placeholder={oeuvre && oeuvre.prix ? oeuvre.prix : "Ex: 1000"}
                                    onChange={(e) => updateFormData("informations_generales.prix", e.target.value === "" || parseFloat(e.target.value) === oeuvre.prix ? undefined : parseFloat(e.target.value))}
                                    name={"prix"}
                                    value={formData.informations_generales.prix}
                                    disabled={loading}
                                />
                            </DashboardSectionItem>
                        </>
                    )
                }
            </div>
        </div>
    )

}