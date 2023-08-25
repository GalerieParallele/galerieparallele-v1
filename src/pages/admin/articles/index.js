import Link from "next/link";
import ROUTES from "@/constants/ROUTES";
import Admin from "@/components/admin/Admin";
import Editor from "@/components/items/Editor";

export default function AdminArticlesIndex() {
    return (
        <Admin>
            <h1>Accueil - articles</h1>
            <Link href={ROUTES.ADMIN.INDEX}>Retour</Link>
            <br/>
            <Link href={ROUTES.ADMIN.ARTICLES.NEW}>Nouvel article</Link>
        </Admin>
    );
}
