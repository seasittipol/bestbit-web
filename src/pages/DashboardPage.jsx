import BalanceForm from "../features/auth/components/BalanceForm";
import ProfileForm from "../features/auth/components/ProfileForm";
import WalletForm from "../features/auth/components/WalletForm";

export default function DashboardPage() {
    return (
        <div className="px-20 flex flex-col gap-4 mt-4">
            <ProfileForm />
            <BalanceForm />
            <WalletForm />
        </div>
    )
}
