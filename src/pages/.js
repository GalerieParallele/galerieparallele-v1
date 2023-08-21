import Link from "next/link";
import {useAuth} from "@/hooks/useAuth";
import {useCallback} from "react";
import Button from "@/components/Button";

export default function () {

    const {user, isLoading, signOut} = useAuth()

    const handleSignOut = useCallback(() => {
        signOut()
    }, [signOut])

    return (
        <>
            <h3>Accueil</h3>
            <Link href={"/login"}>S'authentifier</Link>

            {!isLoading && user &&  (
                <>
                    <p>Vous êtes connecté en tant que {user.email}</p>
                    <Button onClick={handleSignOut} text={"Se déconnecter"}/>
                </>
            )}
        </>
    )
}