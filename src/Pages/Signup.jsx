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
    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://fms-server-165n.onrender.com/bmp/signup', { name, phone, email, password: pass })
            setName('')
            setPhone('')
            setEmail('')
            setPass('')

            setMessage(res.data.message)
            setTimeout(() => {
                navigate('/login')
                setMessage('')
            }, 1000)
        }
        catch (err) {
            console.error(err)
            setMessage(err.response?.data?.message || 'Signup failed')
        }
    }

    return (
        <div className="signup--card-container h-screen flex flex-col justify-center items-center">
            <div className="signup-card bg-gray-100 opacity-50 w-96 text-center p-6 rounded-3xl shadow-2xl">
                <form onSubmit={register}>
                    <h1 className="signup-card-title text-gray-600 font-extrabold font-serif text-left text-5xl mb-5">Signup :</h1>
                    <h2 className='pt-5 text-2xl'>UserName:</h2>
                    <input className='border-b-4 rounded-b-2xl text-xl p-2' value={name} onChange={(e) => setName(e.target.value)} required />
                    <h2 className='pt-5 text-2xl'>Phone Number:</h2>
                    <input className='border-b-4 rounded-b-2xl text-xl p-2' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <h2 className='pt-5 text-2xl'>Email:</h2>
                    <input type='email' className='border-b-4 rounded-b-2xl text-xl p-2' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <h2 className='pt-5 text-2xl'>Create Password:</h2>
                    <input type='password' className='border-b-4 rounded-b-2xl text-xl p-2' value={pass} onChange={(e) => setPass(e.target.value)} required />
                    <div><button type='submit' className='mt-4 w-24 bg-gray-600 text-white p-3 rounded-3xl font-bold cursor-pointer hover:bg-gray-700'>Signup</button></div>
                </form>
                {message && <p className='text-center mt-3 text-red-600'>{message}</p>}
                <p className='text-center m-3'>Have Account? <a href='/' className='text-blue-600 hover:underline'>Login</a></p>
            </div>
        </div>
    )
}

export default Signup