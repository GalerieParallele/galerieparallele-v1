import Link from "next/link";
import ROUTES from "@/constants/ROUTES";
import Admin from "@/components/admin/Admin";

export default function AdminArticlesHome() {
    return <Admin>
        <h1>Accueil - articles</h1>
        <Link href={ROUTES.ADMIN}>Retour</Link>
    </Admin>
}