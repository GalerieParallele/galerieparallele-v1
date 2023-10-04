import React, {useEffect} from "react";

import {Toast} from "@/constants/ToastConfig";

import AdminNav from "@/components/admin/AdminNav";

import useSocket from "@/hooks/useSocket";

import styles from "./Admin.module.css";

export default function Admin({children}) {

    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        const handleUserRegister = () => {
            Toast.fire({
                icon: 'info',
                title: 'Un nouvel utilisateur s\'est inscrit !'
            });
        };

        socket.on('userRegister', handleUserRegister);

        return () => {
            socket.off('userRegister', handleUserRegister);
        };
    }, [socket]);

    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <AdminNav/>
            </div>
            <div className={styles.right}>
                {children}
            </div>
        </main>
    );
}
