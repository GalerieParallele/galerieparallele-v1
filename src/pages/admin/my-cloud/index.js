import MyFile from "@/components/admin/cloud/MyFile";
import {useAuth} from "@/hooks/useAuth";
import PageLoader from "@/components/items/PageLoader";
import Admin from "@/components/admin/Admin";
import DragAndDrop from "@/components/items/draganddrop/DragAndDrop";

export default function MyCloud() {
    const {user} = useAuth()

    const handleFilesUploaded = (results) => {
    };

    return user ? <Admin>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <DragAndDrop
                    onFilesUploaded={handleFilesUploaded}
                />
            </div>
            <MyFile user={user}/>
        </Admin>
        :
        <PageLoader/>
}
