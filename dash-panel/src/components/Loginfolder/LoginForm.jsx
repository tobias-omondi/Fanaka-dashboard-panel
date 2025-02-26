import React from 'react'

const LoginForm = () => {
  return (
    <div>
     <div className='bg-white flex flex-col justify-center items-center w-80 md:xl mx-auto shadow-lg rounded-4xl p-10'>
       <h2 className='text-gray-500 font-bold text-center'>Admin Login</h2>
       <div className='flex flex-col'>
        <form className='flex flex-col gap-2'>
            <label className='text-gray-600'>Username:</label>
            <input type='name' id='name'
            className="bg-white border border-gray-900 p-1.5 text-sm rounded block focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"/>
            <label className='text-gray-600'>Password:</label>
            <input type='password' id='password' 
            className= "bg-white border border-gray-900 p-1.5 text-sm rounded block focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"/>
            <div className='justify-center items-center flex mx-auto '>
             <button type='submit'
             className='bg-orange-500 px-5 py-1 shadow rounded cursor-pointer text-white'>Login</button>
            </div>
        </form>
       </div>
     </div>
    </div>
  )
}

export default LoginForm
