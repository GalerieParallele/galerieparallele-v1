import React, {useCallback, useState} from 'react';

import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";

import AuthMultiStep from "@/components/ui/multi-step-form/forms/AuthMultiStep";
import {useFormStore} from "@/stores/useFormStore";
import {useAuth} from "@/hooks/useAuth";
import {Toast} from "@/constants/ToastConfig";

const MESSAGES = {
    LOGIN_SUCCESS: "Vous êtes désormais connecté.",
}

export default function LoginMultiStep({isLoading = false}) {

    const {formData} = useFormStore();
    const {signIn} = useAuth();

    const [loading, setLoading] = useState(false);

    const formConfig = [
        {
            step: 1,
            title: "Connexion",
            fields: [
                {key: "email", label: "Email", type: "email", required: true, icon: MdEmail},
                {key: "password", label: "Mot de passe", type: "password", required: true, icon: FiLock},
            ]
        },
    ];

    const handleSubmit = useCallback(async (e) => {

        setLoading(true)

        if (e)
            e.preventDefault();

        const {error} = await signIn(formData.email, formData.password);

        setLoading(false)

        if (error) {
            await Toast.fire({
                icon: 'error', title: error
            })
            return;
        }

        await Toast.fire({
            icon: 'success', title: MESSAGES.LOGIN_SUCCESS
        });


    }, [formData, signIn])

    return <div>
        <AuthMultiStep formConfig={formConfig} onSubmit={handleSubmit} loading={loading || isLoading}/>
    </div>

}
