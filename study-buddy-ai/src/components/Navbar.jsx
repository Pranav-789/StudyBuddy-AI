import React, { useEffect, useState } from 'react'
import {motion} from 'motion/react'
import { AnimatePresence } from 'motion/react';
import axios from 'axios';
import Link from 'next/link';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [summaryArray, setSummaryArray] = useState([]);

    const toggleSidebar = () =>{
        setHidden((prev)=> !prev);
    }

    const getSummaries = async()=>{
        const response = await axios.get('/api/history', {withCredentials: true})
        console.log(response.data.summaries);
        setSummaryArray(response.data.summaries);
    }

    useEffect(()=>{
        getSummaries();
    }, [])

    useEffect(() => {
      console.log("Updated summaryArray:", summaryArray);
    }, [summaryArray]);
      


  return (
    <div className="fixed top-0 bg-gray-200 border-b-1 border-black/30 flex justify-between p-3 w-full">
      <div className="flex gap-6 justify-center items-center">
        <button
          className="ml-2 rotate-90 text-2xl bg-gray-300 hover:bg-gray-400 p-1 rounded-md"
          onClick={toggleSidebar}
        >
          lll
        </button>
        <h1 className="font-semibold">SummarizerAi</h1>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Link href={'/dashboard'} className="font-semibold">Summarizer</Link>
        <Link href={'/profile'} className="font-semibold">Profile</Link>
        <button className="text-lg bg-gray-300 hover:bg-gray-400 p-1 rounded-md">{`[->`}</button>
      </div>

      <AnimatePresence>
        {hidden && (
          <motion.div
            className="absolute min-h-[100vh] bg-gray-400 w-[250px] top-0 left-0 rounded-r-md p-2 flex-col"
            initial={{
              scale: 1,
              x: "-250px",
            }}
            animate={{
              scale: 1,
              x: "0px",
            }}
            exit={{
              x: "-250px",
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className='flex justify-between items-center mt-1 p-2 border-b-1 border-black'>
              <h1 className='text-lg font-semibold'>History</h1>
              <button
                className="text-lg bg-gray-300 hover:bg-gray-400 h-6 w-6 rounded-md"
                onClick={toggleSidebar}
              >
                X
              </button>
            </div>
            {
                summaryArray.length > 0 &&
                summaryArray.map((summary, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 w-full bg-white rounded-md mt-2 hover:bg-white/50"
                    >
                      <Link href={`/summary/${summary._id}`}>{summary.title}</Link>
                    </div>
                  );
                })
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar
