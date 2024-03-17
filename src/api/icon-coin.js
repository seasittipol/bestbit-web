import axios from "axios";

const iconTicket = async () => {
    const { data } = await axios.get('http://localhost:8000/coins')
    const iconArray = data.map(el => el.iconImage)
    return iconArray
}

export default iconTicket