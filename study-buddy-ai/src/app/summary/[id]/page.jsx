"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import Markdown from 'react-markdown';
import Navbar from '@/components/Navbar';

const page = () => {
    const [summary, setSummary] = useState('');
    const params = useParams();
    useEffect(() => {
      const loadSummary = async () => {
        const summaryId = params.id; // get the id from params
        const summaryRes = await axios.get(
          `/api/getsummary?summaryId=${summaryId}`
        );
        setSummary(summaryRes.data.summary);
      };
      loadSummary();
    }, [params.id]);
    
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Navbar/>
      <div className="font-sans bg-gray-100 p-4 rounded-lg shadow min-w-[350px] w-[70%] mt-20">
        <Markdown>{summary}</Markdown>
      </div>
    </div>
  );
}

export default page
