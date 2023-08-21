import React, {useCallback, useState} from "react";

import "../../app/globals.css";

import {useAuth} from "@/hooks/useAuth";
import {checkPassword, isValidEmail} from "@/constants/Util";

import IconInput from "@/components/IconInput";
import Button from "@/components/Button";

import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";

import {Toast} from "@/constants/ToastConfig";

const MESSAGES = {
    LOGIN_SUCCESS: "Vous êtes désormais connecté.",
}

export default function LoginComponent() {

    const {signIn} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (e) => {

            e.preventDefault();

            setLoading(true)

            const {error} = await signIn(email, password);

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
                title: MESSAGES.LOGIN_SUCCESS
            });

        }, [email, password, signIn]
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
            <Button
                disabled={!isValidEmail(email) || !checkPassword(password)}
                text={"Connexion"}
                onClick={handleSubmit}
                isLoading={loading}/>
        </>
    )
}