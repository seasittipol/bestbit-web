import { Link } from "react-router-dom";
import Button from "../../../layouts/Button";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function WalletForm() {
    const [coinWallet, setCoinWallet] = useState([])

    const token = localStorage.getItem('ACCESS_TOKEN')
    useEffect(() => {
        const getCoinWallet = async () => {
            const res = await axios.get('http://localhost:8000/users/wallet-coin', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setCoinWallet(res.data)
        }
        getCoinWallet()
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <Link to='/dashboard/transaction'>
                    <Button name='Transaction' />
                </Link>
            </div>
            <div className="bg-slate-600 min-h-20 rounded-lg py-2 px-4 flex flex-col gap-2 ">
                <div className="grid grid-cols-3">
                    <div>Symbol</div>
                    <div>Amount</div>
                    <div>24h-Change</div>
                </div>
                {coinWallet.map(el => (
                    <div className="grid grid-cols-3 mt-2">
                        <div className="flex gap-2">
                            <img
                                className="w-6 h-6 rounded-full"
                                src="https://i.pinimg.com/736x/16/af/11/16af11cfede502db66e20f547474da79.jpg"
                            />
                            <span>{el.coin.symbol}</span>
                        </div>
                        <div>{el.amount}</div>
                        <div>-</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
