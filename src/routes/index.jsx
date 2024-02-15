import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MarketPage from '../pages/MarketPage'
import LoginPage from '../pages/LoginPage'
import { Outlet } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import Header from '../layouts/Header'
import ProtectRoute from '../features/auth/components/ProtectRoute'
import RegisterPage from '../pages/RegisterPage'
import RedirectRoute from '../features/auth/components/RedirectRoute'

const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <RedirectRoute>
                <LoginPage />
            </RedirectRoute>
        )
    },
    {
        path: '/',
        element: (
            <>
                <ProtectRoute>
                    <Header />
                    <Outlet />
                </ProtectRoute>
            </>
        ),
        children: [
            {
                path: '',
                element: <MarketPage />
            },
            {
                path: 'dashboard',
                element: <DashboardPage />
            }
        ]
    }
])

export default function Router() {
    return <RouterProvider router={router} />
}