import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import useUpdateOeuvre from "@/stores/useUpdateOeuvre";

import styles from './Index.module.scss';
import {useOeuvres} from "@/hooks/useOeuvres";
import {Toast} from "@/constants/ToastConfig";
import ROUTES from "@/constants/ROUTES";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/button/Button";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import {AiOutlineFieldNumber} from "react-icons/ai";
import {FaChair, FaHandSparkles, FaSignature} from "react-icons/fa";
import {PiFrameCornersDuotone} from "react-icons/pi";

export default function HomeOeuvreDashboardEditInfoTech() {

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

        if (Object.values(formData.informations_techniques).some(value => value !== undefined)) {

            const response = await fetch(ROUTES.API.OEUVRES.HOME, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: oeuvre.id,
                    ...formData.informations_techniques
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
                                sectionName={"Informations techniques"}
                                defaultOpen={true}
                            >
                                <IconInput
                                    label={"Numérotation"}
                                    type={"number"}
                                    step={"1"}
                                    min={"1"}
                                    IconComponent={AiOutlineFieldNumber}
                                    placeholder={oeuvre && oeuvre.numerotation ? oeuvre.numerotation.toString() : "Ex: 5"}
                                    onChange={(e) => updateFormData('informations_techniques.numerotation', oeuvre.numerotation === parseInt(e.target.value) ? undefined : parseInt(e.target.value))}
                                    name={"numerotation"}
                                    value={formData.informations_techniques.numerotation}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Limitation"}
                                    type={"number"}
                                    step={"1"}
                                    min={"1"}
                                    IconComponent={AiOutlineFieldNumber}
                                    placeholder={oeuvre && oeuvre.limitation ? oeuvre.limitation.toString() : "Ex: 10"}
                                    onChange={(e) => updateFormData('informations_techniques.limitation', oeuvre.limitation === parseInt(e.target.value) ? undefined : parseInt(e.target.value))}
                                    name={"limitation"}
                                    value={formData.informations_techniques.limitation}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Support"}
                                    type={"text"}
                                    IconComponent={FaChair}
                                    placeholder={oeuvre && oeuvre.support ? oeuvre.support : "Ex: Toile"}
                                    onChange={(e) => updateFormData('informations_techniques.support', e.target.value === "" || e.target.value === oeuvre.support ? undefined : e.target.value)}
                                    name={"support"}
                                    value={formData.informations_techniques.support}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Technique"}
                                    type={"text"}
                                    IconComponent={FaHandSparkles}
                                    placeholder={oeuvre && oeuvre.technique ? oeuvre.technique : "Ex: Peinture à l'huile"}
                                    onChange={(e) => updateFormData('informations_techniques.technique', e.target.value === "" || e.target.value === oeuvre.technique ? undefined : e.target.value)}
                                    name={"technique"}
                                    value={formData.informations_techniques.technique}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Encadrement"}
                                    type={"text"}
                                    IconComponent={PiFrameCornersDuotone}
                                    placeholder={oeuvre && oeuvre.encadrement ? oeuvre.encadrement : "Ex: Cadre en bois"}
                                    onChange={(e) => updateFormData('informations_techniques.encadrement', e.target.value === "" || e.target.value === oeuvre.encadrement ? undefined : e.target.value)}
                                    name={"encadrement"}
                                    value={formData.informations_techniques.encadrement}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Signature"}
                                    type={"text"}
                                    IconComponent={FaSignature}
                                    placeholder={oeuvre && oeuvre.signature ? oeuvre.signature : "Ex: En bas à gauche"}
                                    onChange={(e) => updateFormData('informations_techniques.signature', e.target.value === "" || e.target.value === oeuvre.signature ? undefined : e.target.value)}
                                    name={"signature"}
                                    value={formData.informations_techniques.signature}
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