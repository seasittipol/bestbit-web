import { useState } from "react";
import Button from "../../../layouts/Button";
import { toast } from "react-toastify";
import axios from "axios";

export default function SpotTradeModal(props) {
    const { priceTrade, symbolTrade, onClose, onSuccess } = props
    const [amountBuy, setAmountBuy] = useState(null)
    const [totalBuy, setTotalBuy] = useState(null)
    const [amountSell, setAmountSell] = useState(null)
    const [totalSell, setTotalSell] = useState(null)

    const coin = symbolTrade.split('USDT')[0]
    const token = localStorage.getItem('ACCESS_TOKEN')

    const handleChangeAmountWithBuy = e => {
        setTotalBuy(e.target.value * priceTrade)
        setAmountBuy(e.target.value)
    }

    const handleChangeTotalWithBuy = e => {
        setAmountBuy(e.target.value / priceTrade)
        setTotalBuy(e.target.value)
    }

    const handlerOrderWithBuy = async () => {
        try {
            const data = {}
            data.amount = +amountBuy
            data.total = +totalBuy
            data.symbol = symbolTrade
            data.price = priceTrade
            data.status = 'BUY'
            console.log(data);
            if (data.amount === data.total / priceTrade) {
                const res = await axios.post('http://localhost:8000/users/spot-trade', data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log(res.data);
                onSuccess()
                toast.success('Order buy successfully')
            } else {
                toast.error('Invalid input')
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleChangeAmountWithSell = e => {
        setTotalSell(e.target.value * priceTrade)
        setAmountSell(e.target.value)
    }

    const handleChangeTotalWithSell = e => {
        setAmountSell(e.target.value / priceTrade)
        setTotalSell(e.target.value)
    }

    const handlerOrderWithSell = async () => {
        try {
            const data = {}
            data.amount = +amountSell
            data.total = +totalSell
            data.symbol = symbolTrade
            data.price = priceTrade
            data.status = 'SELL'
            console.log(data);
            if (data.amount === data.total / priceTrade) {
                const res = await axios.post('http://localhost:8000/users/spot-trade', data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log(res);
                toast.success('Order buy successfully')
            } else {
                toast.error('Invalid input')
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    return (
        <div className="flex flex-col gap-3">
            <div className="font-semibold text-2xl">Order</div>
            <div className="w-full grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <div>BUY</div>
                    <div className="bg-slate-700 rounded-lg flex px-4 py-4 justify-between">
                        <input
                            className="w-full bg-slate-700 outline-none"
                            placeholder="Amount"
                            value={amountBuy}
                            onChange={handleChangeAmountWithBuy}
                        />
                        <span>{coin}</span>
                    </div>
                    <div className="bg-slate-700 rounded-lg flex px-4 py-4 justify-between">
                        <input
                            className="w-full bg-slate-700 outline-none"
                            placeholder="Total"
                            value={totalBuy}
                            onChange={handleChangeTotalWithBuy}
                        />
                        <span>USDT</span>
                    </div>
                    <Button bg='green' name='BUY' height={50} onClick={handlerOrderWithBuy} />
                </div>
                <div className="flex flex-col gap-2">
                    <div>SELL</div>
                    <div className="bg-slate-700 rounded-lg flex px-4 py-4 justify-between">
                        <input
                            className="w-full bg-slate-700 outline-none"
                            placeholder="Amount"
                            value={amountSell}
                            onChange={handleChangeAmountWithSell}
                        />
                        <span>{coin}</span>
                    </div>
                    <div className="bg-slate-700 rounded-lg flex px-4 py-4 justify-between">
                        <input
                            className="w-full bg-slate-700 outline-none"
                            placeholder="Total"
                            value={totalSell}
                            onChange={handleChangeTotalWithSell}
                        />
                        <span>USDT</span>
                    </div>
                    <Button bg='red' name='BUY' height={50} onClick={handlerOrderWithSell} />
                </div>
                <button className="absolute top-1 right-2" onClick={onClose}>&#10005;</button>
            </div>
        </div>
    )
}
