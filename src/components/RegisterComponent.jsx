import IconInput from "@/components/IconInput";

import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";
import Button from "@/components/Button";
import React, {useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import Swal from "sweetalert2";

const MESSAGES = {
    DIFFERENT_PASSWORDS: "Les mots de passe ne correspondent pas",
    REGISTER_SUCCESS: "Vous êtes désormais inscrit."
}

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
})

export default function RegisterComponent() {

    const {signUp} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            await Toast.fire({
                icon: 'error',
                title: MESSAGES.DIFFERENT_PASSWORDS
            })
            return;
        }

        const {error} = await signUp(email, password);

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
            <IconInput
                label={"Confirmer le mot de passe"}
                IconComponent={FiLock}
                type={"password"}
                onChange={(e) => setConfirm(e.target.value)}
            />
            <Button
                text={"Inscription"}
                onClick={handleSubmit}/>
        </>
    )
}