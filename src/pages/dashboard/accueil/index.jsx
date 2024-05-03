import styles from './Index.module.scss';
import {useRouter} from "next/router";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import ROUTES from "@/constants/ROUTES";
import {FaHome} from "react-icons/fa";
import DashboardTuiles from "@/components/dashboard/items/DashboardTuiles";

export default function DashboardAccueilIndex() {
    const router = useRouter();

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.HOME}
            />
            <div className={styles.content}>
                <DashboardTuiles
                    name={"Actualités"}
                    IconComponent={FaHome}
                    to={ROUTES.ADMIN.ACCUEIL.ACTUALITY.HOME}
                />
            </div>
        </div>
    )
}