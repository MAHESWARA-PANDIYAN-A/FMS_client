import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const register = async () => {
        try {
            const res = await axios.post('http://localhost:5000/bmp/signup', { name, phone, email, pass })
            setName('')
            setPhone('')
            setEmail('')
            setPass('')

            setMessage(res.data.message)
            setTimeout(() => navigate('/login'), 1000)
            setMessage('')
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="signup--card-container h-screen flex flex-col justify-center items-center ">
            <div className="signup-card bg-gray-100 opacity-50 w-100 text-center p-5 rounded-4xl shadow-2xl">
                <h1 className="signup-card-title text-gray-600 font-extrabold font-serif text-left text-5xl mb-5">Signup :</h1>
                <h2 className='pt-5 text-2xl'>UserName:</h2>
                <input className='border-b-4 rounded-b-2xl text-xl' value={name} onChange={(e) => setName(e.target.value)} required={true} ></input>
                <h2 className='pt-5 text-2xl'>Phone Number:</h2>
                <input className='border-b-4 rounded-b-2xl text-xl' value={phone} onChange={(e) => setPhone(e.target.value)} required={true}></input>
                <h2 className='pt-5 text-2xl'>Email:</h2>
                <input className='border-b-4 rounded-b-2xl text-xl' value={email} onChange={(e) => setEmail(e.target.value)} required={true}></input>
                <h2 className='pt-5 text-2xl'>Create_Password:</h2>
                <input className='border-b-4 rounded-b-2xl text-xl' value={pass} onChange={(e) => setPass(e.target.value)} required={true}></input>
                <h1><button className='mt-4 w-25 bg-gray-600 p-3 rounded-3xl font-bold cursor-pointer' onClick={register}>Signup</button></h1>

                <p className='text-center m-3'>Have_Account ? <a href='/'>Login</a></p>
            </div>
        </div>
    )
}

export default Signup