import React from 'react';

import Button from "@/components/items/Button";

import {uploadBytesResumable, getDownloadURL, ref} from "firebase/storage";
import {storage} from "../../firebaseConfig";
import IconInput from "@/components/items/IconInput";
import {AiFillFileAdd} from "react-icons/ai";


export default function UploadFile() {

    const [file, setFile] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [isUploading, setIsUploading] = React.useState(false);
    const [fileName, setFileName] = React.useState("");

    const handleSelectFile = (file) => {
        if (file && file[0]) {
            setFile(file[0]);
            console.log(file[0]);
        } else {
            setFile(null);
        }
    }

    const handleUploadFile = () => {
        if (file) {

            setIsUploading(true)

            const name = file.name;
            const storageRef = ref(storage, `${fileName ? fileName : name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setIsUploading(false);
                    });
                }
            );

        } else {
            console.log("No file selected")
        }
    }

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem"
        }}>
            <input
                type={"file"}
                className={"hidden"}
                id={"file"}
                accept={"image/*, .pdf"}
                onChange={(files) => handleSelectFile(files.target.files)}
                style={{
                    display: "none"
                }}
            />
            <label htmlFor={"file"} className={"cursor-pointer"}>
                <span className={"text-blue-500"}
                style={{
                    backgroundColor: "var(--black)",
                    color: "var(--white)",
                    padding: "1.1rem 1rem",
                    borderRadius: "0.5rem",
                    marginBottom: "2rem"
                }}>Sélectionnez un fichier</span>
            </label>
            <div>
                <p>{file && file.name}</p>
            </div>
            <IconInput
                label={"Nom du fichier"}
                IconComponent={AiFillFileAdd}
                type={"text"}
                placeholder={"Nom du fichier"}
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
            />
            <Button
                text={"Upload"}
                onClick={handleUploadFile}
            />
            {isUploading && (
                <div>
                    <p>Envoie du fichier...</p>
                    <p>{progress}%</p>
                </div>
            )}
        </div>
    )
}