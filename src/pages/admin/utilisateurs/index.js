import Admin from "@/components/admin/Admin";
import Link from "next/link";
import ROUTES from "@/constants/ROUTES";
import {useAuth} from "@/hooks/useAuth";

export default function AdminUsersIndex() {

    const {user} = useAuth()
    return <Admin>
        <h1>Accueil - utilisateurs</h1>
        <Link href={ROUTES.ADMIN.HOME}>Retour</Link>
    </Admin>
}