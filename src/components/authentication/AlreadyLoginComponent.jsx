import React, {useCallback, useEffect, useState} from "react";

import io from 'socket.io-client';

import Button from "@/components/items/Button";

import {useAuth} from "@/hooks/useAuth";
import {Toast} from "@/constants/ToastConfig";

import styles from "../../styles/components/authentication/AlreadyLoginComponent.module.css";

const MESSAGES = {
    SUCCESS: "Déconnexion réussie.",
}

export default function AlreadyLoginComponent() {

    const {signOut} = useAuth();
    const [loading, setLoading] = useState(false);


    const handleSignOut = useCallback(async (e) => {

        e.preventDefault();

        setLoading(true);

        await signOut();

        setLoading(false);

        await Toast.fire({
            icon: 'success',
            title: MESSAGES.SUCCESS
        })

    }, [signOut])

    return (
        <div className={styles.container}>
            <h2>Vous êtes connecté</h2>
            <p>Vous pouvez maintenant accéder à votre espace personnel</p>
            <Button
                onClick={handleSignOut}
                text={"Déconnexion"}
                isLoading={loading}
            />
        </div>
    );
}