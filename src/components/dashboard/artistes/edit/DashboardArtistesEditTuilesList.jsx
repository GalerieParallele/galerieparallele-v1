import DashboardTuiles from "@/components/dashboard/items/DashboardTuiles";
import {FaFileContract, FaImage, FaPaintBrush, FaUser} from "react-icons/fa";
import {GoLaw} from "react-icons/go";
import {BsCalendarDate} from "react-icons/bs";

export default function DashboardArtistesEditTuilesList() {
    return (
        <>
            <DashboardTuiles
                IconComponent={FaUser}
                name={"Informations utilisateur"}
                to={"#"}
            />
            <DashboardTuiles
                IconComponent={FaPaintBrush}
                name={"Oeuvres"}
                to={"#"}
            />
            <DashboardTuiles
                IconComponent={GoLaw}
                name={"Juridique"}
                to={"#"}
            />
            <DashboardTuiles
                IconComponent={FaFileContract}
                name={"Relations contractuelles"}
                to={"#"}
            />
            <DashboardTuiles
                IconComponent={FaImage}
                name={"Illustrations"}
                to={"#"}
            />
            <DashboardTuiles
                IconComponent={BsCalendarDate}
                name={"SaveTheDate"}
                to={"#"}
            />
        </>
    )
}