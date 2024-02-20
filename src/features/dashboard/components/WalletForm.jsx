import MarketForm from "../../auth/components/MarketForm";

export default function WalletForm() {
    return (
        <div>
            <div className="flex justify-end">
                <button>History</button>
            </div>
            <MarketForm />
        </div>
    )
}
