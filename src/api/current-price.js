import axios from "axios";
import { getNameCoin } from "./name-coin";

const coin = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'AVAXUSDT', 'LINKUSDT', 'DOGEUSDT', 'TRXUSDT', 'DOTUSDT', 'MATICUSDT']


const nameCoin = async () => {
    console.log(1);
    const response = await getNameCoin()
    console.log(response);
}

const priceTicket = async () => await Promise.all(coin.map(el => axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${el}`)))

export default priceTicket