import DashboardTuiles from "@/components/dashboard/items/DashboardTuiles";
import {IoIosMan} from "react-icons/io";
import ROUTES from "@/constants/ROUTES";
import {FaPaintBrush} from "react-icons/fa";
import styles from "@/pages/dashboard/artistes/Index.module.scss";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";

export default function DashboardIndexOeuvres() {
    return (

        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.HOME}
            />
            <DashboardTuiles
                name={"A la une"}
                IconComponent={IoIosMan}
                to={"#"}
            />
            <DashboardTuiles
                name={"Liste oeuvre à la une "}
                IconComponent={FaPaintBrush}
                to={"#"}
            />
        </div>

    )
}