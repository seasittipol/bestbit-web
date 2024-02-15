import { useState } from "react";
import priceTicket from "../api/current-price"
import { useEffect } from "react";

export default function MarketPage() {
    const [price, setPrice] = useState([])

    useEffect(() => {
        setTimeout(() => {
            const fetchPrice = async (req, res, next) => {
                const response = await priceTicket()
                console.log(response);
                setPrice(response)
                console.log(price);
            }
            fetchPrice()
        }, 60 * 1000)
    })

    return (
        <div className="px-20">
            <div>
                <span>Market Overview</span>
            </div>
            <div className="bg-gray-600 rounded-lg px-8 py-4 min-h-96">
                <div className="grid grid-cols-3">
                    <div>Name</div>
                    <div>Price</div>
                    <div>24h-Change</div>
                </div>
                <div className="grid grid-cols-3 mt-2">
                    <div className="flex gap-2">
                        <img
                            className="w-6 h-6"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
                        />
                        <span>Bitcoin</span>
                    </div>
                    <div>$ {price[0]?.data.price || '-'}</div>
                    <div>-</div>
                </div>
                <div className="grid grid-cols-3 mt-2">
                    <div className="flex gap-2">
                        <img
                            className="w-6 h-6"
                            src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png"
                        />
                        <span>Ethereum</span>
                    </div>
                    <div>$ {price[1]?.data.price || '-'}</div>
                    <div>-</div>
                </div>
                <div className="grid grid-cols-3 mt-2">
                    <div className="flex gap-2">
                        <img
                            className="w-6 h-6"
                            src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Binance-Coin-BNB-icon.png"
                        />
                        <span>BNB</span>
                    </div>
                    <div>$ {price[2]?.data.price || '-'}</div>
                    <div>-</div>
                </div>
            </div>
        </div>
    )
}
