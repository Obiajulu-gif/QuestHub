"use client"

import React from 'react'

export default function ApiError({ error, onRetry }) {
  return (
    <div className="bg-[#151524] rounded-xl p-6 border border-red-500/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="text-red-400 mt-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-red-400 mb-1">Error</h3>
          <p className="text-gray-300 text-sm">{error}</p>
        </div>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-[#252540] hover:bg-[#353560] rounded-lg text-white text-sm transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 3V8H16M16 16L21 21M21 16C19.8954 17.6094 18.1827 18.5586 16.2895 18.851C14.3962 19.1434 12.4492 18.7494 10.8289 17.7372C9.20861 16.725 8.01816 15.1711 7.5153 13.3677C7.01245 11.5643 7.23374 9.63224 8.13903 7.98754M3 16V11H8M3 8C4.10457 6.39058 5.81731 5.4414 7.71053 5.14895C9.60375 4.85649 11.5508 5.25062 13.1711 6.26284C14.7914 7.27505 15.9818 8.8289 16.4847 10.6323C16.9876 12.4357 16.7663 14.3678 15.861 16.0125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Try Again
        </button>
      )}
    </div>
  )
} 