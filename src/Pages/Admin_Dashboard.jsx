import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Admin_Dashboard = () => {
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

  const pendingCount = requests.filter(req => req.status === 'Pending').length

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/bmp/requests')
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
      const user = JSON.parse(localStorage.getItem('user'))
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
      fetchRequests()
    } catch (err) {
      console.error('Error creating request:', err)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/bmp/requests/${id}/status`, { status })
      fetchRequests()
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-52 bg-gray-400 p-3 text-2xl font-mono">
        <p className="m-6 cursor-pointer">Overview</p>
        <p className="m-6 cursor-pointer">Investment</p>
        <p className="m-6 cursor-pointer">Partners</p>
        <p className="m-6 cursor-pointer">Reports</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 items-center">

        {/* Stats Cards (YOUR UI — unchanged) */}
        <div className="flex justify-between w-full max-w-5xl m-7 bg-gray-600 rounded-3xl p-4">
          <div className="flex flex-col items-center bg-gray-300 h-40 w-64 rounded-3xl">
            <h4 className="text-2xl p-4">Total Users</h4>
            <p className="text-3xl">0</p>
          </div>

          <div className="flex flex-col items-center bg-gray-300 h-40 w-64 rounded-3xl">
            <h4 className="text-2xl p-4">Active Partners</h4>
            <p className="text-3xl">0</p>
          </div>

          <div className="flex flex-col items-center bg-gray-300 h-40 w-64 rounded-3xl">
            <h4 className="text-2xl p-4">Pending Requests</h4>
            <p className="text-3xl">{pendingCount}</p>
          </div>
        </div>



        {/* Table */}
        <div className="w-full max-w-5xl bg-amber-50 mx-5 rounded-2xl overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Request No</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Plan</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
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
                    <td className="border px-4 py-2">
                      {item.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(item._id, 'Approved')}
                            className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(item._id, 'Rejected')}
                            className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>



      </div>
    </div>
  )
}

export default Admin_Dashboard
