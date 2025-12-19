import React from 'react'
import image from '../assets/bmpimg.jpg'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <header className='bg-gray-600 h-20 w-screen flex items-center justify-around'>
            <div className='flex items-center'>
                <img src={image} alt="logo" className='h-16 rounded-full ml-20 hover:scale-125 transition duration-150' />
                <h1 className='text-gray-300 font-mono text-5xl ml-3'>BMP Finance</h1>
            </div>

            <button 
                onClick={handleLogout} 
                className='text-2xl font-serif text-gray-300 hover:scale-110 hover:text-gray-100 cursor-pointer transition duration-150'
            >
                Logout
            </button>
        </header>
    )
}

export default Header