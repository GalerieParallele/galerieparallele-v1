import React, {useCallback, useEffect, useState} from 'react';

import ROUTES from "@/constants/ROUTES";

import useSocket from "@/hooks/useSocket";

import AdminStatItem from "@/components/admin/home/AdminStatItem";

import styles from "./AdminStat.module.css";

export default function AdminStat() {
    const [totalUsers, setTotalUsers] = useState(0);
    const socket = useSocket();

    const getUsers = useCallback(async () => {
        try {
            const res = await fetch(ROUTES.API.USER.GET);
            if (!res.ok) throw new Error(res.statusText);
            const {total} = await res.json();
            setTotalUsers(total);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
    }, []);

    useEffect(() => {

        getUsers();

        if (!socket) return;

        const handleUserRegistration = () => setTotalUsers(prev => prev + 1);

        socket.on('userRegister', handleUserRegistration);

        return () => socket.off('userRegister', handleUserRegistration);
    }, [socket, getUsers]);

    return (<div className={styles.adminStat}>
            <AdminStatItem number={totalUsers} type="Utilisateurs"/>
            <AdminStatItem number={30} type="Artistes"/>
            <AdminStatItem number={6} type="Articles"/>
        </div>);
}
