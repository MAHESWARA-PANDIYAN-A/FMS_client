import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {


    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://fms-server-165n.onrender.com/bmp/login', { name, password: pass })
            localStorage.setItem('user', JSON.stringify(res.data))
            setName('')
            setPass('')
            setMessage('Login successful!')
            
            // Navigate based on role
            if (res.data.role === 'Admin') {
                setTimeout(() => navigate('/admin_Dashboard'), 1000)
            } else {
                setTimeout(() => navigate('/user_Dashboard'), 1000)
            }
            
            setTimeout(() => setMessage(''), 1000)
        }
        catch (err) {
            console.error(err)
            setMessage(err.response?.data?.message || 'Login failed')
        }
    }



    return (
        <div className="login-card-container h-screen flex flex-col justify-center items-center">
            <div className="login-card bg-gray-100 opacity-50 w-96 text-center rounded-3xl shadow-2xl p-6">
                <form onSubmit={login}>
                    <h1 className="login-card-title text-gray-600 font-extrabold font-serif text-left text-5xl mb-5">Login :</h1>
                    <h2 className='pt-3 text-3xl'>UserName:</h2>
                    <input className='border-b-4 rounded-b-2xl text-xl mt-5 p-2' value={name} onChange={(e) => setName(e.target.value)} required />
                    <h2 className='pt-3 text-3xl'>Password:</h2>
                    <input type='password' className='border-b-4 rounded-b-2xl text-xl mt-5 p-2' value={pass} onChange={(e) => setPass(e.target.value)} required />
                    <div><button type='submit' className='mt-4 w-24 bg-gray-600 text-white p-3 rounded-3xl font-bold cursor-pointer hover:bg-gray-700'>Login</button></div>
                </form>
                {message && <p className='text-center mt-3 text-red-600'>{message}</p>}
                <p className='text-center mt-5'>New User? <Link to='/signup' className='text-blue-600 hover:underline'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login