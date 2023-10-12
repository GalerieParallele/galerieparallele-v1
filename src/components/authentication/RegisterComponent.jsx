import React, {useCallback, useState} from "react";
import Head from "next/head";
import {useAuth} from "@/hooks/useAuth";
import {checkPassword, isValidEmail} from "@/constants/Util";
import Button from "@/components/items/button/Button";
import IconInput from "@/components/items/iconinput/IconInput";
import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";
import {Toast} from "@/constants/ToastConfig";
import useSocket from "@/hooks/useSocket";
import {AiOutlineFieldNumber, AiOutlinePercentage} from "react-icons/ai";

import styles from "./RegisterComponent.module.scss";
import {BsCheckCircleFill} from "react-icons/bs";
import {ImCross} from "react-icons/im";

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
        siret: "",
        tva: "",
    });
    const [isPro, setIsPro] = useState(false);
    const [loading, setLoading] = useState(false);
    const socket = useSocket();

    const showToast = useCallback(async (icon, title) => {
        await Toast.fire({icon, title});
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === "isPro") {
            setIsPro(prev => !prev);
            setFormData(prev => ({...prev, [name]: !isPro}));
            return;
        }

        setFormData(prev => ({...prev, [name]: value}));

        console.log(formData);
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
            <div style={{display: "none"}}>
                <input
                    name="isPro"
                    type="checkbox"
                    value={formData.isPro}
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                        width: "fit-content",
                    }}
                />
            </div>
            <button
                type="button"
                onClick={() => handleChange({target: {name: "isPro"}})}
                disabled={loading}
                className={`${styles.button} ${isPro ? styles.active : styles.notActive}`}
            >
                {isPro ? (
                    <div className={styles.buttonContent}>
                        <span>Je suis professionnel</span>
                        <span>{<BsCheckCircleFill/>}</span>
                    </div>
                ) : (
                    <div className={styles.buttonContent}>
                        <span>Je suis particulier</span>
                        <span>{<ImCross/>}</span>
                    </div>
                )}
            </button>
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
            {isPro && (
                <>
                    <IconInput
                        label={"SIRET"}
                        name={"siret"}
                        IconComponent={AiOutlineFieldNumber}
                        type={"text"}
                        value={formData.siret}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <IconInput
                        label={"TVA"}
                        name={"tva"}
                        IconComponent={AiOutlinePercentage}
                        type={"text"}
                        value={formData.tva}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </>
            )}
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
