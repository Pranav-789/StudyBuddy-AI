"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import Markdown from 'react-markdown';
import Navbar from '@/components/Navbar';
import toast, { Toaster } from "react-hot-toast";

const page = () => {
    const [summary, setSummary] = useState('');
    const [summId, setSummaryId] = useState();
    const [loading, setLoading] = useState(false);
    const [preferences, setPreferences] = useState({
      "more descriptive": false,
      "professional": false,
      "easy to understand": false,
      "more conscise": false,
      "add examples": false,
      "use bullet points": false,
      "use emojis": false,
    })

    const [customPrompt, setCustomPrompt] = useState("");
    const params = useParams();
    useEffect(() => {
      const loadSummary = async () => {
        const summaryId = params.id; // get the id from params
        setSummaryId(summaryId);
        const summaryRes = await axios.get(
          `/api/getsummary?summaryId=${summaryId}`
        );
        setSummary(summaryRes.data.summary);
      };
      loadSummary();
    }, [params.id, summary]);

    const refinesummary=async()=>{
      setLoading(true)
      let promptExtension = "refine the summary to be: ";
      const selected = [];

      for(const key in preferences){
        if(preferences[key]){
          selected.push(key);
        }
      }

      if(selected.length === 0){
        promptExtension = "refine the summary";
      }
      else{
        promptExtension += selected.join(", ") + customPrompt + " " + ".";
      }
      console.log(promptExtension);

      try {
        const response = await axios.post('/api/refinesummary', {summaryId: summId, promptExtension});
        setSummary(response.data.newSummary);
        setLoading(false);
        toast.success("Summary refined successfully");
      } catch (error) {
        console.log("refining of summary failed");
        setLoading(false);
        toast.error("Summary refining failed!");
      }
    }
    
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="font-sans bg-gray-100 p-4 rounded-lg shadow min-w-[350px] w-[70%]  mt-24">
        {!loading ? <Markdown>{summary}</Markdown> : "Refining..."}
      </div>
      <div className="min-w-[350px] w-[70%] mt-4 p-4 bg-gray-300 rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          <div className="flex gap-2 text-lg bg-gray-400 p-2 rounded-md">
            <input
              type="checkbox"
              name="more descriptive"
              checked={preferences["more descriptive"]}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  "more descriptive": !prev["more descriptive"],
                }))
              }
            />
            <label htmlFor="more descriptive">More Descriptive</label>
          </div>

          <div className="flex gap-2 text-lg bg-gray-400 p-2 rounded-md">
            <input
              type="checkbox"
              name="professional"
              checked={preferences["professional"]}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  professional: !prev["professional"],
                }))
              }
            />
            <label htmlFor="professional">Professional</label>
          </div>

          <div className="flex gap-2 text-lg bg-gray-400 p-2 rounded-md">
            <input
              type="checkbox"
              name="easy to understand"
              checked={preferences["easy to understand"]}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  "easy to understand": !prev["easy to understand"],
                }))
              }
            />
            <label htmlFor="easy to understand">Easy To Understand</label>
          </div>

          <div className="flex gap-2 text-lg bg-gray-400 p-2 rounded-md">
            <input
              type="checkbox"
              name="more conscise"
              checked={preferences["more conscise"]}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  "more conscise": !prev["more conscise"],
                }))
              }
            />
            <label htmlFor="more conscise">More Conscise</label>
          </div>

          <div className="flex gap-2 text-lg bg-gray-400 p-2 rounded-md">
            <input
              type="checkbox"
              name="add examples"
              checked={preferences["add examples"]}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  "add examples": !prev["add examples"],
                }))
              }
            />
            <label htmlFor="add examples">Add Examples</label>
          </div>

          <div className="flex gap-2 text-lg bg-gray-400 p-2 rounded-md">
            <input
              type="checkbox"
              name="use bullet points"
              checked={preferences["use bullet points"]}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  "use bullet points": !prev["use bullet points"],
                }))
              }
            />
            <label htmlFor="use bullet points">Use Bullet Points</label>
          </div>

          <div className="flex gap-2 text-lg bg-gray-400 p-2 rounded-md">
            <input
              type="checkbox"
              name="use bullet points"
              checked={preferences["use emojis"]}
              onChange={() =>
                setPreferences((prev) => ({
                  ...prev,
                  "use emojis": !prev["use emojis"],
                }))
              }
            />
            <label htmlFor="use bullet points">Use Emojis</label>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 mb-2 text-lg bg-gray-400 p-2 rounded-md">
          <label htmlFor="customPrompt">Customize</label>
          <input
            type="text"
            name="customPrompt"
            className='w-full bg-white rounded-md p-[4px] text-black'
            placeholder='Enter custom prompt here'
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
        </div>
        <button
          className="rounded-md bg-indigo-600 p-2 text-white text-lg"
          onClick={() => {
            console.log(preferences);
            refinesummary();
          }}
        >
          Refine Summary
        </button>
      </div>
    </div>
  );
}

export default page
