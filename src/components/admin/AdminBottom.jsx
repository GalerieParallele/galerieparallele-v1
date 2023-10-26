import React, {useCallback, useState} from "react";

import {useAuth} from "@/hooks/useAuth";

import Button from "@/components/items/button/Button";
import {PiSignOutBold} from "react-icons/pi";

import {Toast} from "@/constants/ToastConfig";
import MESSAGES from "@/constants/MESSAGES";
import ROUTES from "@/constants/ROUTES";

import styles from "./AdminNav.module.css";

import {useRouter} from "next/router";

export default function AdminBottom() {

    const router = useRouter();

    const {signOut} = useAuth();

    const [loading, setLoading] = useState(false);

    const handleSignOut = useCallback(async (e) => {

        e.preventDefault();

        setLoading(true);

        await signOut();

        setLoading(false);

        await router.push(ROUTES.HOME);

        await Toast.fire({
            icon: 'success',
            title: MESSAGES.SUCCESS.SIGN_OUT
        })


    }, [signOut])

    return <div className={styles.bottom}>
        <Button
            text={"Retour au site"}
            isWhite
            onClick={() => router.push(ROUTES.HOME)}
        />
        <Button
            text={<PiSignOutBold/>}
            isWhite
            isLoading={loading}
            onClick={handleSignOut}
        />
    </div>
}