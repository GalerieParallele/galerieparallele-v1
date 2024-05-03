import DashboardTuiles from "../items/DashboardTuiles";

import {IoIosMan} from "react-icons/io";
import {FaHome, FaPaintBrush} from "react-icons/fa";
import ROUTES from "@/constants/ROUTES";

export default function DashboardHomeTuilesList() {
    return (
        <>
            <DashboardTuiles
                name={"Page d'accueuil"}
                IconComponent={FaHome}
                to={ROUTES.ADMIN.ACCUEIL.ACTUALITY.HOME}
            />
            <DashboardTuiles
                name={"Artistes"}
                IconComponent={IoIosMan}
                to={ROUTES.ADMIN.ARTISTES.HOME}
            />
            {/*<DashboardTuiles*/}
            {/*    name={"Oeuvres"}*/}
            {/*    IconComponent={FaPaintBrush}*/}
            {/*    to={"#"}*/}
            {/*/>*/}
        </>
    )
}