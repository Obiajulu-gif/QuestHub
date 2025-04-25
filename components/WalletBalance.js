"use client"

import { useState, useEffect } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

export default function WalletBalance() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null)
        return
      }

      try {
        setLoading(true)
        const walletBalance = await connection.getBalance(publicKey)
        if (isMounted) {
          setBalance(walletBalance / LAMPORTS_PER_SOL)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching balance:", error)
        if (isMounted) {
          setBalance(null)
          setLoading(false)
        }
      }
    }

    fetchBalance()

    // Set up an interval to refresh the balance every 30 seconds
    const intervalId = setInterval(fetchBalance, 30000)

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [publicKey, connection, connected])

  if (!connected) return null

  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-[#ffc107] rounded-full"></div>
      <span className="text-sm">
        {loading ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          `${balance !== null ? balance.toFixed(4) : "0.0000"} SOL`
        )}
      </span>
    </div>
  )
}
