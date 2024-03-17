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
import {FaBuilding, FaCity, FaPercent} from "react-icons/fa";

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
        password: "",
        confirmPassword: "",
        pro: {
            societyName: "",
            streetNumber: "",
            streetName: "",
            city: "",
            postalCode: "",
            siret: "",
            tva: "",
            tauxTva: "",
            numMda: "",
            numSecu: "",
        }
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                />
                <IconInput
                    label={"Mot de passe"}
                    name={"password"}
                    IconComponent={FiLock}
                    type={"password"}
                    autoComplete={"new-password"}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />
                <IconInput
                    label={"Confirmer mot de passe"}
                    name={"confirmPassword"}
                    IconComponent={FiLock}
                    type={"password"}
                    autoComplete={"new-password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />
                {isPro && (
                    <>
                        <div className={styles.proHead}>
                            <span className={styles.line}/>
                            <p>Section professionnelle</p>
                            <span className={styles.line}/>
                        </div>
                        <IconInput
                            label={"Nom de société"}
                            name={"pro.societyName"}
                            IconComponent={FaBuilding}
                            type={"text"}
                            value={formData.pro.societyName}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <IconInput
                            label={"Numéro de voie"}
                            name={"pro.streetNumber"}
                            IconComponent={AiOutlineFieldNumber}
                            type={"number"}
                            value={formData.pro.streetNumber}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <IconInput
                            label={"Rue"}
                            name={"pro.streetName"}
                            IconComponent={AiOutlineFieldNumber}
                            type={"text"}
                            value={formData.pro.streetName}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <IconInput
                            label={"Ville"}
                            name={"pro.city"}
                            IconComponent={FaCity}
                            type={"text"}
                            value={formData.pro.city}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <IconInput
                            label={"Code postal"}
                            name={"pro.postalCode"}
                            IconComponent={AiOutlineFieldNumber}
                            type={"number"}
                            value={formData.pro.postalCode}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <IconInput
                            label={"SIRET"}
                            name={"pro.siret"}
                            IconComponent={AiOutlineFieldNumber}
                            type={"text"}
                            value={formData.pro.siret}
                            onChange={handleChange}
                            disabled={loading}
                            minLength={14}
                            maxLength={14}
                        />
                        <IconInput
                            label={"TVA"}
                            name={"pro.tva"}
                            IconComponent={AiOutlineFieldNumber}
                            type={"text"}
                            value={formData.pro.tva}
                            onChange={handleChange}
                            disabled={loading}
                            minLength={13}
                            maxLength={13}
                        />
                        <IconInput
                            label={"Taux de TVA"}
                            name={"pro.tauxTva"}
                            IconComponent={FaPercent}
                            type={"text"}
                            value={formData.pro.tauxTva}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <IconInput
                            label={"Numéro maison des artistes"}
                            name={"pro.numMda"}
                            IconComponent={AiOutlineFieldNumber}
                            type={"text"}
                            value={formData.pro.numMda}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <IconInput
                            label={"Numéro de sécurité sociale"}
                            name={"pro.numSecu"}
                            IconComponent={AiOutlineFieldNumber}
                            type={"text"}
                            value={formData.pro.numSecu}
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
