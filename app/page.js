"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
import Layout from "@/components/Layout"
import HeroCard from "@/components/HeroCard"
import LeaderboardSection from "@/components/LeaderboardSection"
import CommunityStats from "@/components/CommunityStats"
import WalletConnect from "@/components/WalletConnect"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const { connected } = useWallet()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a14]">
        <div className="flex flex-col items-center">
          <div className="text-[#F3BA2F] text-2xl font-bold mb-4">QuestHub</div>
          <div className="w-12 h-12 border-4 border-[#F3BA2F] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6">
        {connected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-12">
              <h1 className="text-5xl font-bold mb-4">QuestHub</h1>
              <p className="text-lg mb-6">Complete quests, earn badges, and win BNB rewards</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push("/quests")}
                  className="bg-[#F3BA2F] hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg"
                >
                  Explore Quests
                </button>
                <button
                  onClick={() => router.push("/referrals")}
                  className="border border-white hover:bg-white hover:text-black text-white font-semibold py-3 px-6 rounded-lg"
                >
                  Invite Friends
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div 
                className="bg-gradient-to-br from-[#1D1E2D] to-[#12162C] p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-[#F3BA2F]/20 flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#F3BA2F" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Quiz Game</h3>
                <p className="text-gray-400 text-sm mb-4">Test your blockchain knowledge and earn BNB for correct answers.</p>
                <button 
                  className="bg-[#F3BA2F]/20 hover:bg-[#F3BA2F]/30 text-[#F3BA2F] text-sm py-2 px-4 rounded-lg w-full transition-colors"
                  onClick={() => router.push("/quests/quiz")}
                >
                  Start Quiz
                </button>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-[#241D2B] to-[#1F152C] p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-[#F3BA2F]/20 flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#F3BA2F" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Riddles Game</h3>
                <p className="text-gray-400 text-sm mb-4">Solve blockchain-themed riddles to earn BNB rewards.</p>
                <button 
                  className="bg-[#F3BA2F]/20 hover:bg-[#F3BA2F]/30 text-[#F3BA2F] text-sm py-2 px-4 rounded-lg w-full transition-colors"
                  onClick={() => router.push("/quests/riddles")}
                >
                  Solve Riddles
                </button>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-[#1E1E2D] to-[#151C2C] p-6 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-14 h-14 rounded-full bg-[#F3BA2F]/20 flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#F3BA2F" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Creative Challenge</h3>
                <p className="text-gray-400 text-sm mb-4">Write about Web3 technologies and win BNB prizes.</p>
                <button 
                  className="bg-[#F3BA2F]/20 hover:bg-[#F3BA2F]/30 text-[#F3BA2F] text-sm py-2 px-4 rounded-lg w-full transition-colors"
                  onClick={() => router.push("/quests/creative")}
                >
                  Take Challenge
                </button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <LeaderboardSection />
              </div>
              <div>
                <CommunityStats />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8"
          >
            <div className="absolute top-40 right-20 w-64 h-64 bg-[#F3BA2F]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-20 w-64 h-64 bg-[#F3BA2F]/5 rounded-full blur-3xl"></div>
            
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image 
                src="/logo.png" 
                alt="QuestHub Logo" 
                width={120} 
                height={120}
                className="mx-auto mb-6"
              />
            </motion.div>
            
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F3BA2F] to-[#F0B90B]">
              QuestHub
            </h1>
            <p className="text-xl max-w-md text-gray-300">Complete quests, earn badges, and win BNB rewards</p>

            <motion.div 
              className="mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WalletConnect />
            </motion.div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F3BA2F]/20 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F3BA2F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Complete Quests</h3>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F3BA2F]/20 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F3BA2F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Earn Badges</h3>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F3BA2F]/20 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F3BA2F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Win BNB Rewards</h3>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
