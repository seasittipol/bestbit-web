import axios from "axios";

const token = localStorage.getItem('ACCESS_TOKEN')

const deleteUserById = async (id) => {
    return await axios.delete(`http://localhost:8000/admins/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export default deleteUserById