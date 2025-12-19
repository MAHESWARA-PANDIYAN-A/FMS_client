import React from 'react'

const User_Dashboard = () => {
    return (
        <>
            <div className='h-screen'>
                <h1 className='text-gray-300 text-center text-4xl m-3'>Welcome User!!</h1>
                <div className='top-car  bg-gray-300 h-30 m-5 rounded-4xl p-3 text-4xl font-serif flex justify-between'>

                    <div className=' tot_box border-4 rounded-4xl w-60 px-6 py-3 bg-gray-600 text-center text-gray-300 text-xl'>
                        <h4>Total Investment</h4>
                        <p>0</p>
                    </div>

                    <div className="in_re border-4 rounded-4xl w-60 px-6 py-3 bg-gray-600 text-center text-gray-300 text-xl">
                        <h4>Investment Return</h4>
                        <p>0</p>
                    </div>

                    <div className="req_box border-4 rounded-4xl  bg-gray-600 w-150 flex justify-around p-1">
                        <div className='border-4 rounded-4xl w-45 text-center p-1 text-xl bg-gray-300'>
                            <h4>Total Request</h4>
                            <p className='text-4xl'>0</p>
                        </div>
                        <div className='approve_box border-4 rounded-4xl w-45  text-center p-1 text-xl  bg-gray-300'>
                            <h4>Approved </h4>
                            <p className='text-4xl'>0</p>
                        </div>
                        <div className='pending_box border-4 rounded-4xl w-45 text-center p-1  text-xl  bg-gray-300'>
                            <h4>Pending </h4>
                            <p className='text-4xl '>0</p>
                        </div>
                    </div>

                </div>

                <div className='view_box m-5 p-5 rounded-3xl bg-gray-300'>
                    <div className='text-end '>
                        <button className='bg-gray-600 p-3 rounded-4xl text-gray-300 cursor-pointer'>ADD</button>
                    </div>

                    <table className='table-auto flex flex-col border-collapse border border-gray-400 mt-3'>
                        <thead>
                            <tr className='flex justify-around'>
                                <th className=''>Request No</th>
                                <th className=''>Date</th>
                                <th className=''>Customer</th>
                                <th className=''>Amount</th>
                                <th className=''>Plan</th>
                                <th className=''>Priority</th>
                                <th className=''>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='flex justify-around'>
                                <td className=''>Mahes</td>
                                <td className=''>03-03-2025</td>
                                <td className=''>Madan</td>
                                <td className=''>40000</td>
                                <td className=''>1</td>
                                <td className=''>2</td>
                                <td className=''>Pending</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </>
    )
}

export default User_Dashboard