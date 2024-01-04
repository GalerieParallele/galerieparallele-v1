import styles from './Index.module.scss';
import DashboardNavbar from "../../components/dashboard/items/DashboardNavbar";
import DashboardHomeTuilesList from "../../components/dashboard/home/DashboardHomeTuilesList";

export default function DashboardIndex() {
    return (
        <div className={styles.main}>
            <DashboardNavbar/>
            <div className={styles.content}>
                <DashboardHomeTuilesList/>
            </div>
        </div>
    )
}