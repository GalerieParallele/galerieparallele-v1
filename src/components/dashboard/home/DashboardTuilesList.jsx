import DashboardTuiles from "../items/DashboardTuiles";

import {IoIosMan} from "react-icons/io";
import {FaPaintBrush} from "react-icons/fa";

export default function DashboardTuilesList() {
    return (
        <>
            <DashboardTuiles
                name={"Artistes"}
                IconComponent={IoIosMan}
                to={"#"}
            />
            <DashboardTuiles
                name={"Oeuvres"}
                IconComponent={FaPaintBrush}
                to={"#"}
            />
        </>
    )
}