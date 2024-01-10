import styles from './Index.module.scss';
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import ROUTES from "@/constants/ROUTES";
import {useEffect, useState} from "react";
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";
import {useRouter} from "next/router";
import DashboardArtisteEditContratsDropzone
    from "@/components/dashboard/artistes/edit/contrats/DashboardArtisteEditContratsDropzone";
import DashboardArtisteEditContratItem
    from "@/components/dashboard/artistes/edit/contrats/DashboardArtisteEditContratItem";
import {FcFolder} from "react-icons/fc";
import {FaFolderPlus} from "react-icons/fa";

export default function DashboardArtisteEditContrats() {

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
            <div className={styles.content}>
                <DashboardArtisteEditContratsDropzone/>
                <div className={styles.buttonFolder}>
                    <FaFolderPlus/>
                    <p>Ajouter un dossier</p>
                </div>
                <div className={styles.filesFoldersList}>
                    <DashboardArtisteEditContratItem
                        name={"Dossier 1"}
                        folder
                    />
                    <DashboardArtisteEditContratItem
                        name={"Dossier 2"}
                        folder
                    />
                    <DashboardArtisteEditContratItem
                        name={"Dossier 3"}
                        folder
                    />
                    <DashboardArtisteEditContratItem
                        name={"Dossier 4"}
                        folder
                    />
                    <DashboardArtisteEditContratItem
                        name={"Fichier 1"}
                    />
                    <DashboardArtisteEditContratItem
                        name={"Fichier 2"}
                    />
                    <DashboardArtisteEditContratItem
                        name={"Fichier 3"}
                    />
                </div>
            </div>
        </div>
    )
}