import { useState } from "react"
import axios from "axios"
import { validateLogin } from "../validations/validate-login"
import useAuth from "../hooks/use-auth"
import { toast } from "react-toastify";

export default function LoginForm({ onOpen }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAuthUser } = useAuth()

    const handleChangePassword = e => {
        setPassword(e.target.value)
    }

    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const data = { email, password }
            validateLogin(data)
            const response = await axios.post(`http://localhost:8000/auth/login`, data)
            console.log(response.data);
            localStorage.setItem('ACCESS_TOKEN', response.data.accessToken)
            setAuthUser(response.data.user)
            toast.success('Log in success')

        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-96 flex flex-col gap-2">
                <span className="text-white">Log in</span>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" className="grow" placeholder="Email" value={email} onChange={handleChangeEmail} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="text" className="grow" placeholder="Password" value={password} onChange={handleChangePassword} />
                </label>
                <button className="border rounded-lg py-2">Log in</button>
            </div>
            <button type="button" className="w-96 border rounded-lg py-2 mt-4" onClick={() => onOpen(true)}>Sign up</button>
        </form>
    )
}
