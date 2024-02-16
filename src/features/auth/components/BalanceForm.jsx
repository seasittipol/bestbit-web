export default function BalanceForm() {
    return (
        <div className="bg-slate-600 h-40 rounded-lg py-4 px-4 flex items-center justify-between">
            <div>
                <p>Balanace</p>
                <div className="flex gap-2 items-end">
                    <p className="font-bold text-3xl">
                        1,234.12
                    </p>
                    <span> USDT</span>
                </div>
                <p>
                    Today's PnL:
                    <span className="text-green-500"> +$0.66%</span>
                </p>
            </div>
            <div className=" flex gap-2 h-full items-start">
                <button className="bg-amber-500 text-black px-4 py-1 rounded-lg font-semibold">Deposit</button>
                <button className="bg-gray-500 text-black px-4 py-1 rounded-lg font-semibold">Withdraw</button>
            </div>
        </div>
    )
}
