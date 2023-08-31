import FileInput from "@/components/items/FileInput";
import MyFile from "@/components/MyFile";
import LittleSpinner from "@/components/items/LittleSpinner";
import {useAuth} from "@/hooks/useAuth";
import PageLoader from "@/components/items/PageLoader";
import Admin from "@/components/admin/Admin";

export default function MyCloud() {

    const {user} = useAuth()


    return user ? <Admin>
            <FileInput/>
            <MyFile user={user}/>
        </Admin>
     :
         <PageLoader />

}