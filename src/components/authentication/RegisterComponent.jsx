import React, {useCallback, useState} from "react";
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
    REGISTER_SUCCESS: "Inscription réussie",
};

export default function RegisterComponent() {
    const {signUp} = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const socket = useSocket();

    const showToast = useCallback(async (icon, title) => {
        await Toast.fire({icon, title});
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const {email, password, confirmPassword} = formData;

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
        },
        [formData, signUp, socket, showToast]
    );

    return (
        <>
            <Head><title>GP - Inscription</title></Head>
            <IconInput
                label="E-mail"
                name="email"
                IconComponent={MdEmail}
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
            />
            <IconInput
                label="Mot de passe"
                name="password"
                IconComponent={FiLock}
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
            />
            <IconInput
                label="Confirmer le mot de passe"
                name="confirmPassword"
                IconComponent={FiLock}
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
            />
            <Button
                disabled={
                    !isValidEmail(formData.email) ||
                    !checkPassword(formData.password) ||
                    formData.password !== formData.confirmPassword
                }
                text="Inscription"
                onClick={handleSubmit}
                isLoading={loading}
            />
        </>
    );
}
