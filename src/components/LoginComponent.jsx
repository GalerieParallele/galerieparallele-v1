import IconInput from "@/components/IconInput";
import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";
import React from "react";

export default function LoginComponent() {
    return (
        <>
            <IconInput
                label={"E-mail"}
                IconComponent={MdEmail}
                type={"email"}
            />
            <IconInput
                label={"Mot de passe"}
                IconComponent={FiLock}
                type={"password"}
            />
        </>
    )
}