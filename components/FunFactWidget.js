"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getFunFact } from "@/services/questApi"

export default function FunFactWidget() {
  const [factData, setFactData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNewFact = async () => {
    try {
      setLoading(true)
      const data = await getFunFact()
      setFactData(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching fun fact:", err)
      setError("Failed to load fun fact. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewFact()
    
    // Set up an interval to fetch a new fact every 5 minutes (300000 ms)
    const intervalId = setInterval(fetchNewFact, 300000)
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  if (loading && !factData) {
    return (
      <div className="bg-[#151524] rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-[#252540] rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-[#252540] rounded w-1/2"></div>
      </div>
    )
  }

  if (error && !factData) {
    return (
      <div className="bg-[#151524] rounded-xl p-4 border border-red-500">
        <p className="text-red-400 text-sm">{error}</p>
        <button 
          onClick={fetchNewFact}
          className="mt-2 text-xs text-[#00a3ff] hover:underline"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <motion.div 
      className="bg-[#151524] rounded-xl p-4 border border-[#252540] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-sm text-[#00a3ff]">Blockchain Fun Fact</h3>
        <button 
          onClick={fetchNewFact}
          className="text-xs text-gray-400 hover:text-white"
          title="Get new fact"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 2v6h-6"></path>
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            <path d="M3 22v-6h6"></path>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
          </svg>
        </button>
      </div>
      
      {factData && (
        <div className="text-sm text-gray-300 prose prose-sm max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-300">
          <div dangerouslySetInnerHTML={{ __html: factData.facts.replace(/\n/g, '<br />') }} />
        </div>
      )}
    </motion.div>
  )
} 