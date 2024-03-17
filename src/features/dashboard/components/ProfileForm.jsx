import { useState } from 'react';
import useAuth from '../../auth/hooks/use-auth'
import axios from 'axios';
import profileImage from '../../../assets/profileImage.png'
import { useRef } from 'react';

export default function ProfileForm() {
    const { authUser } = useAuth()
    const fileEl = useRef()
    const [file, setFile] = useState(null)
    const [name, setName] = useState(authUser.name)
    const [image, setImage] = useState(authUser.profileImage)
    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        setIsEdit(true)


        console.log('edit');
    }

    const handleSave = async () => {
        try {
            setIsEdit(false)
            const token = localStorage.getItem('ACCESS_TOKEN')
            if (token) {
                const res = await axios.patch(`http://localhost:8000/users`, { name }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log(file);
                const formData = new FormData()
                formData.append('profileImage', file)
                const res2 = await axios.patch(`http://localhost:8000/users`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log(res.data);
                setName(res.data.name)
                console.log(res2.data);
                setImage(res2.data.profileImage)
                console.log('save');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangeName = e => {
        setName(e.target.value)
    }

    return (
        <div className="bg-slate-600 h-40 rounded-lg py-2 px-4 flex gap-4 items-center">
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
            {isEdit
                ? (<img
                    className="h-32 w-32 rounded-full"
                    src={file
                        ? URL.createObjectURL(file)
                        : authUser
                            ? image
                                ? image
                                : profileImage
                            : profileImage}
                />)
                : (<img
                    className="h-32 w-32 rounded-full"
                    src={image ? image : profileImage}
                />)
            }
            <div className='w-full h-full flex justify-between '>
                <div className='flex flex-col justify-center'>
                    <div>
                        User name:
                        {!isEdit
                            ? (<span>{name}</span>)
                            : (<input
                                className='outline-none'
                                value={name}
                                onChange={handleChangeName}
                            />)
                        }
                    </div>
                    <div>Email:{authUser.email}</div>
                    <div>Mobile:{authUser.mobile}</div>
                </div>
                <div>
                    {!isEdit
                        ? (<button
                            className='bg-gray-500 text-black px-4 py-1 rounded-lg font-semibold'
                            onClick={handleEdit}
                        >Edit
                        </button>)
                        : (<div className='flex flex-col gap-2'>
                            <button
                                className='bg-gray-500 text-black px-4 py-1 rounded-lg font-semibold'
                                onClick={() => {
                                    setFile(null)
                                    fileEl.current.value = ''
                                    setIsEdit(false)
                                }}
                            >Cancel
                            </button>
                            <button
                                className='bg-gray-500 text-black px-4 py-1 rounded-lg font-semibold'
                                onClick={() => fileEl.current.click()}
                            >Change image
                            </button>
                            <button
                                className='bg-gray-500 text-black px-4 py-1 rounded-lg font-semibold'
                                onClick={handleSave}
                            > Save
                            </button>
                        </div>)
                    }
                </div>
            </div>
        </div >
    )
}
