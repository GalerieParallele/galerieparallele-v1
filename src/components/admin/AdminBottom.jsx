import styles from "@/styles/pages/admin.module.css";
import Button from "@/components/items/Button";
import {PiSignOutBold} from "react-icons/pi";
import React, {useCallback, useState} from "react";
import {Toast} from "@/constants/ToastConfig";
import {useAuth} from "@/hooks/useAuth";
import MESSAGES from "@/constants/MESSAGES";
import {router} from "next/client";
import ROUTES from "@/constants/ROUTES";

export default function AdminBottom() {

    const {signOut} = useAuth();

    const [loading, setLoading] = useState(false);

    const handleSignOut = useCallback(async (e) => {

        e.preventDefault();

        setLoading(true);

        await signOut();

        setLoading(false);

        router.push(ROUTES.ACCUEIL);

        await Toast.fire({
            icon: 'success',
            title: MESSAGES.SUCCESS.SIGN_OUT
        })


    }, [signOut])

    return <div className={styles.bottom}>
        <Button
            text={"Retour au site"}
            isWhite
            onClick={() => router.push(ROUTES.ACCUEIL)}
        />
        <Button
            text={<PiSignOutBold/>}
            isWhite
            isLoading={loading}
            onClick={handleSignOut}
        />
    </div>
}