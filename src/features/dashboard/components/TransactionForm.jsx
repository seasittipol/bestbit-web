import axios from "axios";
import useAuth from "../../auth/hooks/use-auth"
import { useState } from "react";
import { useEffect } from "react";

export default function TransactionForm() {
    const { authUser } = useAuth()
    const [transactionArray, setTransactionArray] = useState([])
    console.log(authUser.isAdmin);

    useEffect(() => {
        const transactionAdmin = async () => {
            const token = localStorage.getItem('ACCESS_TOKEN')
            if (authUser.isAdmin) {
                const res = await axios.get('http://localhost:8000/admins/transaction', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTransactionArray(res.data)
            } else {
                const res = await axios.get('http://localhost:8000/users/transaction', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTransactionArray(res.data)
            }
            console.log(transactionArray);
        }

        transactionAdmin()
    }, [])

    return (
        <div className="bg-slate-600 h-min-40 rounded-lg py-2 px-4 flex flex-col gap-2">
            <div>Transaction</div>
            <div className="grid grid-cols-7 gap-2">
                <span>No</span>
                <span>User</span>
                <span>Symbol</span>
                <span>Amount</span>
                <span>Price</span>
                <span>Status</span>
                <span>Time</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {transactionArray.map(el => (
                    <>
                        <span>{el.id}</span>
                        <span>{el.user.name}</span>
                        <span>{el.coin.symbol}</span>
                        <span>{el.amount}</span>
                        <span>{el.price}</span>
                        <span>{el.status}</span>
                        <span>{el.createdAt}</span>
                    </>
                ))}
            </div>
        </div>
    )
}
