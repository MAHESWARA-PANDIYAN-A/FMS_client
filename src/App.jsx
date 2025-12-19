import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import User_Dashboard from './Pages/User_Dashboard'
import Admin_Dashboard from './Pages/Admin_Dashboard'

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'


const Layout = () => {

    const location = useLocation();
    const hide = ['/', '/signup'];
    const hideLayout = hide.includes(location.pathname);

    return (
        <>
            {!hideLayout && <Header />}

            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/admin_Dashboard' element={<Admin_Dashboard />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/user_Dashboard' element={<User_Dashboard />} />
            </Routes>

            {!hideLayout && <Footer />}
        </>
    )
}

const App = () => {
    return (
        <div>
            <Router>
                <Layout />
            </Router>
        </div>
    )
}

export default App