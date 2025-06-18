"use client"

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();
  const [data, setData] = useState('nothing');

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
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <h1 className="text-2xl">
        Profile:{" "}
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h1>
      <button className="bg-blue-500 rounded-md p-2" onClick={logout}>
        Logout
      </button>
      <button onClick={getUserDetails} className="bg-teal-500 rounded-md p-2">
        getUserDetails
      </button>
      </div>
    </div>
  );
}

export default page
