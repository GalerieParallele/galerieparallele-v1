import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";

import styles from './Index.module.scss';

export default function DashboardAccueilActualityIndex() {

    const router = useRouter();

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.HOME}
            />
        </div>
    )
}