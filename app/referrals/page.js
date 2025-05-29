"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
// Update import to use named export
import { Layout } from "@/components/Layout"
import Image from "next/image"
import WalletConnect from "@/components/WalletConnect"

// Mock data for referral history
const referralHistory = [
  {
    id: 1,
    username: "CryptoNewbie",
    date: "2023-11-15T10:23:00Z",
    status: "completed",
    reward: "0.05 SOL",
  },
  {
    id: 2,
    username: "BlockchainFan",
    date: "2023-11-10T14:45:00Z",
    status: "completed",
    reward: "0.05 SOL",
  },
  {
    id: 3,
    username: "SolanaUser",
    date: "2023-11-05T09:12:00Z",
    status: "completed",
    reward: "0.05 SOL",
  },
  {
    id: 4,
    username: "QuestSeeker",
    date: "2023-10-28T16:30:00Z",
    status: "pending",
    reward: "0.05 SOL",
  },
  {
    id: 5,
    username: "Web3Explorer",
    date: "2023-12-05T11:20:00Z",
    status: "completed",
    reward: "0.075 SOL",
  },
  {
    id: 6,
    username: "TokenCollector",
    date: "2023-12-12T08:45:00Z",
    status: "completed",
    reward: "0.075 SOL",
  },
  {
    id: 7,
    username: "DeFiEnthusiast",
    date: "2023-12-18T14:10:00Z",
    status: "pending",
    reward: "0.075 SOL",
  },
]

// Referral tiers
const referralTiers = [
  {
    level: "Bronze",
    referrals: "1-5",
    reward: "0.05 SOL per referral",
    bonusReward: "None",
    color: "from-[#CD7F32] to-[#A05A2C]",
    iconColor: "#CD7F32",
    bgColor: "rgba(205, 127, 50, 0.2)"
  },
  {
    level: "Silver",
    referrals: "6-15",
    reward: "0.075 SOL per referral",
    bonusReward: "0.5 SOL bonus at 10 referrals",
    color: "from-[#C0C0C0] to-[#A0A0A0]",
    iconColor: "#C0C0C0",
    bgColor: "rgba(192, 192, 192, 0.2)"
  },
  {
    level: "Gold",
    referrals: "16-30",
    reward: "0.1 SOL per referral",
    bonusReward: "1 SOL bonus at 20 referrals",
    color: "from-[#FFD700] to-[#FFA500]",
    iconColor: "#FFD700",
    bgColor: "rgba(255, 215, 0, 0.2)"
  },
  {
    level: "Platinum",
    referrals: "31+",
    reward: "0.15 SOL per referral",
    bonusReward: "2 SOL bonus at 50 referrals",
    color: "from-[#E5E4E2] to-[#8A9A9A]",
    iconColor: "#E5E4E2",
    bgColor: "rgba(229, 228, 226, 0.2)"
  },
]

// Additional statistics
const referralStats = {
  totalReferrals: 7,
  completedReferrals: 5,
  pendingReferrals: 2,
  totalRewards: 0.425, // SOL
  currentTier: "Silver",
  nextTierProgress: 7, // out of 15 for Silver tier
  nextMilestone: {
    type: "bonus",
    description: "0.5 SOL bonus at 10 referrals",
    current: 7,
    target: 10
  }
}

export default function Referrals() {
  const router = useRouter()
  const { connected, publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [referralCode, setReferralCode] = useState("REF4X8YZ")
  const [referralLink, setReferralLink] = useState("https://questhub.io/join?ref=REF4X8YZ")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("link") // link, history, tiers

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Generate referral code and link if wallet is connected
    if (connected && publicKey) {
      const code = publicKey.toString().slice(0, 8)
      setReferralCode(code)
      setReferralLink(`https://questhub.io/join?ref=${code}`)
    }

    return () => clearTimeout(timer)
  }, [connected, publicKey])

  // Copy referral link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Share referral link
  const shareReferral = (platform) => {
    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=Join%20me%20on%20QuestHub%20and%20earn%20rewards%20for%20completing%20quests!%20Use%20my%20referral%20link:%20${encodeURIComponent(
          referralLink,
        )}`
        break
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20me%20on%20QuestHub%20and%20earn%20rewards%20for%20completing%20quests!`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
        break
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-12 h-12 border-4 border-[#0DF5E3] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
              <span className="mr-2">🔗</span> 
              <span>Referral</span>
              <span className="ml-2 glow-text">Program</span>
            </h1>
            <p className="text-[#B3C6FF]">Invite friends and earn rewards when they join QuestHub</p>
          </div>
        </div>

            {/* Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                className="card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0DF5E3]/20 flex items-center justify-center">
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
                      className="text-[#0DF5E3]"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#B3C6FF]">Total Referrals</div>
                <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
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
                      className="text-[#FFD700]"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#B3C6FF]">Total Rewards</div>
                <div className="text-2xl font-bold">{referralStats.totalRewards} SOL</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#C0C0C0]/20 flex items-center justify-center">
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
                  className="text-[#C0C0C0]"
                    >
                  <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#B3C6FF]">Current Tier</div>
                <div className="text-2xl font-bold">{referralStats.currentTier}</div>
                  </div>
                </div>
              </motion.div>
            </div>

        {/* Next Milestone Progress */}
        <motion.div 
          className="card p-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-lg font-bold mb-3">Next Milestone</h2>
          <div className="mb-2 flex justify-between text-sm">
            <span>{referralStats.nextMilestone.description}</span>
            <span className="text-[#0DF5E3]">{referralStats.nextMilestone.current} / {referralStats.nextMilestone.target}</span>
          </div>
          <div className="w-full bg-[#151524] rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#0DF5E3] to-[#00A3FF] h-3 rounded-full"
              style={{ width: `${(referralStats.nextMilestone.current / referralStats.nextMilestone.target) * 100}%` }}
            ></div>
          </div>
        </motion.div>

            {/* Tabs */}
        <div className="flex border-b border-[#1D203E] mb-6">
              <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "link" ? "text-white border-b-2 border-[#0DF5E3]" : "text-[#B3C6FF] hover:text-white"
                }`}
                onClick={() => setActiveTab("link")}
              >
            Referral Link
              </button>
              <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "history" ? "text-white border-b-2 border-[#0DF5E3]" : "text-[#B3C6FF] hover:text-white"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Referral History
              </button>
              <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "tiers" ? "text-white border-b-2 border-[#0DF5E3]" : "text-[#B3C6FF] hover:text-white"
                }`}
                onClick={() => setActiveTab("tiers")}
              >
                Reward Tiers
              </button>
            </div>

            {/* Tab Content */}
        {activeTab === "link" && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
            <div className="card p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Your Referral Link</h2>
                  <p className="text-[#B3C6FF] mb-6">
                Share this link with friends. When they sign up and complete their first quest, you'll both receive rewards!
                    </p>

              <div className="flex flex-col md:flex-row gap-2 mb-6">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="w-full bg-[#151524] border border-[#1D203E] rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#0DF5E3] focus:border-transparent"
                  />
                  <div className="absolute right-3 top-3 bg-[#1D203E] text-xs text-[#B3C6FF] px-2 py-1 rounded">
                    Code: {referralCode}
                  </div>
                      </div>
                      <button
                        onClick={copyToClipboard}
                  className="bg-[#0DF5E3] hover:bg-[#0bc6b9] text-[#060B27] font-medium py-3 px-6 rounded-lg transition-all duration-200 min-w-[120px] flex items-center justify-center"
                      >
                  {copied ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy
                    </>
                  )}
                      </button>
                    </div>

              <h3 className="text-md font-bold mb-3">Share on Social Media</h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => shareReferral("twitter")}
                  className="bg-[#1DA1F2] hover:bg-[#1a94df] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                            viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                          >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        Twitter
                        </button>
                        <button
                          onClick={() => shareReferral("telegram")}
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                            viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                          >
                    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.846 1.467 1.816 3.212 2.862 5.09.143.259.182.559.1.812.77 1.192.223 1.179.375 1.544.607.907 1.42 1.444 1.744 1.673.43.336.823.67 1.22.992.121.099.242.188.363.287.3.147.601.294.382.29.244.014.9.067 1.21-.226.897-.939 1.83-1.858 2.726-2.778.886.455 1.96.895 3.151 1.393 1.197.498 2.193.925 2.923 1.189.73.264 1.118.451 1.302.502.802.222 1.731.024 2.09-.65.367-.675.308-1.589.127-2.11a3.549 3.549 0 0 0-.195-.682c-.867-2.367-1.85-4.592-2.83-6.818-.698-1.524-1.286-2.952-1.837-4.297-.276-.675-.941-1.02-1.414-1.053z"></path>
                          </svg>
                        Telegram
                        </button>
                        <button
                          onClick={() => shareReferral("facebook")}
                  className="bg-[#4267B2] hover:bg-[#365899] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                            viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        Facebook
                        </button>
                    </div>
                  </div>

            {/* How It Works */}
            <div className="card p-6">
              <h2 className="text-lg font-bold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#0DF5E3]/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#0DF5E3]"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">1. Invite Friends</h3>
                        <p className="text-sm text-[#B3C6FF]">
                    Share your unique referral link with friends and community.
                        </p>
                      </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#8A3FFC]/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#8A3FFC]"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <path d="M9 12h6"></path>
                      <path d="M12 9v6"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">2. Friends Join QuestHub</h3>
                  <p className="text-sm text-[#B3C6FF]">
                    They sign up using your link and complete their first quest.
                  </p>
                    </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#FFD700]"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">3. Earn Rewards</h3>
                  <p className="text-sm text-[#B3C6FF]">
                    Both you and your friend earn SOL rewards. Unlock higher tiers for bigger rewards!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
              )}

              {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
                <div className="card p-6">
              <h2 className="text-lg font-bold mb-4">Referral History</h2>
              
              <div className="flex justify-between mb-4 text-sm text-[#B3C6FF]">
                <span>Total: {referralHistory.length} referrals</span>
                <span>Completed: {referralHistory.filter(r => r.status === "completed").length}</span>
              </div>

                    <div className="overflow-x-auto">
                <table className="min-w-full">
                        <thead>
                    <tr className="bg-[#151524] text-left">
                      <th className="py-3 px-4 text-sm font-medium text-[#B3C6FF]">User</th>
                      <th className="py-3 px-4 text-sm font-medium text-[#B3C6FF]">Date</th>
                      <th className="py-3 px-4 text-sm font-medium text-[#B3C6FF]">Status</th>
                      <th className="py-3 px-4 text-sm font-medium text-[#B3C6FF]">Reward</th>
                          </tr>
                        </thead>
                  <tbody className="divide-y divide-[#1D203E]">
                        {referralHistory.map((referral) => (
                      <tr key={referral.id} className="hover:bg-[#151524]">
                        <td className="py-3 px-4 whitespace-nowrap">{referral.username}</td>
                        <td className="py-3 px-4 whitespace-nowrap text-[#B3C6FF]">{formatDate(referral.date)}</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                                {referral.status === "completed" ? (
                            <span className="text-[#0DF5E3] flex items-center">
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
                                className="mr-1"
                              >
                                <path d="M20 6 9 17l-5-5"></path>
                              </svg>
                                    Completed
                                  </span>
                                ) : (
                            <span className="text-[#FFD700] flex items-center">
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
                                className="mr-1"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                              </svg>
                                    Pending
                                  </span>
                                )}
                              </td>
                        <td className="py-3 px-4 whitespace-nowrap font-medium">{referral.reward}</td>
                      </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
          </motion.div>
              )}

              {activeTab === "tiers" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
                  <div className="card p-6">
              <h2 className="text-lg font-bold mb-4">Reward Tiers</h2>
                  <p className="text-[#B3C6FF] mb-6">
                Invite more friends to unlock higher tiers and earn bigger rewards!
                    </p>

              <div className="grid grid-cols-1 gap-4">
                      {referralTiers.map((tier, index) => (
                        <motion.div
                          key={tier.level}
                    className={`p-5 rounded-xl border ${
                      tier.level === referralStats.currentTier ? "border-[#0DF5E3]" : "border-[#1D203E]"
                    }`}
                    style={{ backgroundColor: tier.bgColor }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center mr-4`}
                        >
                          <span className="text-xl font-bold">{index + 1}</span>
                          </div>
                              <div>
                          <h3 className="text-lg font-bold" style={{ color: tier.iconColor }}>
                            {tier.level}
                          </h3>
                          <p className="text-sm text-[#B3C6FF]">{tier.referrals} referrals</p>
                              </div>
                            </div>
                      <div className="border-l border-[#1D203E] pl-4 flex flex-col">
                        <div className="mb-2">
                          <div className="text-sm text-[#B3C6FF]">Reward</div>
                                <div className="font-medium">{tier.reward}</div>
                              </div>
                        <div>
                          <div className="text-sm text-[#B3C6FF]">Bonus</div>
                          <div className="font-medium">{tier.bonusReward}</div>
                        </div>
                      </div>
                    </div>
                    {tier.level === referralStats.currentTier && (
                      <div className="mt-4 bg-[#060B27]/50 p-3 rounded-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                          className="text-[#0DF5E3] mr-2"
              >
                          <path d="M20 6 9 17l-5-5"></path>
              </svg>
                        <span className="text-[#0DF5E3]">Your Current Tier</span>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
