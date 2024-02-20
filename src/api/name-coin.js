import axios from "axios";

const nameTicket = async () => {
    const { data } = await axios.get('http://localhost:8000/coins')
    const totalName = await data.map(el => el.name)
    return totalName
}

export default nameTicket