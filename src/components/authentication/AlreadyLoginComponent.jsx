import React, {useCallback, useState} from "react";

import Button from "@/components/Button";

import {useAuth} from "@/hooks/useAuth";
import {Toast} from "@/constants/ToastConfig";

const MESSAGES = {
    SUCCESS: "Déconnexion réussie.",
}

export default function AlreadyLoginComponent() {

    const {signOut} = useAuth();

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
        <>
            <h2>Vous êtes connecté</h2>
            <p>Vous pouvez maintenant accéder à votre espace personnel</p>
            <br/>
            <Button
                onClick={handleSubmit}
                text={"Déconnexion"}
                isLoading={loading}
            />
        </>
    );
}