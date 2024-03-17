import axios from "axios";

const symbolTicket = async () => {
    const { data } = await axios.get('http://localhost:8000/coins')
    const totalSymbol = await data.map(el => el.symbol)
    return data
}

export default symbolTicket