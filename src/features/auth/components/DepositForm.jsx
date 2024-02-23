import qrCode from '../../../assets/qrcode.jpg'
import imageNull from '../../../assets/imageNull.png'
import Button from '../../../layouts/Button'
import { useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function DepositForm() {
    const fileEl = useRef()
    const [file, setFile] = useState(null)
    const [amount, setAmount] = useState('')
    const handleSend = async () => {
        try {
            const token = localStorage.getItem('ACCESS_TOKEN')
            if (token) {
                console.log(file);
                const formData = new FormData()
                formData.append('depositImage', file)
                formData.append('amount', amount)
                const res = await axios.patch(`http://localhost:8000/users/deposit`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log(res.data);
                console.log('send');
                toast.success('success deposit')
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSaveAmount = e => {
        console.log(e.target);
        const amount = e.target.name.split(' ')[0].split(',').join('')
        setAmount(amount)
    }

    const handleChange = e => {
        console.log(amount);
        setAmount(e.target.value)
    }

    return (
        <div className="bg-slate-600 h-min-40 rounded-lg py-4 px-4 flex flex-col items-center justify-center gap-4">
            <div className=''>
                <div>Deposit</div>
                <div className='flex justify-evenly gap-4'>
                    <Button name='1,000 Baht' symbol='1,000 Baht' onClick={handleSaveAmount} />
                    <Button name='10,000 Baht' symbol='10,000 Baht' onClick={handleSaveAmount} />
                    <Button name='100,000 Baht' symbol='100,000 Baht' onClick={handleSaveAmount} />
                    <input
                        className='outline-none'
                        type="text" placeholder='enter amount deposit'
                        value={amount}
                        onChange={handleChange}
                    />
                    {/* <Button name='Confirm' /> */}
                </div>
            </div>
            <div className='w-full flex gap-10 justify-center items-center'>
                <img className='w-80' src={qrCode} />
                <input
                    type='file'
                    className='hidden'
                    ref={fileEl}
                    onChange={e => {
                        if (e.target.files[0]) {
                            setFile(e.target.files[0])
                        }
                    }}
                />
                <div className='gap-2 flex flex-col'>
                    <div className='flex gap-1'>
                        <img className='rounded' src={file ? URL.createObjectURL(file) : imageNull} />
                    </div>
                    <Button color='white' name='Upload image' onClick={() => fileEl.current.click()} />
                    <Button bg='amber' color='white' name='Send' onClick={handleSend} />
                </div>
            </div>
        </div>
    )
}
