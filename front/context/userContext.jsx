import axios from "axios"
import { createContext, useCallback, useEffect, useRef, useState } from "react"

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);
    const profileRequest = useRef(null);
    const setUser = useCallback((nextUser) => {
        profileRequest.current?.abort();
        setUserState(nextUser);
        setLoading(false);
    }, []);
    useEffect(() => {
        const controller = new AbortController();
        profileRequest.current = controller;
        axios.get(`${import.meta.env.VITE_API_URL}/profile`, { signal: controller.signal })
            .then(({data}) => {
                if (!controller.signal.aborted) setUserState(data);
            })
            .catch(() => {
                if (!controller.signal.aborted) setUserState(null);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });
        return () => controller.abort();
    }, [])

    const value = {
        user: user,
        setUser: setUser,
        loading,
      };

    return (
        <UserContext.Provider value={value}>
                {children}
        </UserContext.Provider>
    )
}
