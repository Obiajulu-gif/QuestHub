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

export default function Referrals() {
  const router = useRouter()
  const { connected, publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [referralCode, setReferralCode] = useState("")
  const [referralLink, setReferralLink] = useState("")
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

          {!connected && (
            <div>
              <WalletConnect />
            </div>
          )}
        </div>

        {connected ? (
          <>
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
                    <div className="text-2xl font-bold">3</div>
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
                    <div className="text-2xl font-bold">0.15 SOL</div>
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
                  <div className="w-12 h-12 rounded-lg bg-[#8A3FFC]/20 flex items-center justify-center">
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
                      className="text-[#8A3FFC]"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#B3C6FF]">Current Tier</div>
                    <div className="text-2xl font-bold">Bronze</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 mb-6 gap-2 hide-scrollbar">
              <button
                className={`px-5 py-2.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                  activeTab === "link"
                    ? "bg-[#0DF5E3] text-[#060B27] font-medium"
                    : "bg-[#0F1642] text-[#B3C6FF] hover:bg-[#17245F]"
                }`}
                onClick={() => setActiveTab("link")}
              >
                Your Referral Link
              </button>
              <button
                className={`px-5 py-2.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                  activeTab === "history"
                    ? "bg-[#0DF5E3] text-[#060B27] font-medium"
                    : "bg-[#0F1642] text-[#B3C6FF] hover:bg-[#17245F]"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Referral History
              </button>
              <button
                className={`px-5 py-2.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                  activeTab === "tiers"
                    ? "bg-[#0DF5E3] text-[#060B27] font-medium"
                    : "bg-[#0F1642] text-[#B3C6FF] hover:bg-[#17245F]"
                }`}
                onClick={() => setActiveTab("tiers")}
              >
                Reward Tiers
              </button>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "link" && (
                  <div className="card p-6">
                  <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
                  <p className="text-[#B3C6FF] mb-6">
                    Share your unique referral link with friends and earn rewards when they join QuestHub and complete
                    quests.
                    </p>

                  <div className="mb-6">
                    <label className="text-sm text-[#B3C6FF] mb-2 block">Your Referral Code</label>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#0A0F33] border border-[#1B2A6E] rounded-lg px-4 py-3 flex-grow text-white font-mono">
                        {referralCode}
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="btn-outline py-3 px-4 flex-shrink-0"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    </div>

                  <div className="mb-8">
                    <label className="text-sm text-[#B3C6FF] mb-2 block">Your Referral Link</label>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#0A0F33] border border-[#1B2A6E] rounded-lg px-4 py-3 flex-grow text-white truncate font-mono">
                        {referralLink}
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="btn-outline py-3 px-4 flex-shrink-0"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      </div>
                    </div>

                  <div className="bg-[#0A0F33] rounded-xl p-6 mb-6 border border-[#1B2A6E]">
                    <h3 className="text-lg font-bold mb-4">Share Your Link</h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => shareReferral("twitter")}
                        className="flex items-center gap-2 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                            viewBox="0 0 24 24"
                          fill="#1DA1F2"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                        Twitter
                        </button>
                        <button
                          onClick={() => shareReferral("telegram")}
                        className="flex items-center gap-2 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                            viewBox="0 0 24 24"
                          fill="#0088cc"
                          >
                          <path d="M22.05 1.577c-.393-.016-.784.08-1.117.235-.484.186-4.92 1.902-9.41 3.64-2.26.873-4.518 1.746-6.256 2.415-1.737.67-3.045 1.168-3.114 1.192-.46.16-1.082.362-1.61.984-.133.155-.267.354-.335.628s-.038.622.095.895c.265.547.714.773 1.244.976 1.76.564 3.58 1.102 5.087 1.608.556 1.96 1.09 3.927 1.618 5.89.174.394.553.54.944.544l.035.001c.32.003.64-.117.888-.37.327-.342.445-.788.42-1.217.002-.6.038-1.24.118-2.01.082-.978.224-1.73.28-2.104.614.262 1.35.57 2.122.9 2.04.87 4.423 1.92 5.2 2.265.712.367 1.465.258 1.943-.12.476-.377.67-.946.5-1.498-.142-.466-.452-.86-.772-1.208-.507-.53-1.28-1.257-2.14-2.054l-3.92-3.63c-.33-.283-.506-.52-.604-.67.195-.15.81-.66 1.504-1.25 1.07-.905 2.262-1.933 2.416-2.07.518-.465.786-1.225.534-1.906-.248-.68-.848-1.02-1.49-1.105-.127-.016-.254-.022-.38-.022zm-.172 1.33c.687.06.87.23.9.288.042.095.03.275-.166.452-.266.23-1.43 1.236-2.4 2.056-.926.784-1.815 1.536-2.08 1.742-.636.49-.705 1.303-.434 1.777.24.424.684.784 1.074 1.123l3.906 3.617c.868.804 1.653 1.545 2.105 2.006.15.158.292.343.356.574.07.25.008.477-.143.597-.128.103-.476.152-.818-.024-.625-.282-2.93-1.29-4.914-2.135-.827-.352-1.614-.682-2.287-.966-.884-.316-1.126.102-1.192.19-.12.47-.145.975-.225 1.91-.079.94-.186 2.06-.262 2.722.135.346-.27.8-.356.849-.41.27-.91.205-1.004 0-.516-1.885-1.04-3.822-1.567-5.763-.08-.292-.134-.42-.51-.562-1.46-.464-3.27-.994-5.026-1.553-.5-.159-.726-.264-.793-.355-.066-.089-.109-.237-.066-.368.037-.114.11-.189.177-.245.342-.283 1.583-.76 3.244-1.402 1.662-.643 3.848-1.496 6.02-2.33 4.362-1.676 8.672-3.32 9.025-3.455.233-.09.348-.058.378-.038.027.02.049.045.042.09z"/>
                          </svg>
                        Telegram
                        </button>
                        <button
                          onClick={() => shareReferral("facebook")}
                        className="flex items-center gap-2 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                            viewBox="0 0 24 24"
                          fill="#1877F2"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        Facebook
                        </button>
                    </div>
                  </div>

                  <div className="p-5 bg-[#0A0F33] rounded-lg border-l-4 border-[#0DF5E3]">
                    <div className="flex items-start gap-3">
                      <div className="text-[#0DF5E3] text-2xl">💡</div>
                      <div>
                        <h3 className="font-bold mb-1">Pro Tip</h3>
                        <p className="text-sm text-[#B3C6FF]">
                          The more active users you refer, the higher your tier and rewards. Reach Platinum tier to earn
                          up to 0.15 SOL per referral!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className="card p-6">
                  <h2 className="text-xl font-bold mb-4">Referral History</h2>
                  <p className="text-[#B3C6FF] mb-6">
                    Track the status of your referrals and rewards earned.
                  </p>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                        <tr className="text-left border-b border-[#1B2A6E]">
                          <th className="pb-3 px-2 text-[#B3C6FF] font-medium">User</th>
                          <th className="pb-3 px-2 text-[#B3C6FF] font-medium">Date</th>
                          <th className="pb-3 px-2 text-[#B3C6FF] font-medium">Status</th>
                          <th className="pb-3 px-2 text-[#B3C6FF] font-medium text-right">Reward</th>
                          </tr>
                        </thead>
                        <tbody>
                        {referralHistory.map((referral) => (
                            <motion.tr
                              key={referral.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="border-b border-[#1B2A6E] last:border-0 hover:bg-[#17245F]/50 cursor-pointer transition-colors"
                            >
                            <td className="py-4 px-2">
                                <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#17245F] flex items-center justify-center text-xs">
                                    {referral.username.charAt(0)}
                                  </div>
                                  <span>{referral.username}</span>
                                </div>
                              </td>
                            <td className="py-4 px-2 text-[#B3C6FF]">{formatDate(referral.date)}</td>
                            <td className="py-4 px-2">
                                {referral.status === "completed" ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0DF5E3]/20 text-[#0DF5E3]">
                                    Completed
                                  </span>
                                ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFB400]/20 text-[#FFB400]">
                                    Pending
                                  </span>
                                )}
                              </td>
                            <td className="py-4 px-2 text-right font-medium">
                              {referral.status === "completed" ? (
                                <span className="text-[#0DF5E3]">{referral.reward}</span>
                              ) : (
                                <span className="text-[#B3C6FF]">--</span>
                              )}
                            </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
              )}

              {activeTab === "tiers" && (
                  <div className="card p-6">
                  <h2 className="text-xl font-bold mb-4">Reward Tiers</h2>
                  <p className="text-[#B3C6FF] mb-6">
                    The more friends you refer, the higher your tier and the more rewards you earn.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {referralTiers.map((tier, index) => (
                        <motion.div
                          key={tier.level}
                        className="card overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                        <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: tier.bgColor }}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                stroke={tier.iconColor}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                              >
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold" style={{ color: tier.iconColor }}>{tier.level}</h3>
                          </div>
                          
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 text-[#0DF5E3]">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <div>
                                <div className="text-[#B3C6FF]">Referrals needed:</div>
                                <div className="font-medium">{tier.referrals}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 text-[#0DF5E3]">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              <div>
                                <div className="text-[#B3C6FF]">Base reward:</div>
                                <div className="font-medium">{tier.reward}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 text-[#0DF5E3]">
                                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              <div>
                                <div className="text-[#B3C6FF]">Bonus:</div>
                                <div className="font-medium">{tier.bonusReward}</div>
                              </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>

                  <div className="mt-8 p-5 bg-[#0A0F33] rounded-lg border-l-4 border-[#8A3FFC]">
                    <div className="flex items-start gap-3">
                      <div className="text-[#8A3FFC] text-2xl">🏆</div>
                        <div>
                        <h3 className="font-bold mb-1">Bonus Rewards</h3>
                        <p className="text-sm text-[#B3C6FF]">
                          If your referrals complete at least 3 quests, you'll receive an additional 0.02 SOL per active referral!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <div className="card p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0DF5E3]/20 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0DF5E3]"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-[#B3C6FF] mb-6">Connect your wallet to access the referral program and start earning rewards.</p>
            
            <div className="flex justify-center">
            <WalletConnect />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
