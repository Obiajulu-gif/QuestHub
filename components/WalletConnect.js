"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect } from "react"

export default function WalletConnect({ fullWidth }) {
  const { connect, connected } = useWallet()
  
  // Automatically connect the simulated wallet
  useEffect(() => {
    if (!connected) {
      // Set the simulated wallet flag
      if (typeof window !== 'undefined') {
        localStorage.setItem('questhub_simulated_wallet', 'true')
      }
      
      // Connect with a slight delay
      const timer = setTimeout(() => {
        connect().catch(err => console.error("Error connecting wallet:", err))
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [connect, connected])

  return (
    <button
      className={`flex items-center justify-center bg-[#252540] hover:bg-[#2a2a4a] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 ${fullWidth ? "w-full" : ""}`}
      onClick={() => {
        // Set the simulated wallet flag
        if (typeof window !== 'undefined') {
          localStorage.setItem('questhub_simulated_wallet', 'true')
        }
        
        // Connect the wallet
        connect().catch(err => console.error("Error connecting wallet:", err))
      }}
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.97 6.43L12 2L4.03 6.43L12 10.85L19.97 6.43ZM20 7.56V16.43L12.03 20.85L4.03 16.43V7.56L12 11.98L20 7.56Z"
          fill="currentColor"
        />
      </svg>
      {connected ? "Wallet Connected" : "Connect Wallet"}
    </button>
  )
}
