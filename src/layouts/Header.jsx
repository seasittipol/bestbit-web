import { Link } from "react-router-dom";
import useAuth from "../features/auth/hooks/use-auth";

export default function Header() {
    const { setAuthUser } = useAuth()
    const logout = () => {
        localStorage.removeItem('ACCESS_TOKEN')
        setAuthUser(null)
    }
    return (
        <header className="flex w-full justify-between items-center px-20 bg-gray-600 h-16">
            <div className="flex gap-8">
                <Link to='/'>LOGO</Link>
                <Link to='/'>Markets</Link>
            </div>
            <div className="flex gap-4">
                <Link to='/dashboard'>MyDashboard</Link>
                <button onClick={logout}>Log out</button>
            </div>
        </header>
    )
}
