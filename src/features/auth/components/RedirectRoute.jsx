import { Navigate } from "react-router-dom"
import useAuth from "../hooks/use-auth"

export default function RedirectRoute({ children }) {
    const { authUser } = useAuth()
    return (
        authUser ? <Navigate to='/' /> : children
    )
}
