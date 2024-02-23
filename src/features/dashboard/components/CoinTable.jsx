import { useState } from "react";
import { useEffect } from "react";
import nameTicket from "../../../api/name-coin";
import axios from "axios";
import { toast } from "react-toastify";
import symbolTicket from "../../../api/sympol-coin";
import Button from "../../../layouts/Button";
import { Link } from "react-router-dom";

const initialize = {
    symbol: '',
    name: '',
    // image: null
}

export default function CoinTable() {
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
                console.log(1);
                if (res) setCoinName(res)
                if (res2) setCoinSymbol(res2)
            } catch (err) {
                console.log(err);
            }
        }
        coinName()
    }, [rerender, addCoin])

    const handleChange = e => {
        const coinObj = { ...addCoin }
        const a = e.target.name
        const b = e.target.value
        coinObj[a] = b
        console.log(coinObj);
        setAddCoin(coinObj)
    }

    const token = localStorage.getItem('ACCESS_TOKEN')

    const handleSubmitCreateCoin = async () => {
        console.log(addCoin);
        await axios.post('http://localhost:8000/admins/create-coin', addCoin, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setAddCoin(initialize)
        toast.success('Create coin successs')
    }

    const handleEditCoin = e => {
        setEditRow(e.target.name)
        setIsEdit(true)
        console.log('best lhor', e.target.name);
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

    return (
        <>
            <div className="flex justify-end">
                <Link to='/dashboard/transaction'>
                    <Button name='Transaction' />
                </Link>
            </div>
            <div className="bg-slate-600 min-h-10 rounded-lg py-2 px-4 fle flex-colx items-center">
                <div className="grid grid-cols-3">
                    <div className="flex justify-between">
                        <span>Symbol</span>
                        <span>Name</span>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col mt-2 gap-2">
                        {coinSymbol?.map(el => (
                            <div className="flex gap-2">
                                <img
                                    className="w-6 h-6 rounded-full"
                                    src="https://i.pinimg.com/736x/16/af/11/16af11cfede502db66e20f547474da79.jpg"
                                />
                                <div className="h-[26px]" key={el}>{el} </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {coinName?.map(el => (
                            <div key={el} className="grid grid-cols-2 mt-2 gap-4">
                                <div className="flex gap-2">
                                    {isEdit && editRow == el
                                        ? <input value={editName || el} onChange={handleChangeEditCoin}></input>
                                        : <span>{el}</span>
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
                    <span>symbol</span>
                    <input name="symbol" value={addCoin.symbol} onChange={handleChange}></input>
                    <span>name</span>
                    <input name="name" value={addCoin.name} onChange={handleChange}></input>
                    <span>image</span>
                    <input name="image" value={addCoin.image} onChange={handleChange}></input>
                    <button className="border" onClick={handleSubmitCreateCoin}>Create Coin</button>
                </div>
            </div>
        </>
    )
}
