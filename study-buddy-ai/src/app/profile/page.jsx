"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const page = () => {
  const router = useRouter();
  const [data, setData] = useState('nothing');
  const [email ,setEmail] = useState('nothing')

  const logout = async () =>{
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push("/login");

    } catch (error) {
      console.log(error.message);
      toast.error(error.messsage);
    }
  }

  const getUserDetails = async() =>{
    const res = await axios.get('/api/users/me');
    console.log(res);
    setData(res.data.data.username);
    setEmail(res.data.data.email)
  }

  useEffect(()=>{
    getUserDetails();
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-gray-300 rounded-md p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl flex gap-2">PROFILE</h1>
        <div className="my-4 flex flex-col text-lg gap-4">
          <p className="font-semibold">
            Username: <span className='font-normal'>{data}</span>
          </p>
          <p className="font-semibold">
            Email: <span className='font-normal'>{email}</span>
          </p>
        </div>
        <button className="bg-blue-500 rounded-md p-2" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default page
