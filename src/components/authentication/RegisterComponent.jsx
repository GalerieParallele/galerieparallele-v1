import React, {useCallback, useState} from "react";

import {useAuth} from "@/hooks/useAuth";

import Button from "@/components/Button";
import IconInput from "@/components/IconInput";

import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";

import {Toast} from "@/constants/ToastConfig";
import {checkPassword, isValidEmail} from "@/constants/Util";

const MESSAGES = {
    DIFFERENT_PASSWORDS: "Les mots de passe ne correspondent pas",
    REGISTER_SUCCESS: "Inscription réussie"
}


export default function RegisterComponent() {

    const {signUp} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (e) => {

            e.preventDefault();

            if (password !== confirmPassword) {
                await Toast.fire({
                    icon: 'error',
                    title: MESSAGES.DIFFERENT_PASSWORDS
                })
                return;
            }

            setLoading(true)

            const response = await signUp(email, password);

            const {error} = response;


            setLoading(false)

            if (error) {
                await Toast.fire({
                    icon: 'error',
                    title: error
                })
                return;
            }

            await Toast.fire({
                icon: 'success',
                title: MESSAGES.REGISTER_SUCCESS
            });

        }, [email, password, confirmPassword, signUp]
    )


    return (
        <>
            <IconInput
                label={"E-mail"}
                IconComponent={MdEmail}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
            <IconInput
                label={"Mot de passe"}
                IconComponent={FiLock}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />
            <IconInput
                label={"Confirmer le mot de passe"}
                IconComponent={FiLock}
                type={"password"}
                onChange={(e) => setConfirm(e.target.value)}
                disabled={loading}
            />
            <Button
                disabled={!isValidEmail(email) || !checkPassword(password) || password !== confirmPassword}
                text={"Inscription"}
                onClick={handleSubmit}
                isLoading={loading}/>
        </>
    )
}