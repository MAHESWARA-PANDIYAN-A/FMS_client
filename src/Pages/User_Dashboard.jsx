import React, { useState, useEffect } from 'react'
import axios from 'axios'

const User_Dashboard = () => {
    const [requests, setRequests] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        requestNo: '',
        date: '',
        customer: '',
        amount: '',
        plan: '',
        priority: ''
    })
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
        if (userData) {
            fetchUserRequests(userData._id)
        }
    }, [])

    const fetchUserRequests = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:5000/bmp/requests/user/${userId}`)
            setRequests(res.data)
        } catch (err) {
            console.error('Error fetching requests:', err)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/bmp/requests', {
                ...formData,
                userId: user._id
            })
            setFormData({
                requestNo: '',
                date: '',
                customer: '',
                amount: '',
                plan: '',
                priority: ''
            })
            setIsOpen(false)
            fetchUserRequests(user._id)
        } catch (err) {
            console.error('Error creating request:', err)
        }
    }

    const totalAmount = requests.reduce((sum, req) => req.status === 'Approved' ? sum + req.amount : sum, 0)
    const approvedCount = requests.filter(req => req.status === 'Approved').length
    const pendingCount = requests.filter(req => req.status === 'Pending').length

    return (
        <>
            <div className='h-screen'>
                <h1 className='text-gray-300 text-center text-4xl m-3'>Welcome {user?.name}!!</h1>
                <div className='top-car  bg-gray-300 h-30 m-5 rounded-4xl p-3 text-4xl font-serif flex justify-between'>

                    <div className=' tot_box border-4 rounded-4xl w-60 px-6 py-3 bg-gray-600 text-center text-gray-300 text-xl'>
                        <h4>Total Investment</h4>
                        <p>₹{totalAmount}</p>
                    </div>

                    <div className="in_re border-4 rounded-4xl w-60 px-6 py-3 bg-gray-600 text-center text-gray-300 text-xl">
                        <h4>Investment Return</h4>
                        <p>₹{Math.round(totalAmount * 0.12)}</p>
                    </div>

                    <div className="req_box border-4 rounded-4xl  bg-gray-600 w-150 flex justify-around p-1">
                        <div className='border-4 rounded-4xl w-45 text-center p-1 text-xl bg-gray-300'>
                            <h4>Total Request</h4>
                            <p className='text-4xl'>{requests.length}</p>
                        </div>
                        <div className='approve_box border-4 rounded-4xl w-45  text-center p-1 text-xl  bg-gray-300'>
                            <h4>Approved </h4>
                            <p className='text-4xl'>{approvedCount}</p>
                        </div>
                        <div className='pending_box border-4 rounded-4xl w-45 text-center p-1  text-xl  bg-gray-300'>
                            <h4>Pending </h4>
                            <p className='text-4xl '>{pendingCount}</p>
                        </div>
                    </div>

                </div>

                <div className='view_box m-5 p-5 rounded-3xl bg-gray-300'>
                    <div className='text-end '>
                        <button onClick={() => setIsOpen(true)} className='bg-gray-600 p-3 rounded-4xl text-gray-300 cursor-pointer'>ADD</button>
                    </div>

                    <table className='w-full border-collapse border border-gray-400 mt-3'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='border px-4 py-2'>Request No</th>
                                <th className='border px-4 py-2'>Date</th>
                                <th className='border px-4 py-2'>Customer</th>
                                <th className='border px-4 py-2'>Amount</th>
                                <th className='border px-4 py-2'>Plan</th>
                                <th className='border px-4 py-2'>Priority</th>
                                <th className='border px-4 py-2'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        No requests added
                                    </td>
                                </tr>
                            ) : (
                                requests.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="border px-4 py-2">{item.requestNo}</td>
                                        <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">{item.customer}</td>
                                        <td className="border px-4 py-2">₹{item.amount}</td>
                                        <td className="border px-4 py-2">{item.plan}</td>
                                        <td className="border px-4 py-2">{item.priority}</td>
                                        <td className="border px-4 py-2">
                                            <span className={`px-2 py-1 rounded ${
                                                item.status === 'Approved' ? 'bg-green-200 text-green-800' :
                                                item.status === 'Rejected' ? 'bg-red-200 text-red-800' :
                                                'bg-yellow-200 text-yellow-800'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>

                {/* Modal */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded w-96">
                            <h3 className="text-xl mb-4">Add Investment Request</h3>

                            <input className="border p-2 w-full mb-2" name="requestNo" placeholder="Request No" value={formData.requestNo} onChange={handleChange} />
                            <input className="border p-2 w-full mb-2" type="date" name="date" value={formData.date} onChange={handleChange} />
                            <input className="border p-2 w-full mb-2" name="customer" placeholder="Customer" value={formData.customer} onChange={handleChange} />
                            <input className="border p-2 w-full mb-2" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
                            <input className="border p-2 w-full mb-2" name="plan" placeholder="Plan" value={formData.plan} onChange={handleChange} />
                            <input className="border p-2 w-full mb-2" name="priority" placeholder="Priority" value={formData.priority} onChange={handleChange} />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="border px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default User_Dashboard