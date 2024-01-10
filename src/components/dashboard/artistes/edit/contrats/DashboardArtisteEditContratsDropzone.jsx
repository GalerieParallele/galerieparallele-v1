import {useRef, useState} from "react";

import styles from './DashboardArtisteEditContratsDropzone.module.scss';
import {TbDragDrop} from "react-icons/tb";
import {SlCloudUpload} from "react-icons/sl";

export default function DashboardArtisteEditContratsDropzone() {

    const inputRef = useRef(null);

    const [files, setFiles] = useState([]);

    const handleSimulateClick = () => {
        inputRef.current.click();
    }

    return (
        <div className={styles.main}>
            <input
                style={{
                    display: "none"
                }}
                type="file"
                name="file"
                multiple
                ref={inputRef}
            />
            <div
                className={styles.dropzoneContainer}
                onClick={handleSimulateClick}
            >
                <h2>
                    <SlCloudUpload/>
                </h2>
                <p>Cliquez ou déposez vos fichiers ici</p>
            </div>
        </div>
    )

}