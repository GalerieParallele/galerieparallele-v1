import Link from "next/link";
import ROUTES from "@/constants/ROUTES";
import Admin from "@/components/admin/Admin";
import Editor from "@/components/items/Editor";
import {useState} from "react";
import Button from "@/components/items/Button";

export default function AdminArticlesIndex() {

    const [editorData, setEditorData] = useState("");

    return (
        <Admin>
            <h1>Rédiger un nouvel article</h1>
            <Link href={ROUTES.ADMIN.ARTICLES.HOME}>Retour</Link>
            <br/>
            <Editor onEditorChange={setEditorData}/>
            <br/>
            <Button
                text={"Publier"}
                onClick={() => {
                    console.log(editorData);
                }}
            />
        </Admin>
    );
}
