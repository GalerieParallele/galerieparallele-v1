import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardArtistesEditTuilesList from "@/components/dashboard/artistes/edit/DashboardArtistesEditTuilesList";
import ROUTES from "@/constants/ROUTES";
import styles from './Index.module.scss';
import PageLoader from "@/components/ui/PageLoader";
import useArtistsStore from "@/stores/artistsStore";

export default function DashboardArtisteEditIndex() {

    const router = useRouter();

    const [artisteId, setArtisteId] = useState(null);

    const {
        artist,
        getArtistById,
        loading
    } = useArtistsStore();

    useEffect(() => {

        const routerId = router.query.id;

        if (routerId && /^\d+$/.test(routerId)) {

            setArtisteId(parseInt(routerId));

        }

    }, [router, router.query.id]);

    /**
     * Permet de récupérer les informations de l'artiste
     */
    useEffect(() => {
        if (artisteId) {
            getArtistById(artisteId);
        }
    }, [artisteId, getArtistById])

    if (loading) {
        return <PageLoader/>;
    }

    return (
        <div className={styles.main}>
            <DashboardNavbar returnURL={ROUTES.ADMIN.ARTISTES.HOME}/>
            <div className={styles.content}>
                {
                    artist && artist.id && (
                        <DashboardArtistesEditTuilesList
                            artisteId={artist.id}
                        />
                    )
                }
            </div>
        </div>
    );
}
