import { useState } from "react";
import { useEffect } from "react";
import nameTicket from "../../../api/name-coin";
import axios from "axios";
import { toast } from "react-toastify";
import symbolTicket from "../../../api/sympol-coin";
import Button from "../../../layouts/Button";
import { Link } from "react-router-dom";
import { useRef } from "react";

const initialize = {
    symbol: '',
    name: '',
    image: null
}

export default function CoinTable() {
    const fileEl = useRef()
    const [file, setFile] = useState(null)
    const [coinName, setCoinName] = useState([])
    const [coinSymbol, setCoinSymbol] = useState([])
    const [addCoin, setAddCoin] = useState(initialize)
    const [isEdit, setIsEdit] = useState(false)
    const [rerender, setRerender] = useState(false)
    const [editRow, setEditRow] = useState('')
    const [editName, setEditName] = useState('')

    useEffect(() => {
        const coinName = async () => {
            try {
                const res = await nameTicket()
                const res2 = await symbolTicket()
                if (res) setCoinName(res)
                if (res2) setCoinSymbol(res2)
                console.log(res2);
            } catch (err) {
                console.log(err);
            }
        }
        coinName()
    }, [rerender, addCoin])

    const handleChange = e => {
        const coinObj = { ...addCoin }
        coinObj[e.target.name] = e.target.value
        console.log(coinObj);
        setAddCoin(coinObj)
    }

    const token = localStorage.getItem('ACCESS_TOKEN')

    const handleSubmitCreateCoin = async () => {
        const formData = new FormData()
        formData.append('iconImage', file)
        const res = await axios.patch(`http://localhost:8000/admins/create-coin`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = { ...addCoin }
        data.iconImage = res.data.url
        console.log(data);
        await axios.post('http://localhost:8000/admins/create-coin', data, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setAddCoin(initialize)
        console.log(addCoin);
        toast.success('Create coin successs')
    }

    const handleEditCoin = e => {
        setEditRow(e.target.name)
        setIsEdit(true)
    }

    const handleChangeEditCoin = e => {
        setEditName(e.target.value)
    }

    const handleSaveCoin = async e => {
        const response = await axios.get('http://localhost:8000/admins', {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response.data);
        const editObj = response.data.filter(el => el.name == editRow)
        console.log(editObj);
        let symbol = {}
        if (editObj) {
            symbol.symbol = editObj[0].symbol
        } else throw new Error('mai dai')
        console.log(symbol);
        const updateObj = {
            ...symbol,
            name: editName
        }
        console.log(updateObj);
        const res = await axios.patch('http://localhost:8000/admins/update-coin', updateObj, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(res);
        setRerender(!rerender)
        setEditName(e.target.value)
        setIsEdit(false)
        console.log('mak');
    }

    const handleDeleteCoin = async e => {
        const data = {}
        data.name = e.target.name
        await axios.delete('http://localhost:8000/admins/delete-coin', {
            headers: { Authorization: `Bearer ${token}` },
            data
        })
        setRerender(!rerender)
        toast.success('Delete coin successs')
    }

    console.log(coinSymbol);
    return (
        <>
            <div className="flex justify-end gap-4">
                <Link to='/dashboard/transaction'>
                    <Button name='Transaction' />
                </Link>
                <Link to='/dashboard/user'>
                    <Button name='All User' />
                </Link>
            </div>
            <div className="bg-slate-600 min-h-10 rounded-lg py-2 px-4 flex flex-col items-center">
                <div className="w-4/5">
                    <div className="flex gap-24">
                        <span>Symbol</span>
                        <span>Name</span>
                    </div>
                </div>
                <div className="flex gap-8 w-4/5">
                    <div className="flex flex-col mt-2 gap-2">
                        {coinSymbol?.map(el => (
                            <div key={el.id} className="flex gap-2">
                                <img
                                    className="w-6 h-6 rounded-full"
                                    src={el.iconImage}
                                />
                                <div className="h-[26px]">{el.symbol} </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full">
                        {coinName?.map(el => (
                            <div key={el} className="flex mt-2 gap-4 justify-between px-">
                                <div className="flex gap-2">
                                    {isEdit && editRow == el
                                        ? <input className="outline-none" value={editName || el} onChange={handleChangeEditCoin}></input>
                                        : <span className="h-[26px]">{el}</span>
                                    }
                                </div>
                                <div className="flex gap-4">
                                    {isEdit && editRow == el
                                        ? <button className="border px-4 rounded-full" name={el} onClick={handleSaveCoin}>Save</button>
                                        : <button className="border px-4 rounded-full" name={el} onClick={handleEditCoin}>Edit</button>
                                    }
                                    <button className="border px-2 rounded-full" name={el} onClick={handleDeleteCoin}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-1">
                            <span>Symbol</span>
                            <input name="symbol" className="outline-none" value={addCoin.symbol} onChange={handleChange}></input>
                            <span>Name</span>
                            <input name="name" className="outline-none" value={addCoin.name} onChange={handleChange}></input>
                            <span>Icon</span>
                            <div className="flex gap-4 items-center justify-center">
                                <img
                                    className="w-6 h-6 rounded-full"
                                    src={file
                                        ? URL.createObjectURL(file)
                                        : "https://i.pinimg.com/736x/16/af/11/16af11cfede502db66e20f547474da79.jpg"}
                                />
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
                                <Button
                                    name='Add Icon'
                                    className='bg-gray-500 text-black px-4 py-1 rounded-lg font-semibold'
                                    onClick={() => fileEl.current.click()}
                                />
                                <Button name='Create Coin' bg='amber' className="border" onClick={handleSubmitCreateCoin} />
                            </div>
                        </div>
                    </div>
                    {/* <input name="image" value={addCoin.image} onChange={handleChange}></input> */}
                </div>
            </div>
        </>
    )
}
