import FileInput from "@/components/items/FileInput";
import MyFile from "@/components/MyFile";
import LittleSpinner from "@/components/items/LittleSpinner";
import {useAuth} from "@/hooks/useAuth";
import PageLoader from "@/components/items/PageLoader";
import Admin from "@/components/admin/Admin";
import DragAndDrop from "@/components/items/DragAndDrop";

export default function MyCloud() {

    const {user} = useAuth()

    const handleFilesUploaded = (results) => {
        // Traiter les résultats ici.
        // Par exemple : afficher un message de réussite ou d'erreur.
    };

    return user ? <Admin>
            <DragAndDrop
                onFilesUploaded={handleFilesUploaded}
            />
            <MyFile user={user}/>
        </Admin>
        :
        <PageLoader/>

}