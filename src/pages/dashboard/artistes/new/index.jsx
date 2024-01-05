import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";

import styles from './Index.module.scss';
export default function DashboardArtistesNewIndex() {

    return (
        <div className={styles.main}>
            <DashboardNavbar />
            <div className={styles.content}>
            <DashboardSectionItem
                sectionName={"Compte utilisateur"}
                required
                >

            </DashboardSectionItem>
            </div>
        </div>
    )

}