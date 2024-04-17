import {useRouter} from "next/router";
import ROUTES from "@/constants/ROUTES";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardTuiles from "@/components/dashboard/items/DashboardTuiles";

import styles from './Index.module.scss';
import {IoIosResize, IoMdColorPalette} from "react-icons/io";
import {FaInfoCircle} from "react-icons/fa";
import {IoHammer} from "react-icons/io5";
import {useEffect, useState} from "react";
import {useOeuvres} from "@/hooks/useOeuvres";
import {Toast} from "@/constants/ToastConfig";
import useArtistsStore from "@/stores/artistsStore";
import Skeleton from "@/components/ui/Skeleton";

export default function DashboardArtisteOeuvreEdit() {

    const router = useRouter();

    const [artisteId, setArtisteId] = useState(null);
    const [oeuvreId, setOeuvreId] = useState(null);

    const {
        oeuvre,
        getOeuvreById,
        loading: loadingOeuvre,
        error: errorOeuvre
    } = useOeuvres();

    const {
        artist,
        loading: loadingArtist,
        error: errorArtist,
        getArtistById
    } = useArtistsStore();

    useEffect(() => {
        const handleKeyDown = (e) => {
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

        if (artisteId)
            getArtistById(artisteId)
                .catch(() => {
                    Toast.fire({
                        icon: 'error',
                        title: "Une erreur est survenue lors de la récupération de l'artiste."
                    });
                });
    }, [oeuvreId])

    return (
        <div>
            <DashboardNavbar returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.HOME(router.query.id)}/>
            <div className={styles.main}>
                {
                    loadingArtist || loadingOeuvre || !artist || !oeuvre ? (
                        <>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}>
                                {
                                    errorArtist && (
                                        <div style={{
                                            width: 'fit-content',
                                            height: '100px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'var(--light-red)',
                                            color: 'var(--white)',
                                            borderRadius: 'var(--border-radius)',
                                            padding: '3rem',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',

                                        }}>
                                            <p>Impossible de charger les données de l&apos;artiste</p>
                                        </div>
                                    )
                                }
                                {
                                    errorOeuvre && (
                                        <div style={{
                                            width: 'fit-content',
                                            height: '100px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'var(--light-red)',
                                            color: 'var(--white)',
                                            borderRadius: 'var(--border-radius)',
                                            padding: '3rem',
                                            textTransform: 'uppercase',
                                            fontWeight: 'bold',

                                        }}>
                                            <p>Impossible de charger les données de l&apos;oeuvre</p>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                !errorArtist && !errorOeuvre && (
                                    Array(4).fill(0).map((_, index) => {
                                        return (
                                            <div
                                                key={index}
                                                style={{
                                                    width: '300px',
                                                    height: '120px',
                                                }}>
                                                <Skeleton/>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </>
                    ) : (
                        <>
                            <DashboardTuiles
                                IconComponent={FaInfoCircle}
                                name={"Informations générales"}
                                to={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.INFO_GEN(artist.id, oeuvre.id)}
                            />
                            <DashboardTuiles
                                IconComponent={IoHammer}
                                name={"Informations techniques"}
                                to={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.INFO_TECH(artist.id, oeuvre.id)}
                            />
                            {/*<DashboardTuiles*/}
                            {/*    IconComponent={FaImage}*/}
                            {/*    name={"Images"}*/}
                            {/*    to={"#"}*/}
                            {/*/>*/}
                            <DashboardTuiles
                                IconComponent={IoMdColorPalette}
                                name={"Couleurs"}
                                to={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.COLORS(artist.id, oeuvre.id)}
                            />
                            {/*<DashboardTuiles*/}
                            {/*    IconComponent={FaUser}*/}
                            {/*    name={"Artistes"}*/}
                            {/*    to={"#"}*/}
                            {/*/>*/}
                            <DashboardTuiles
                                IconComponent={IoIosResize}
                                name={"Dimensions"}
                                to={"#"}
                            />
                            {/*<DashboardTuiles*/}
                            {/*    IconComponent={LuPlus}*/}
                            {/*    name={"Autres"}*/}
                            {/*    to={"#"}*/}
                            {/*/>*/}
                        </>
                    )
                }
            </div>
        </div>
    )
}