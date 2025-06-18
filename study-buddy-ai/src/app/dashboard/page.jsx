"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Markdown from "react-markdown";

const page = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res);
    setUsername(res.data.data.username);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    setIsDragging(false);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setSummary(""); // Clear previous summary
    setSummaryLoading(false);

    try {
      const data = new FormData();
      data.set("file", file);
      const response = await axios.post("/api/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, fileType } = response.data;

      if (response.data.success) {
        toast.success("File read successfully!");
        setFile(null);
        setLoading(false);
        setSummaryLoading(true);

        try {
          const summaryResponse = await axios.post(
            "/api/summarize",
            {
              fileBuffer: response.data.buffer,
              fileName: fileName,
              fileType: fileType,
            },
            { withCredentials: true }
          );

          setSummaryLoading(false);
          if (summaryResponse.data.success) {
            setSummary(summaryResponse.data.summary);
            toast.success("Summary generated successfully!");
          } else {
            setSummary("Failed to generate summary.");
            toast.error("Failed to generate summary.");
          }
        } catch (error) {
          setSummaryLoading(false);
          setSummary("Error generating summary.");
          toast.error("Error generating summary");
        }
      }
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl mb-6 font-semibold">Welcome Back {username}</h1>
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <form
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 min-w-[350px] w-[60%] border-2 border-gray-500"
          onSubmit={onSubmit}
        >
          <h1 className="text-center text-xl font-semibold mb-4">
            {loading ? "Processing" : "Upload Your Files Here"}
          </h1>
          <div
            className={`flex flex-col items-center justify-center p-2 border-2 border-dashed rounded-lg h-40 mb-4 transition ${
              isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {file ? (
              <p className="text-gray-700 m-2">{file.name}</p>
            ) : (
              <p className="text-gray-500 m-2">
                Drag & drop your file here or click below
              </p>
            )}
            {!file && (
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files?.[0])}
                className="w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 cursor-pointer bg-gray-50 max-w-[320px]"
              />
            )}
          </div>
          {file && (
            <p className="mb-2">Drag and drop new file to replace above one!</p>
          )}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition"
            disabled={!file}
          >
            Upload
          </button>
        </form>

        {summaryLoading && (
          <div className="mt-4 text-indigo-600 font-semibold">
            Generating summary...
          </div>
        )}
        {summary && !summaryLoading && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow min-w-[350px] w-[60%]">
            <h2 className="font-bold mb-2">Summary:</h2>
            <Markdown>{summary}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
