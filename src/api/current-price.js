import axios from "axios";

const coin = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'AVAXUSDT', 'LINKUSDT', 'DOGEUSDT', 'TRXUSDT', 'DOTUSDT', 'MATICUSDT']

const priceTicket = async () => {
    const { data } = await axios.get('http://localhost:8000/coins')
    const totalCoin = data.map(el => el.symbol)
    const res = await Promise.all(totalCoin.map(el => axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${el}`)))
    return res
}

export default priceTicket