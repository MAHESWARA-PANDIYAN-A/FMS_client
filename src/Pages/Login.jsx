import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  
  const [name,setName] = useState('')
  const [pass,setPass] =useState('')
  const [message,setMessage]= useState('');
  const navigate = useNavigate();
  const login = async () => {
      try{
          const res=await axios.post('http://localhost:5000/lms/login',{name,pass})
          setName('')
          setPass('')
          setMessage(res.data.message)
          setTimeout(()=>navigate('/user_Dashboard'),1000)
          setMessage('')
      }
      catch(err){
          console.error(err)
      }
  }



  return (
        <div className="login-card-container h-screen flex flex-col justify-center items-center ">
            <div className="login-card bg-gray-100 opacity-50 h-100 w-100 text-center rounded-4xl shadow-2xl">
                <h1 className="login-card-title text-gray-600 font-extrabold font-serif text-left p-3 text-5xl ">Login :</h1>
                <h2 className='pt-3 text-3xl'>UserName:</h2>
                <input className='border-b-4 rounded-b-2xl text-xl mt-5 ' value={name} onChange={(e)=>setName(e.target.value)} required={true}></input>
                <h2 className='pt-3 text-3xl'>Password:</h2>
                <input className='border-b-4 rounded-b-2xl text-xl mt-5 '></input>
                <h1><button className='mt-4 w-25 bg-gray-600 p-3 rounded-3xl font-bold cursor-pointer' value={pass} onChange={(e)=>setPass(e.target.value)} required={true}>Login</button></h1>
                <p className='text-center mt-5 '>New_User ? <a href='/signup'>sign up</a></p>
            </div>
        </div>
  )
}

export default Login