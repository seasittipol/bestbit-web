import axios from "axios";

export const getNameCoin = () => axios.get('http://localhost:8000/coins')