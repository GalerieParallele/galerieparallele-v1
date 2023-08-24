import Admin from "@/components/admin/Admin";
import Link from "next/link";
import ROUTES from "@/constants/ROUTES";

export default function AdminUsersHome() {
    return <Admin>
        <h1>Accueil - utilisateurs</h1>
        <Link href={ROUTES.ADMIN}>Retour</Link>
    </Admin>
}