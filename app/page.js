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
          <div className="text-[#00a3ff] text-2xl font-bold mb-4">QuestHub</div>
          <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
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
            <div className="text-xl font-bold">🔥 Welcome to QuestHub!</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HeroCard
                title="PARTICIPATE IN CONTESTS"
                subtitle="AND WIN PRIZES"
                buttonText="View Quests"
                buttonAction={() => router.push("/quests")}
                imageSrc="/golden-victory-cup.png"
                bgColor="from-[#0a2e44] to-[#0a1e2c]"
              />

              <HeroCard
                title="EARN REWARDS FOR INVITE!"
                subtitle="EARN SOL REWARDS WHEN THEY JOIN"
                buttonText="Invite Now"
                buttonAction={() => {}}
                imageSrc="/celebratory-applause.png"
                bgColor="from-[#2e0a44] to-[#1e0a2c]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00a3ff] to-[#7928ca]">
              QuestHub
            </h1>
            <p className="text-xl max-w-md text-gray-300">Complete quests, earn badges, and win rewards on Solana</p>

            <div className="mt-4">
              <WalletConnect />
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="card p-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00a3ff]/20 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#00a3ff]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="font-medium">Complete Quests</h3>
              </div>

              <div className="card p-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#7928ca]/20 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#7928ca]"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <h3 className="font-medium">Earn Badges</h3>
              </div>

              <div className="card p-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#ff3d71]/20 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff3d71]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="font-medium">Win Rewards</h3>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
