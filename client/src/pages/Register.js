import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function Register() {
  const [user , setUser] = useState({
    name:"",
    email:"",
    password:"",
  });
  const register = async()=>{
    try {
        const response = await axios.post('/api/users/register',user);
        if(response.data.success){
            alert("user registered successfully");
        }else{
            alert(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center'>        
        <div className='flex flex-col gap-3 w-96 p-3 shadow border border-gray-300'>
            <h1 className='text-3xl font-bold text-gray-700'>WELCOME BACK</h1>
            <hr/>
            <input type='text' value={user.name} onChange={(e)=> setUser({...user,name: e.target.value})} placeholder='Name'/>
            <input type='email' value={user.email} onChange={(e)=> setUser({...user,email: e.target.value})} placeholder='Email'/>
            <input type='password' value={user.password} onChange={(e)=> setUser({...user,password: e.target.value})} placeholder='Password'/>
            <button type='submit' onClick={register} className='primary'>Register</button>
        </div>        
    </div>
  )
}

export default Register