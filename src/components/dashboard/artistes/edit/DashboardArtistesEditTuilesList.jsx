import DashboardTuiles from "@/components/dashboard/items/DashboardTuiles";
import {FaFileContract, FaImage, FaPaintBrush, FaQuestion, FaTrophy, FaUser} from "react-icons/fa";
import {GoLaw} from "react-icons/go";
import {BsCalendarDate} from "react-icons/bs";
import ROUTES from "@/constants/ROUTES";
import {MdWavingHand} from "react-icons/md";

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
                to={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.HOME(artisteId)}
            />
            {/*<DashboardTuiles*/}
            {/*    IconComponent={FaFileContract}*/}
            {/*    name={"Relations contractuelles"}*/}
            {/*    to={ROUTES.ADMIN.ARTISTES.EDIT.CONTRATS(artisteId)}*/}
            {/*/>*/}
            {/*<DashboardTuiles*/}
            {/*    IconComponent={FaImage}*/}
            {/*    name={"Illustrations"}*/}
            {/*    to={ROUTES.ADMIN.ARTISTES.EDIT.ILLUSTRATIONS(artisteId)}*/}
            {/*/>*/}
            {/*<DashboardTuiles*/}
            {/*    IconComponent={FaQuestion}*/}
            {/*    name={"Portrait chinois"}*/}
            {/*    to={ROUTES.ADMIN.ARTISTES.EDIT.PORTRAIT_CHINOIS(artisteId)}*/}
            {/*/>*/}
            {/*<DashboardTuiles*/}
            {/*    IconComponent={BsCalendarDate}*/}
            {/*    name={"SaveTheDate"}*/}
            {/*    to={ROUTES.ADMIN.ARTISTES.EDIT.SAVETHEDATE(artisteId)}*/}
            {/*/>*/}
            {/*<DashboardTuiles*/}
            {/*    IconComponent={FaTrophy}*/}
            {/*    name={"Récompenses"}*/}
            {/*    to={'#'}*/}
            {/*/>*/}
            {/*<DashboardTuiles*/}
            {/*    IconComponent={MdWavingHand}*/}
            {/*    name={"Expositions"}*/}
            {/*    to={'#'}*/}
            {/*/>*/}
        </>
    )
}