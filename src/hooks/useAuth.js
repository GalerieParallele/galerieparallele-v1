import {createContext, useCallback, useContext, useState} from 'react';

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

    const signIn = useCallback(async (email, password) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.status === 200 && data.id) {

                setUser(data);

                return {user: data};
            } else {
                return {error: data.message};
            }
        } catch (error) {
            return {error: MESSAGES.GLOBAL_ERROR_LOGIN};
        }
    }, []);

    const signUp = useCallback(async (email, password) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.status === 201 && data.id) {
                setUser(data);
                return {user: data};
            } else {
                return {error: data.message};
            }
        } catch (error) {
            return {error: MESSAGES.GLOBAL_ERROR_SIGNUP};
        }
    }, []);

    /**
     * Permet la déconnexion de l'utilisateur.
     *
     * @return {Promise<boolean>} True si la déconnexion a réussi, false sinon.
     */
    const signOut = useCallback(async () => {

        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            setUser(null)
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}
