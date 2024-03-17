import axios from "axios"
import { useState } from "react"
import { validateRegister } from "../validations/validate-register"
import { toast } from "react-toastify"

export default function RegisterForm({ onOpen }) {
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChangePassword = e => {
        setPassword(e.target.value)
    }
    const handleChangeConfirmPassword = e => {
        setConfirmPassword(e.target.value)
    }

    const handleChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleChangeMobile = e => {
        setMobile(e.target.value)
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const data = { email, mobile, password, confirmPassword }
            console.log(data);
            validateRegister(data)
            const response = await axios.post(`http://localhost:8000/auth/register`, data)
            if (response) {
                onOpen(false)
            }
        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className="w-96 flex flex-col gap-4 relative">
                <span className="text-white">Sign up</span>
                <div className="absolute right-0">
                    <button type="button" onClick={() => onOpen(false)}>Close</button>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" className="grow" placeholder="Email" value={email} onChange={handleChangeEmail} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg><input type="text" className="grow" placeholder="Mobile" value={mobile} onChange={handleChangeMobile} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="text" className="grow" placeholder="Password" value={password} onChange={handleChangePassword} />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="text" className="grow" placeholder="ConfirmPassword" value={confirmPassword} onChange={handleChangeConfirmPassword} />
                </label>
                <button className="rounded-md bg-green-500 text-black h-10">Create account</button>
            </div>
        </form>
    )
}
