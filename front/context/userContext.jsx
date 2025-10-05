import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    useEffect(() => {
        if(!user) {
            axios.get(`${import.meta.env.VITE_API_URL}/profile`).then(({data}) => {
                setUser(data)
            })
            .catch(() => {

            });
        }
    }, [])

    const value = {
        user: user,
        setUser: setUser,
      };

    return (
        <UserContext.Provider value={value}>
                {children}
        </UserContext.Provider>
    )
}