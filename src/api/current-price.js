import axios from "axios";

// const coin = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'AVAXUSDT', 'LINKUSDT', 'DOGEUSDT', 'TRXUSDT', 'DOTUSDT', 'MATICUSDT']

const priceTicket = async () => {
    const { data } = await axios.get('http://localhost:8000/coins')
    const symbolArray = data.map(el => el.symbol)
    console.log(symbolArray);
    const res = await Promise.all(symbolArray.map(el => axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${el}`)))
    console.log(res);
    const finalTicket = res.map(el => {
        el.data.detail = data.filter(e =>
            e.symbol == el.data.symbol
        )
        return el
    })
    console.log(finalTicket);
    return finalTicket
}

export default priceTicket