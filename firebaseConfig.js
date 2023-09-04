import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0kVu9teNHHI1_hFKBMv8HLXHpftrffbY",
    authDomain: "dp-gallery-37d61.firebaseapp.com",
    projectId: "dp-gallery-37d61",
    storageBucket: "dp-gallery-37d61.appspot.com",
    messagingSenderId: "743213167683",
    appId: "1:743213167683:web:c87302da7337a11864d0f6",
    measurementId: "G-HQYN4J1YMC"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
