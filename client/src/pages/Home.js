import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [userData , setUserData] = useState(null);
    const getUserData = async()=>{
        try {
            const response = await axios.post('api/users/get-user-data',{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                },
            })
            if(response.data.success){
                setUserData(response.data.data);
            }else{
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getUserData()
    },[])
  return (
    <div className='flex items-center justify-center h-screen'>
        <h1 className='text-5xl'>{userData?.name}</h1>
    </div>
  )
}


export default Home;