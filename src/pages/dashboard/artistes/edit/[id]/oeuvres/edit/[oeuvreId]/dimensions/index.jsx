import styles from './Index.module.scss';
import ROUTES from "@/constants/ROUTES";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import useUpdateOeuvre from "@/stores/useUpdateOeuvre";
import {useOeuvres} from "@/hooks/useOeuvres";
import {Toast} from "@/constants/ToastConfig";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import {FaRulerCombined, FaRulerHorizontal, FaRulerVertical} from "react-icons/fa";
import sectionStyles from "@/components/dashboard/items/sections/DashboardSectionItem.module.scss";
import {TbNavigationNorth} from "react-icons/tb";
import Select from "react-select";
import Button from "@/components/ui/button/Button";

export default function HomeOeuvreDashboardEditDimensions() {

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

        if (Object.values(formData.dimensions).some(value => value !== undefined)) {

            const response = await fetch(ROUTES.API.OEUVRES.HOME, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: oeuvre.id,
                    ...formData.dimensions,
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

    const orientationOptions = [
        { value: 'PORTRAIT', label: 'Portrait' },
        { value: 'PAYSAGE', label: 'Paysage' },
        { value: 'CARRE', label: 'Carré' },
    ];

    const defaultOrientationOption = oeuvre && orientationOptions.find(option => option.value === oeuvre.orientation);

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artisteId, oeuvreId)}
            />
            <div className={styles.content}>
                {
                    loading || !oeuvre ? (
                        <>
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
                                sectionName={"Dimensions"}
                                defaultOpen
                            >
                                <IconInput
                                    label={"Hauteur (cm)"}
                                    type={"number"}
                                    step={"0.01"}
                                    IconComponent={FaRulerVertical}
                                    placeholder={oeuvre.hauteur || "Ex: 120"}
                                    onChange={(e) => updateFormData('dimensions.hauteur', parseFloat(e.target.value) === oeuvre.hauteur ? undefined : parseFloat(e.target.value))}
                                    name={"hauteur"}
                                    value={formData.dimensions.hauteur}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Longueur (cm)"}
                                    type={"number"}
                                    step={"0.01"}
                                    IconComponent={FaRulerHorizontal}
                                    placeholder={oeuvre.longueur || "Ex: 80"}
                                    onChange={(e) => updateFormData('dimensions.longueur', parseFloat(e.target.value) === oeuvre.longueur ? undefined : parseFloat(e.target.value))}
                                    name={"longueur"}
                                    value={formData.dimensions.longueur}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Profondeur (cm)"}
                                    type={"number"}
                                    step={"0.01"}
                                    IconComponent={FaRulerCombined}
                                    placeholder={oeuvre.profondeur || "Ex: 5"}
                                    onChange={(e) => updateFormData('dimensions.profondeur', parseFloat(e.target.value) === oeuvre.profondeur ? undefined : parseFloat(e.target.value))}
                                    name={"profondeur"}
                                    value={formData.dimensions.profondeur}
                                    disabled={loading}
                                />
                                {
                                    oeuvre && oeuvre.orientation && (
                                        <div className={sectionStyles.specialSection}>
                                            <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <TbNavigationNorth/>
                                    </span>
                                                <p>
                                                    Orientation
                                                </p>
                                            </div>
                                            <Select
                                                placeholder={"Sélectionner une orientation"}
                                                closeMenuOnSelect={true}
                                                isMulti={false}
                                                options={orientationOptions}
                                                onChange={(selectedOption) => updateFormData('dimensions.orientation', selectedOption.value)}
                                                value={formData.dimensions.orientation ? orientationOptions.find(option => option.value === formData.dimensions.orientation) : defaultOrientationOption}
                                                noOptionsMessage={() => "Aucune orientation trouvée"}
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