import React, { useEffect } from "react";
import AdminNav from "@/components/admin/AdminNav";
import styles from "../../styles/pages/Admin.module.css";
import useSocket from "@/hooks/useSocket";
import { Toast } from "@/constants/ToastConfig";

export default function Admin({ children }) {
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
                <AdminNav />
            </div>
            <div className={styles.right}>
                {children}
            </div>
        </main>
    );
}
