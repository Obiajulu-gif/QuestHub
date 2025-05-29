"use client"

import React from 'react'

export default function ApiLoading({ text = "Loading..." }) {
  return (
    <div className="bg-[#151524] rounded-xl p-6 animate-pulse">
      <div className="flex items-center mb-6">
        <div className="mr-3">
          <svg className="animate-spin h-5 w-5 text-[#00a3ff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <div className="font-medium text-[#00a3ff]">{text}</div>
      </div>
      
      <div className="h-6 bg-[#252540] rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-[#252540] rounded w-1/2 mb-6"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-[#252540] rounded"></div>
        ))}
      </div>
    </div>
  )
} 