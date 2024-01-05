import styles from './Index.module.scss';
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";
import ROUTES from "@/constants/ROUTES";

export default function DashboardArtisteEditInformations() {

    const router = useRouter();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [artisteId, setArtisteId] = useState(null);

    useEffect(() => {
        if (router.query.id && /^\d+$/.test(router.query.id)) {
            setArtisteId(router.query.id);
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
            <DashboardNavbar
            returnURL={ROUTES.ADMIN.ARTISTES.EDIT.HOME(artisteId)}
            />
        </div>
    )
}