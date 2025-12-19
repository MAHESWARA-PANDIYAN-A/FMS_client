import React, { useState } from 'react'

const Admin_Dashboard = () => {

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

        {/* Table Header */}
        <div className="w-full max-w-5xl flex justify-end items-center mb-3">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Request
          </button>
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
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.customer}</td>
                    <td className="border px-4 py-2">{item.amount}</td>
                    <td className="border px-4 py-2">{item.plan}</td>
                    <td className="border px-4 py-2">{item.priority}</td>
                    <td className="border px-4 py-2">{item.status}</td>
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
              <h3 className="text-xl mb-4">Add Request</h3>

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
    </div>
  )
}

export default Admin_Dashboard
