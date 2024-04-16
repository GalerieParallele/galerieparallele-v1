import {useRouter} from "next/router";
import ROUTES from "@/constants/ROUTES";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import DashboardTuiles from "@/components/dashboard/items/DashboardTuiles";

import styles from './Index.module.scss';
import {IoIosResize, IoMdColorPalette} from "react-icons/io";
import {FaImage, FaInfoCircle, FaUser} from "react-icons/fa";
import {LuPlus} from "react-icons/lu";
import {IoHammer} from "react-icons/io5";

export default function DashboardArtisteOeuvreEdit() {

    const router = useRouter();

    const artisteId = router.query.id;
    const oeuvreId = router.query.oeuvreId;

    return (
        <div>
            <DashboardNavbar returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.HOME(router.query.id)}/>
            <div className={styles.main}>
                <DashboardTuiles
                    IconComponent={FaInfoCircle}
                    name={"Informations générales"}
                    to={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.INFO_GEN(artisteId, oeuvreId)}
                />
                {/*<DashboardTuiles*/}
                {/*    IconComponent={IoHammer}*/}
                {/*    name={"Informations techniques"}*/}
                {/*    to={"#"}*/}
                {/*/>*/}
                {/*<DashboardTuiles*/}
                {/*    IconComponent={FaImage}*/}
                {/*    name={"Images"}*/}
                {/*    to={"#"}*/}
                {/*/>*/}
                {/*<DashboardTuiles*/}
                {/*    IconComponent={IoMdColorPalette}*/}
                {/*    name={"Couleurs"}*/}
                {/*    to={"#"}*/}
                {/*/>*/}
                {/*<DashboardTuiles*/}
                {/*    IconComponent={FaUser}*/}
                {/*    name={"Artistes"}*/}
                {/*    to={"#"}*/}
                {/*/>*/}
                {/*<DashboardTuiles*/}
                {/*    IconComponent={IoIosResize}*/}
                {/*    name={"Dimensions"}*/}
                {/*    to={"#"}*/}
                {/*/>*/}
                {/*<DashboardTuiles*/}
                {/*    IconComponent={LuPlus}*/}
                {/*    name={"Autres"}*/}
                {/*    to={"#"}*/}
                {/*/>*/}
            </div>
        </div>
    )
}