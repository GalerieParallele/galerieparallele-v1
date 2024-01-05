import DashboardTuiles from "@/components/dashboard/items/DashboardTuiles";
import {FaFileContract, FaImage, FaPaintBrush, FaUser} from "react-icons/fa";
import {GoLaw} from "react-icons/go";
import {BsCalendarDate} from "react-icons/bs";
import ROUTES from "@/constants/ROUTES";

export default function DashboardArtistesEditTuilesList({artisteId}) {
    return (
        <>
            <DashboardTuiles
                IconComponent={FaUser}
                name={"Informations utilisateur & artiste"}
                to={ROUTES.ADMIN.ARTISTES.EDIT.INFORMATIONS(artisteId)}
            />
            <DashboardTuiles
                IconComponent={FaPaintBrush}
                name={"Oeuvres"}
                to={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES(artisteId)}
            />
            <DashboardTuiles
                IconComponent={GoLaw}
                name={"Juridique"}
                to={ROUTES.ADMIN.ARTISTES.EDIT.LEGAL(artisteId)}
            />
            <DashboardTuiles
                IconComponent={FaFileContract}
                name={"Relations contractuelles"}
                to={ROUTES.ADMIN.ARTISTES.EDIT.CONTRATS(artisteId)}
            />
            <DashboardTuiles
                IconComponent={FaImage}
                name={"Illustrations"}
                to={ROUTES.ADMIN.ARTISTES.EDIT.ILLUSTRATIONS(artisteId)}
            />
            <DashboardTuiles
                IconComponent={BsCalendarDate}
                name={"SaveTheDate"}
                to={ROUTES.ADMIN.ARTISTES.EDIT.SAVETHEDATE(artisteId)}
            />
        </>
    )
}