import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem('ACCESS_TOKEN')
const allUser = async () => {
    try {
        return await axios.get('http://localhost:8000/admins/user', {
            headers: { Authorization: `Bearer ${token}` }
        })
    } catch (err) {
        toast.error(err.message)
    }
}

export default allUser