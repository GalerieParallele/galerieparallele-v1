import MyFile from "@/components/admin/cloud/MyFile";
import {useAuth} from "@/hooks/useAuth";
import PageLoader from "@/components/items/PageLoader";
import Admin from "@/components/admin/Admin";
import DragAndDrop from "@/components/items/draganddrop/DragAndDrop";
import {useState} from "react";

export default function MyCloud() {

    const {user} = useAuth()
    const [refreshFiles, setRefreshFiles] = useState(false)

    const handleFilesUploaded = (results) => {
        setRefreshFiles(!refreshFiles)
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
            <MyFile user={user} refreshFiles={refreshFiles}/>
        </Admin>
        :
        <PageLoader/>
}
