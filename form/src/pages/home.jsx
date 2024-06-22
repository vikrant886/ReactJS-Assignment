import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className="w-full h-screen flex flex-col bg-gray-300">
            <p className="p-20 text-6xl items-center flex justify-center text-black">Front-End Develpoment Assignment</p>
            <div className="flex h-full flex-row  justify-center pt-20  gap-8">
                <button className="w-40 bg-blue-700 h-20 rounded-lg" onClick={() => navigate('/basic')}>Basic</button>
                <button className="w-40 bg-blue-700 h-20 rounded-lg" onClick={() => navigate('/inter')}>Intermediate</button>
                <button className="w-40 bg-blue-700 h-20 rounded-lg" onClick={() => navigate('/advanced')}>Advanced</button>
            </div>
        </div>
    )
}