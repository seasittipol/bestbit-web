import axios from "axios";

const coin = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'AVAXUSDT', 'LINKUSDT', 'DOGEUSDT', 'TRXUSDT', 'DOTUSDT', 'MATICUSDT']

const priceTicket = async () => await Promise.all(coin.map(el => axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${el}`)))

export default priceTicket