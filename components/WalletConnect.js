"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { motion } from "framer-motion"

export default function WalletConnect() {
  const { publicKey, wallet, disconnect, connected } = useWallet()
  const [balance, setBalance] = useState(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  // Format the wallet address to show only the first and last few characters
  const formatWalletAddress = (address) => {
    if (!address) return ""
    return `${address.toString().slice(0, 4)}...${address.toString().slice(-4)}`
  }

  // Copy wallet address to clipboard
  const copyWalletAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Custom styling for the wallet adapter button
  const customWalletButtonStyle = {
    "--wallet-adapter-button-bg": "#00a3ff",
    "--wallet-adapter-button-color": "white",
    "--wallet-adapter-button-hover-bg": "#0090e0",
    "--wallet-adapter-button-active-bg": "#0080c0",
  }

  return (
    <div className="relative">
      {connected ? (
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 bg-[#151524] px-3 py-2 rounded-lg cursor-pointer hover:bg-[#1e1e32] transition-colors"
            onClick={copyWalletAddress}
          >
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">{formatWalletAddress(publicKey)}</span>
            {copied && (
              <motion.div
                className="absolute top-full mt-2 right-0 bg-[#252540] text-white text-xs py-1 px-2 rounded"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Copied!
              </motion.div>
            )}
          </div>
          <button
            className="text-xs bg-[#151524] hover:bg-[#1e1e32] text-red-400 px-2 py-1 rounded-lg transition-colors"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div style={customWalletButtonStyle}>
          <WalletMultiButton className="!bg-[#00a3ff] hover:!bg-[#0090e0] !transition-all" />
        </div>
      )}
    </div>
  )
}
