import React, {useCallback, useEffect, useState} from "react";

import Head from "next/head";
import {useAuth} from "@/hooks/useAuth";
import {checkPassword, isValidEmail} from "@/constants/Util";

import Button from "@/components/items/Button";
import IconInput from "@/components/items/IconInput";

import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";

import {Toast} from "@/constants/ToastConfig";

import useSocket from "@/hooks/useSocket";

const MESSAGES = {
    DIFFERENT_PASSWORDS: "Les mots de passe ne correspondent pas",
    REGISTER_SUCCESS: "Inscription réussie"
};

export default function RegisterComponent() {
    const {signUp} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const socket = useSocket();  // Obtenez directement l'instance du socket ici

    const showToast = useCallback(async (icon, title) => {
        await Toast.fire({icon, title});
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            await showToast('error', MESSAGES.DIFFERENT_PASSWORDS);
            return;
        }

        setLoading(true);

        const {error} = await signUp(email, password);
        setLoading(false);

        if (error) {
            await showToast('error', error);
            return;
        }

        if (socket) {
            socket.emit('userRegister');
        }

        await showToast('success', MESSAGES.REGISTER_SUCCESS);

    }, [email, password, confirmPassword, signUp, socket, showToast]);

    return (
        <>
            <Head><title>GP - Inscription</title></Head>
            <IconInput label="E-mail" IconComponent={MdEmail} type="email" onChange={(e) => setEmail(e.target.value)}
                       disabled={loading}/>
            <IconInput label="Mot de passe" IconComponent={FiLock} type="password"
                       onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
            <IconInput label="Confirmer le mot de passe" IconComponent={FiLock} type="password"
                       onChange={(e) => setConfirm(e.target.value)} disabled={loading}/>
            <Button disabled={!isValidEmail(email) || !checkPassword(password) || password !== confirmPassword}
                    text="Inscription" onClick={handleSubmit} isLoading={loading}/>
        </>
    );
}
