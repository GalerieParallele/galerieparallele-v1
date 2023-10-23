import React, {useCallback, useState} from "react";
import Head from "next/head";
import {useAuth} from "@/hooks/useAuth";
import {checkPassword, isValidEmail} from "@/constants/Util";
import Button from "@/components/items/button/Button";
import IconInput from "@/components/items/iconinput/IconInput";
import {MdEmail} from "react-icons/md";
import {FiLock} from "react-icons/fi";
import {Toast} from "@/constants/ToastConfig";
import {AiOutlineFieldNumber, AiOutlinePercentage} from "react-icons/ai";

import styles from "./RegisterComponent.module.scss";
import {BsFillPersonFill, BsTelephoneFill} from "react-icons/bs";
import {FaLocationDot} from "react-icons/fa6";

const MESSAGES = {
    DIFFERENT_PASSWORDS: "Les mots de passe ne correspondent pas",
    REGISTER_SUCCESS: "Inscription réussie",
};

export default function RegisterComponent() {

    const {signUp} = useAuth();

    const [formData, setFormData] = useState({
        lastname: "",
        firstname: "",
        street: "",
        city: "",
        postalCode: "",
        email: "",
        phone: "",
        siret: "",
        tva: "",
        password: "",
        confirmPassword: "",
    });
    const [isPro, setIsPro] = useState(false);
    const [loading, setLoading] = useState(false);

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


            await showToast('success', MESSAGES.REGISTER_SUCCESS);
        },
        [formData, signUp, showToast]
    );

    return (
        <>
            <Head><title>GP - Devenir Membre</title></Head>
            <div style={{display: "none"}}>
                <input
                    name="isPro"
                    type="checkbox"
                    value={isPro}
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
                className={`${styles.button}`}
            >
                <div className={styles.buttonContent}>
                    <p className={`${styles.label} ${!isPro ? styles.activeLabel : styles.inactiveLabel}`}>Particulier</p>
                    <div className={styles.switch}>
                        <span
                            className={
                                `${styles.switchIcon} 
                            ${isPro ? styles.enable : styles.disable}`
                            }/>
                    </div>
                    <p className={`${styles.label} ${isPro ? styles.activeLabel : styles.inactiveLabel}`}>Professionnel</p>
                </div>
            </button>
            <div className={styles.rows}>
                <IconInput
                    label="Nom"
                    name="lastname"
                    IconComponent={BsFillPersonFill}
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastname}
                    onChange={handleChange}
                    disabled={loading}
                />
                <IconInput
                    label="Prénom"
                    name="firstname"
                    IconComponent={BsFillPersonFill}
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstname}
                    onChange={handleChange}
                    disabled={loading}
                />
                <IconInput
                    label="Rue"
                    name="street"
                    IconComponent={FaLocationDot}
                    type="street"
                    autoComplete="street-address"
                    value={formData.street}
                    onChange={handleChange}
                    disabled={loading}
                />
                <IconInput
                    label={"Ville"}
                    name={"city"}
                    IconComponent={FaLocationDot}
                    type={"text"}
                    autoComplete={"address-level2"}
                    value={formData.city}
                    onChange={handleChange}
                    disabled={loading}
                />
                <IconInput
                    label={"Code postal"}
                    name={"postalCode"}
                    IconComponent={FaLocationDot}
                    type={"postalCode"}
                    autoComplete={"postal-code"}
                    value={formData.postalCode}
                    onChange={handleChange}
                    disabled={loading}
                />
                <IconInput
                    label={"Email"}
                    name={"email"}
                    IconComponent={MdEmail}
                    type={"email"}
                    autoComplete={"email"}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                />
                <IconInput
                    label={"Téléphone"}
                    name={"phone"}
                    IconComponent={BsTelephoneFill}
                    type={"phone"}
                    autoComplete={"tel"}
                    value={formData.phone}
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
                            label={"Numéro TVA"}
                            name={"tva"}
                            IconComponent={AiOutlinePercentage}
                            type={"text"}
                            value={formData.tva}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </>
                )}
            </div>
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
