import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [authUser, setAuthUser] = useState(null)

    useEffect(async () => {
        try {
            const token = localStorage.getItem('ACCESS_TOKEN')
            if (token) {
                const response = await axios.get('http://localhost:8000/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setAuthUser(response.data.user)
            }
        } catch (err) {

        }
    }, [])



    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}
