import React from 'react'
import image from '../assets/bmpimg.jpg'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div>
            <header className='bg-gray-600 h-20 w-screen flex  items-center justify-around'>
                <div className='flex flex-row items-center'>
                    <img src={image} alt="logo" className=' h-15 rounded-full ml-20 hover:scale-125 transition duration-150' ></img>
                    <h1 className='text-gray-300 font-mono text-5xl ml-3'>BMP Finance</h1>
                </div>

                <div className='flex gap-1.5'>
                    <ul className='flex gap-x-5 mr-25'>
                        <li onClick={handleLogout} className='text-2xl font-serif text-gray-300 hover: transition duration-150 hover:scale-120 hover:text-gray-900 cursor-pointer'>Logout</li>
                    </ul>
                </div>

            </header>
        </div>
    )
}

export default Header