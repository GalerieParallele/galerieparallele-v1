import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardArtistesEditTuilesList from "@/components/dashboard/artistes/edit/DashboardArtistesEditTuilesList";
import ROUTES from "@/constants/ROUTES";
import styles from './Index.module.scss';
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";

export default function DashboardArtisteNewIndex() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [param, setParam] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (router.query.id && /^\d+$/.test(router.query.id)) {
            setParam(router.query.id);
            setError(false);
        } else {
            setError(true);
        }
        setLoading(false);
    }, [router, router.query.id]);

    if (loading) {
        return <PageLoader/>;
    }

    if (error) {
        return <Error
            code={404}
            title={"Artiste introuvable"}
            message={"L'artiste avec l'identifiant \"" + router.query.id + "\" n'existe pas"}
        />;
    }

    return (
        <div className={styles.main}>
            <DashboardNavbar returnURL={ROUTES.ADMIN.ARTISTES.HOME}/>
            <p>{param}</p>
            <div className={styles.content}>
                <DashboardArtistesEditTuilesList/>
            </div>
        </div>
    );
}
