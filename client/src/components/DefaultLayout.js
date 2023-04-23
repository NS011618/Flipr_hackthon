import React from 'react'
import { useSelector } from 'react-redux'

function DefaultLayout({children}) {
  const {user} = useSelector(state => state.user)
  return (
    <div className='main'>
        <div className='header flex justify-between p-5 shadow items-center'>
            <h1 className='text-3xl text-gray-700 font-bold'>Flipr Hackathon</h1>
            <div className='flex items-center gap-2'>
                <h1 className='text-xl'>{user?.name.toUpperCase()}</h1>
                <i className="ri-logout-circle-r-line text-xl cursor-pointer" onClick={()=>{
                    localStorage.removeItem('token')
                    window.location.reload()
                }}></i>
            </div>

        </div>
        <div className='content'>
           {children}
        </div>
    </div>
  )
}

export default DefaultLayout