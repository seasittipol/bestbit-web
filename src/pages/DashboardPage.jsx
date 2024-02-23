import BalanceForm from "../features/auth/components/BalanceForm";
import useAuth from "../features/auth/hooks/use-auth";
import CoinTable from "../features/dashboard/components/CoinTable";
import ProfileForm from "../features/dashboard/components/ProfileForm";
import WalletForm from "../features/dashboard/components/WalletForm";

export default function DashboardPage() {
    const { authUser } = useAuth()
    return (
        <div className="px-20 flex flex-col gap-4 mt-4">
            <ProfileForm />
            {authUser.isAdmin
                ? (<CoinTable />)
                : (
                    <>
                        <BalanceForm />
                        <WalletForm />
                    </>
                )
            }
        </div>
    )
}
