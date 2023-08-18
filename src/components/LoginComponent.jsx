import React, {useState} from "react";

import IconInput from "@/components/IconInput";
import Button from "@/components/Button";

import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";

import {useAuth} from "@/hooks/useAuth";
import Swal from "sweetalert2";

const MESSAGES = {
    LOGIN_SUCCESS: "Vous êtes désormais connecté.",
}

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: false,
})

export default function LoginComponent() {

    const {signIn} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true)

        const {user, error} = await signIn(email, password);

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

    }

    return (
        <>
            <IconInput
                label={"E-mail"}
                IconComponent={MdEmail}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
            />
            <IconInput
                label={"Mot de passe"}
                IconComponent={FiLock}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                text={"Connexion"}
                onClick={handleSubmit}
                isLoading={loading}/>
        </>
    )
}