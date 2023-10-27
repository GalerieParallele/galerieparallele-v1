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
    const [roles, setRoles] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const checkAuthentication = useCallback(async () => {

        setIsLoading(true)

        try {

            const response = await fetch(ROUTES.API.AUTH.ME, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setUser(data);
                setRoles(data.roles);
            } else {
                setUser(null);
                setRoles([])
            }

        } catch (error) {
            setUser(null);
            setRoles([])
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
            const response = await fetch(ROUTES.API.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.status === 200) {

                setUser(data);
                setRoles(data.roles);

                return {user: data};
            } else {
                return {error: data.message};
            }
        } catch (error) {

            console.log(error)

            return {error: MESSAGES.GLOBAL_ERROR_LOGIN};

        } finally {
            setIsLoading(false)
        }
    }, []);

    const signUp = useCallback(async (email, password) => {

        setIsLoading(true)

        try {
            const response = await fetch(ROUTES.API.AUTH.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.status === 201) {

                setUser(data);
                setRoles(data.roles)

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

        const response = await fetch(ROUTES.API.AUTH.LOGOUT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            setUser(null)
            setRoles([])
        }

        setIsLoading(false)

    }, []);

    const hasRole = useCallback((role) => {
        return roles.includes(role);
    }, [roles]);

    const hasRoles = useCallback((roles) => {
        return roles.some(role => hasRole(role));
    }, [hasRole]);

    return (
        <AuthContext.Provider value={{user, isLoading, signIn, signUp, signOut, hasRoles, hasRole}}>
            {children}
        </AuthContext.Provider>
    );
}
