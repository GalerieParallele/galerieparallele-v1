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

export default function HomeOeuvreDashboardEditInfoGen() {

    const router = useRouter();

    const artisteId = router.query.id;
    const oeuvreId = router.query.oeuvreId;

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


    const [loading, setLoading] = useState(true);

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
        setLoading(false);

    }, [resetFormData])

    useEffect(() => {
        getOeuvreById(oeuvreId);
    }, [])

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.EDIT(artisteId, oeuvreId)}/>
            <div className={styles.content}>
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
                    required
                >
                    <IconInput
                        label={"Nom de l'oeuvre"}
                        type={"text"}
                        IconComponent={MdDriveFileRenameOutline}
                        placeholder={oeuvre && oeuvre.name ? oeuvre.name : "Ex: Mona lisa"}
                        value={formData.informations_generales.name}
                        name={"name"}
                        onChange={(e) => updateFormData("informations_generales.name", e.target.value)}
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
                            onEditorChange={(content) => updateFormData("informations_generales.description", content)}
                            defaultContent={oeuvre && oeuvre.description ? oeuvre.description : ""}
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
                            onEditorChange={(content) => updateFormData("informations_generales.anecdote", content)}
                            defaultContent={oeuvre && oeuvre.anecdote ? oeuvre.anecdote : ""}
                        />
                    </div>
                    <IconInput
                        label={"Prix"}
                        step={"0.01"}
                        type={"number"}
                        IconComponent={FaEuroSign}
                        placeholder={oeuvre && oeuvre.prix ? oeuvre.prix : "Ex: 1000"}
                        // onChange={}
                        name={"prix"}
                        value={formData.informations_generales.prix}
                        disabled={loading}
                        required
                    />
                </DashboardSectionItem>
            </div>
        </div>
    )

}