import {useEffect, useState} from "react";
import {useOeuvres} from "@/hooks/useOeuvres";
import {useRouter} from "next/router";

import useUpdateOeuvre from "@/stores/useUpdateOeuvre";

import styles from './Index.module.scss';
import ROUTES from "@/constants/ROUTES";
import {Toast} from "@/constants/ToastConfig";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import sectionStyles from "@/components/dashboard/items/sections/DashboardSectionItem.module.scss";
import {BiGroup} from "react-icons/bi";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Skeleton from "@/components/ui/Skeleton";
import useArtistsStore from "@/stores/artistsStore";
import Button from "@/components/ui/button/Button";

export default function HomeOeuvreDashboardEditArtists() {

    const router = useRouter();

    const [artisteId, setArtisteId] = useState(null);
    const [oeuvreId, setOeuvreId] = useState(null);

    const {
        formData,
        updateFormData,
        resetFormData
    } = useUpdateOeuvre();

    const {
        artists,
        error: artistError,
        loading: artistLoading,
        reloadArtists,
    } = useArtistsStore();

    const {
        oeuvre,
        getOeuvreById,
        loading,
    } = useOeuvres();

    const selectedArtistsId = oeuvre && oeuvre.artists.map(artist => artist.id);

    const handleSubmit = async () => {

        if (formData.artists !== undefined || formData.unknowartists !== undefined) {

            const artistIdList = formData.artists && formData.artists.map(artist => artist.value);
            const artistUnknowNameList = formData.unknowartists && formData.unknowartists.map(artist => artist.value);

            const response = await fetch(ROUTES.API.OEUVRES.HOME, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: oeuvre.id,
                    artists: artistIdList,
                    unknowartists: artistUnknowNameList,
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
        reloadArtists();
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
                                sectionName={"Artistes"}
                                defaultOpen>
                                <div className={sectionStyles.specialSection}>
                                    <div className={sectionStyles.specialSectionHead}>
                                        <span>
                                            <BiGroup/>
                                        </span>
                                        <div>
                                            <p>Artiste(s) connu(s)</p>
                                        </div>
                                    </div>
                                    <Select
                                        placeholder={"Sélectionner un ou plusieurs artistes connus"}
                                        closeMenuOnSelect={false}
                                        defaultValue={artists && artists.filter(artist => selectedArtistsId.includes(artist.id)).map(artist => ({
                                            value: artist.id,
                                            label: `${artist.user.firstname} ${artist.user.lastname}${artist.pseudo ? ` (${artist.pseudo})` : ''}`,
                                        }))}
                                        noOptionsMessage={() => "Aucun artiste trouvé"}
                                        isMulti
                                        isLoading={artistLoading}
                                        options={
                                            artists && artists.map((artist) => {
                                                return {
                                                    value: artist.id,
                                                    label: `${artist.user.firstname} ${artist.user.lastname}${artist.pseudo ? ` (${artist.pseudo})` : ''}`,
                                                }
                                            })
                                        }
                                        name={"Artists"}
                                        onChange={(e) => updateFormData('artists', e)}
                                        value={formData.artists}
                                    />
                                </div>
                                <div className={sectionStyles.specialSection}>
                                    <div className={sectionStyles.specialSectionHead}>
                                        <span>
                                            <BiGroup/>
                                        </span>
                                        <div>
                                            <p>Artiste(s) inconnu(s)</p>
                                        </div>
                                    </div>
                                    <CreatableSelect
                                        placeholder={"Sélectionner un ou plusieurs artistes inconnus"}
                                        closeMenuOnSelect={false}
                                        defaultValue={[]}
                                        isMulti
                                        options={[
                                            {value: 'Mathieu', label: 'Mathieu'},
                                            {value: 'Jean', label: 'Jean'},
                                            {value: 'Pierre', label: 'Pierre'},
                                            {value: 'Paul', label: 'Paul'},
                                            {value: 'Jacques', label: 'Jacques'},
                                        ]}
                                        name={"UnknowArtistOeuvre"}
                                        onChange={(e) => updateFormData('unknowartists', e)}
                                        value={formData.unknowartists}
                                    />
                                </div>
                            </DashboardSectionItem>
                        </>
                    )
                }
            </div>
        </div>
    )

}