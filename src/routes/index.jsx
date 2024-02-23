import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MarketPage from '../pages/MarketPage'
import LoginPage from '../pages/LoginPage'
import { Outlet } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import Header from '../layouts/Header'
import ProtectRoute from '../features/auth/components/ProtectRoute'
import RegisterPage from '../pages/RegisterPage'
import RedirectRoute from '../features/auth/components/RedirectRoute'
import DepositPage from '../pages/DepositPage'
import TransactionPage from '../pages/TransactionPage'

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
        element:
            <>
                <ProtectRoute>
                    <Header />
                    <Outlet />
                </ProtectRoute>
            </>
        ,
        children: [
            {
                path: '',
                element: <MarketPage />
            },
            {
                path: 'dashboard/:userId',
                element: <DashboardPage />
            },
            {
                path: 'dashboard/deposit',
                element: <DepositPage />
            },
            {
                path: 'dashboard/transaction',
                element: <TransactionPage />
            }
        ]
    }
])

export default function Router() {
    return <RouterProvider router={router} />
}