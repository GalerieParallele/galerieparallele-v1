import IconInput from "@/components/IconInput";

import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";

export default function RegisterComponent() {
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
            <IconInput
                label={"Confirmer le mot de passe"}
                IconComponent={FiLock}
                type={"password"}
            />
        </>
    )
}