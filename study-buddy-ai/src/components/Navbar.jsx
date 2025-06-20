import React, { useEffect, useState } from 'react'
import {motion} from 'motion/react'
import { AnimatePresence } from 'motion/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
    const [hidden, setHidden] = useState(false);
    const [logoutdiv, setLogoutDiv] = useState(false);
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
    
    const logout = async () => {
      try {
        await axios.get("/api/users/logout");
        router.push("/login");
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleDelete = async(id) =>{
      try {
        toast.success("Delete request sent")
        const response = await axios.delete(`/api/summarize`, {
          data: {summaryId: id},
        });
        if(response.data.success){
          toast.success(response.data.message)
          setSummaryArray(prev => prev.filter(s=> s._id !==id));
        }
        else{
          toast.error(response.data.error)
        }
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed deletion of summary!"
        );
      }
    }

  return (
    <div className="fixed top-0 bg-gray-200 border-b-1 border-black/30 flex justify-between p-3 w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex gap-6 justify-center items-center">
        <button
          className="ml-2 rotate-90 text-2xl bg-gray-300 hover:bg-gray-400 p-1 rounded-md"
          onClick={toggleSidebar}
        >
          lll
        </button>
        <Link href={"/dashboard"} className="font-semibold">
          SummarizerAI
        </Link>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Link href={"/profile"} className="font-semibold">
          Profile
        </Link>
        <button
          className="text-lg bg-gray-300 hover:bg-gray-400 p-1 rounded-md"
          onClick={() => setLogoutDiv((prev) => !prev)}
        >{`[->`}</button>
      </div>

      <AnimatePresence>
        {logoutdiv && (
          <motion.div
            className="absolute top-0 right-0 bg-gray-400 rounded-md flex p-4 gap-2"
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <button
              className="bg-indigo-600 text-white rounded p-2"
              onClick={logout}
            >
              LogOut
            </button>
            <button
              className="p-1 h-[40px] w-[40px] bg-gray-600 text-white rounded"
              onClick={() => setLogoutDiv((prev) => !prev)}
            >
              X
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hidden && (
          <motion.div
            className="absolute h-[100vh] bg-gray-400 w-[250px] top-0 left-0 rounded-r-md p-2 flex-col overflow-y-auto"
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
            <div className="flex justify-between items-center mt-1 p-2 border-b-1 border-black">
              <h1 className="text-lg font-semibold">History</h1>
              <button
                className="text-lg bg-gray-300 hover:bg-gray-400 h-[30px] w-[30px] rounded-md"
                onClick={toggleSidebar}
              >
                X
              </button>
            </div>
            <div
              className="p-2 w-full bg-black text-white rounded-md mt-2 hover:bg-black/50"
            >
              <Link href={`/dashboard`}>New Summary</Link>
            </div>
            {summaryArray.length > 0 &&
              summaryArray.map((summary, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 w-full bg-white rounded-md mt-2 hover:bg-white/50 flex justify-between"
                  >
                    <Link
                      href={`/summary/${summary._id}`}
                      className="break-words whitespace-normal max-w-[180px]"
                    >
                      {summary.title}
                    </Link>
                    <button onClick={()=>handleDelete(summary._id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="hover:text-red-500"
                      />
                    </button>
                  </div>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar
