import axios from "axios";

const token = localStorage.getItem('ACCESS_TOKEN')

const updateUserById = async (data) => {
    return await axios.patch(`http://localhost:8000/admins/user`, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export default updateUserById