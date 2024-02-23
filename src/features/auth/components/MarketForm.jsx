import { useState } from "react";
import { useEffect } from "react";
import priceTicket from "../../../api/current-price"
import Button from "../../../layouts/Button";
import SpotTradeModal from "./SpotTradeModal";
import useAuth from '../hooks/use-auth'

export default function MarketForm() {
    const { authUser } = useAuth()
    const [price, setPrice] = useState([])
    const [loading, setLoading] = useState(true)
    const [openTrade, setOpenTrade] = useState(false)
    const [priceTrade, setPriceTrade] = useState(0)
    const [symbolTrade, setSymbolTrade] = useState('')

    useEffect(() => {
        setTimeout(() => {
            const fetchPrice = async () => {
                const response = await priceTicket()
                setPrice(response)
                setLoading(false)
                console.log(price);
            }
            fetchPrice()
        }, 5 * 1000)
    })

    const handlerToggleModal = e => {
        setPriceTrade(e.target.value)
        setSymbolTrade(e.target.name)
        setOpenTrade(!openTrade)
    }

    return (
        <>
            <div className="relative bg-gray-600 rounded-lg px-8 py-4 min-h-96">
                {authUser.isAdmin
                    ? (
                        <div className="grid grid-cols-3">
                            <div>Symbol</div>
                            <div>Price</div>
                            <div>24h-Change</div>
                        </div>
                    )
                    : (
                        <div className="grid grid-cols-4">
                            <div>Symbol</div>
                            <div>Price</div>
                            <div>24h-Change</div>
                        </div>
                    )}
                {loading && <div>Loading...</div>}
                {authUser.isAdmin
                    ? (
                        price.map(el => (
                            <div key={el.data.symbol} className="grid grid-cols-3 mt-2">
                                <div className="flex gap-2">
                                    <img
                                        className="w-6 h-6 rounded-full"
                                        src="https://i.pinimg.com/736x/16/af/11/16af11cfede502db66e20f547474da79.jpg"
                                    />
                                    <span>{el?.data.symbol}</span>
                                </div>
                                <div>$ {el?.data.price || '-'}</div>
                                <div>-</div>
                            </div>
                        ))
                    )
                    : (
                        price.map(el => (
                            <div key={el.data.symbol} className="grid grid-cols-4 mt-2">
                                <div className="flex gap-2">
                                    <img
                                        className="w-6 h-6 rounded-full"
                                        src="https://i.pinimg.com/736x/16/af/11/16af11cfede502db66e20f547474da79.jpg"
                                    />
                                    <span>{el?.data.symbol}</span>
                                </div>
                                <div>$ {el?.data.price || '-'}</div>
                                <div>-</div>
                                <Button symbol={`${el?.data.symbol}`} value={`${el?.data.price}`} name='Spot trade' onClick={handlerToggleModal} />
                            </div>
                        ))
                    )}
            </div>
            {openTrade && (
                <div className="absolute bg-slate-800 rounded-lg inset-1/4 w-[600px] h-80 flex justify-center items-center ">
                    <SpotTradeModal priceTrade={priceTrade} symbolTrade={symbolTrade} onClose={handlerToggleModal} onSuccess={() => setOpenTrade(!openTrade)} />
                </div>
            )}
        </>
    )
}
