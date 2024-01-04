import styles from './Index.module.scss';
import DashboardNavbar from "../../components/dashboard/items/DashboardNavbar";
import DashboardTuilesList from "../../components/dashboard/home/DashboardTuilesList";

export default function DashboardIndex() {
    return (
        <div className={styles.main}>
            <DashboardNavbar/>
            <div className={styles.content}>
                <DashboardTuilesList/>
            </div>
        </div>
    )
}