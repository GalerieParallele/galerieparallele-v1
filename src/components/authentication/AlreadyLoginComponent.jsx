import React, {useCallback, useState} from "react";

import Button from "@/components/items/Button";

import {useAuth} from "@/hooks/useAuth";
import {Toast} from "@/constants/ToastConfig";

import styles from "../../styles/components/AlreadyLoginComponent.module.css";

const MESSAGES = {
    SUCCESS: "Déconnexion réussie.",
}

export default function AlreadyLoginComponent() {

    const {signOut, user} = useAuth();

    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (e) => {

        e.preventDefault();

        setLoading(true);

        await signOut();

        await Toast.fire({
            icon: 'success',
            title: MESSAGES.SUCCESS
        })

        setLoading(false);

    }, [signOut])

    return (
        <div className={styles.container}>
            <h2>Vous êtes connecté</h2>
            <p>Vous pouvez maintenant accéder à votre espace personnel</p>
            <Button
                onClick={handleSubmit}
                text={"Déconnexion"}
                isLoading={loading}
            />
        </div>
    );
}