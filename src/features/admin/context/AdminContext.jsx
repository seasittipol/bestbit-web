import { useState, useEffect } from "react"
import { createContext } from "react"
import allUser from "../../../api/all-user"
import updateUserById from "../../../api/update-user"
import deleteUserById from "../../../api/delete-user"
import { toast } from "react-toastify"

export const AdminContext = createContext()

export default function AdminContextProvider({ children }) {
    const [editedUserData, setEditedUserData] = useState({
        id: '',
        name: '',
        email: '',
        mobile: ''
    });
    const [user, setUser] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    async function fetchAllUser() {
        const res = await allUser()
        setUser(res.data)
    }

    useEffect(() => {
        fetchAllUser()
    }, [])

    const handleEditUser = async (id) => {
        try {
            const editedUser = user.find(user => user.id === id);
            setEditedUserData(editedUser);
            setIsEdit(true)
        } catch (err) {
            toast.error(err.response?.data.message)
        }
    }

    const handleSaveUser = async (id) => {
        try {
            setIsEdit(false)
            const response = await updateUserById(editedUserData)
            toast.success('edit succes');
            fetchAllUser()
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data.message)
        }
    }

    const handleDeleteUser = async (id) => {
        try {
            const response = await deleteUserById(id)
            console.log(response);
            toast.success('Delete success')
            fetchAllUser()
        } catch (err) {
            toast.error(err.response?.data.message)
        }
    }

    return (
        <AdminContext.Provider value={{ user, isEdit, editedUserData, setEditedUserData, handleEditUser, handleSaveUser, handleDeleteUser }}>
            {children}
        </AdminContext.Provider>
    )
}
