import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import ROUTES from "@/constants/ROUTES";

const AuthContext = createContext();

const MESSAGES = {
    GLOBAL_ERROR_LOGIN: "Une erreur est survenue lors de la connexion.",
    GLOBAL_ERROR_SIGNUP: "Une erreur est survenue lors de l'inscription.",
}

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const checkAuthentication = useCallback(async () => {

        setIsLoading(true)

        try {

            const response = await fetch(ROUTES.API.USER.ME, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setUser(data);
            } else {
                setUser(null);
            }

        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false)
        }
    }, []);

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication]);

    const signIn = useCallback(async (email, password) => {

        setIsLoading(true)

        try {
            const response = await fetch(ROUTES.API.AUTHENTICATION.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.status === 200) {

                setUser(data);

                return {user: data};
            } else {
                return {error: data.message};
            }
        } catch (error) {
            return {error: MESSAGES.GLOBAL_ERROR_LOGIN};
        } finally {
            setIsLoading(false)
        }
    }, []);

    const signUp = useCallback(async (email, password) => {

        setIsLoading(true)

        try {
            const response = await fetch(ROUTES.API.AUTHENTICATION.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.status === 201) {

                setUser(data);

                return {user: data};
            } else {
                return {error: data.message};
            }
        } catch (error) {
            return {error: MESSAGES.GLOBAL_ERROR_SIGNUP};
        } finally {
            setIsLoading(false)
        }
    }, []);

    /**
     * Permet la déconnexion de l'utilisateur.
     *
     * @return {Promise<boolean>} True si la déconnexion a réussi, false sinon.
     */
    const signOut = useCallback(async () => {

        setIsLoading(true)

        const response = await fetch(ROUTES.API.AUTHENTICATION.LOGOUT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            setUser(null)
        }

        setIsLoading(false)

    }, []);

    const hasRole = useCallback((role) => {
        return user
            && user.roles
            && user.roles.length > 0
            && Array.isArray(user.roles)
            && user.roles.includes(role);
    }, [user]);

    const hasRoles = useCallback((roles) => {
        return user
            && user.roles
            && user.roles.length > 0
            && Array.isArray(user.roles)
            && roles.every(role => user.roles.includes(role));
    }, [user]);

    return (
        <AuthContext.Provider value={{user, isLoading, signIn, signUp, signOut, hasRoles, hasRole}}>
            {children}
        </AuthContext.Provider>
    );
}
