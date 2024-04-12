import {useRouter} from "next/router";
import ROUTES from "@/constants/ROUTES";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";

export default function DashboardArtisteOeuvreEdit() {

    const router = useRouter();

    return (
        <div>
            <DashboardNavbar returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES(router.query.id)}/>
        </div>
    )
}