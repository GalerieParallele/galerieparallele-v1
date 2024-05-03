import React, {useState} from 'react';

import {FaLocationDot} from "react-icons/fa6";
import {BsFillPersonFill, BsTelephoneFill} from "react-icons/bs";
import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";

import AuthMultiStep from "@/components/ui/multi-step-form/forms/AuthMultiStep";

export default function RegisterMultiStep({isLoading = false}) {

    const [loading, setLoading] = useState(false);

    const formConfig = [
        {
            step: 1,
            title: "Informations Personnelles",
            fields: [
                {key: "lastname", label: "Nom", type: "text", required: true, icon: BsFillPersonFill},
                {key: "firstname", label: "Prénom", type: "text", required: true, icon: BsFillPersonFill},
                {key: "phone", label: "Téléphone", type: "phone", required: true, icon: BsTelephoneFill}
            ]
        },
        {
            step: 2,
            title: "Localisation",
            fields: [
                {key: "street", label: "Rue", type: "text", required: true, icon: FaLocationDot},
                {key: "city", label: "Ville", type: "text", required: true, icon: FaLocationDot},
                {key: "postalCode", label: "Code postal", type: "text", required: true, icon: FaLocationDot}
            ]
        },
        {
            step: 3,
            title: "Informations de connexion",
            fields: [
                {key: "email", label: "Email", type: "email", required: true, icon: MdEmail},
                {key: "password", label: "Mot de passe", type: "password", required: true, icon: FiLock},
                {
                    key: "confirmPassword",
                    label: "Confirmer le mot de passe",
                    type: "password",
                    required: true,
                    icon: FiLock
                }
            ]
        }
    ];

    const handleSubmit = async (e) => {}

    return <AuthMultiStep formConfig={formConfig} onSubmit={handleSubmit} loading={loading  || isLoading}/>

}
