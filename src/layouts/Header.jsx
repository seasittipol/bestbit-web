import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="flex w-full justify-between items-center px-20 bg-gray-600 h-16">
            <div className="flex gap-8">
                <Link to='/'>LOGO</Link>
                <Link to='/'>Markets</Link>
            </div>
            <div className="flex gap-8">
                <Link to='/dashboard'>MyDashboard</Link>
            </div>
        </header>
    )
}
