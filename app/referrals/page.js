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
  },
  {
    level: "Silver",
    referrals: "6-15",
    reward: "0.075 SOL per referral",
    bonusReward: "0.5 SOL bonus at 10 referrals",
    color: "from-[#C0C0C0] to-[#A0A0A0]",
  },
  {
    level: "Gold",
    referrals: "16-30",
    reward: "0.1 SOL per referral",
    bonusReward: "1 SOL bonus at 20 referrals",
    color: "from-[#FFD700] to-[#FFA500]",
  },
  {
    level: "Platinum",
    referrals: "31+",
    reward: "0.15 SOL per referral",
    bonusReward: "2 SOL bonus at 50 referrals",
    color: "from-[#E5E4E2] to-[#8A9A9A]",
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
          <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold">🔗 Referral Program</h1>
            <p className="text-sm text-gray-400">Invite friends and earn rewards when they join QuestHub</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                className="card p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1e1e32] flex items-center justify-center">
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
                      className="text-[#00a3ff]"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Total Referrals</div>
                    <div className="font-bold">3</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="card p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1e1e32] flex items-center justify-center">
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
                      className="text-[#ffc107]"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Total Rewards</div>
                    <div className="font-bold">0.15 SOL</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="card p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1e1e32] flex items-center justify-center">
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
                      className="text-[#CD7F32]"
                    >
                      <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
                      <path d="M15 7h6v6"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Current Tier</div>
                    <div className="font-bold">Bronze</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#252540] mb-6 overflow-x-auto hide-scrollbar">
              <button
                className={`px-4 py-2 whitespace-nowrap ${
                  activeTab === "link" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("link")}
              >
                Referral Link
              </button>
              <button
                className={`px-4 py-2 whitespace-nowrap ${
                  activeTab === "history" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Referral History
              </button>
              <button
                className={`px-4 py-2 whitespace-nowrap ${
                  activeTab === "tiers" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("tiers")}
              >
                Reward Tiers
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[60vh]">
              {/* Referral Link Tab */}
              {activeTab === "link" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="card p-6">
                    <h2 className="text-lg font-semibold mb-4">Your Referral Link</h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Share this link with friends. When they sign up and complete their first quest, you'll both
                      receive rewards!
                    </p>

                    <div className="relative mb-6">
                      <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 pr-24 focus:outline-none focus:border-[#00a3ff]"
                      />
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00a3ff] hover:bg-[#0090e0] text-white text-sm px-3 py-1 rounded-md transition-colors"
                        onClick={copyToClipboard}
                      >
                        {copied ? "Copied!" : "Copy Link"}
                      </button>
                    </div>

                    <div className="relative mb-6">
                      <div className="text-sm font-medium mb-2">Referral Code</div>
                      <div className="bg-[#0a0a14] border border-[#252540] rounded-lg p-3 text-center font-mono">
                        {referralCode}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Share via</h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white px-4 py-2 rounded-lg transition-colors"
                          onClick={() => shareReferral("twitter")}
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
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                          <span>Twitter</span>
                        </button>

                        <button
                          className="flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-2 rounded-lg transition-colors"
                          onClick={() => shareReferral("telegram")}
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
                            <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.073l3.9 1.205 2.306 6.54c.376 1.02 1.598 1.688 2.55 1.118l.102-.043a1.107 1.107 0 0 0 .43-.43L21 3.5a.84.84 0 0 0-1.002-1.067z"></path>
                            <path d="M10.002 14.103l-2.496 2.497"></path>
                          </svg>
                          <span>Telegram</span>
                        </button>

                        <button
                          className="flex items-center gap-2 bg-[#3b5998] hover:bg-[#344e86] text-white px-4 py-2 rounded-lg transition-colors"
                          onClick={() => shareReferral("facebook")}
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
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                          <span>Facebook</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#151524] to-[#1e1e32] rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-24 h-24 flex-shrink-0">
                        <Image
                          src="/overflowing-treasure.png"
                          width={96}
                          height={96}
                          alt="Referral rewards"
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">How It Works</h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                          <li>Share your unique referral link with friends</li>
                          <li>When they sign up using your link, they become your referral</li>
                          <li>Once they complete their first quest, you both earn rewards</li>
                          <li>The more friends you refer, the higher your tier and rewards</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Referral History Tab */}
              {activeTab === "history" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="card overflow-hidden">
                    <div className="p-4 border-b border-[#252540]">
                      <h2 className="font-semibold">Your Referral History</h2>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-400 text-sm">
                            <th className="p-4 font-normal">User</th>
                            <th className="p-4 font-normal">Date</th>
                            <th className="p-4 font-normal">Status</th>
                            <th className="p-4 font-normal text-right">Reward</th>
                          </tr>
                        </thead>
                        <tbody>
                          {referralHistory.map((referral, index) => (
                            <motion.tr
                              key={referral.id}
                              className="border-b border-[#252540] last:border-0 hover:bg-[#1e1e32] transition-colors"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-[#252540] flex items-center justify-center text-xs">
                                    {referral.username.charAt(0)}
                                  </div>
                                  <span>{referral.username}</span>
                                </div>
                              </td>
                              <td className="p-4 text-gray-400">{formatDate(referral.date)}</td>
                              <td className="p-4">
                                {referral.status === "completed" ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                    Completed
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                                    Pending
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-right">{referral.reward}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {referralHistory.length === 0 && (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-[#252540] rounded-full flex items-center justify-center mx-auto mb-4">
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
                            className="text-gray-400"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">No referrals yet</h3>
                        <p className="text-gray-400">Share your referral link to start earning rewards!</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Reward Tiers Tab */}
              {activeTab === "tiers" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="card p-6">
                    <h2 className="text-lg font-semibold mb-6">Referral Reward Tiers</h2>
                    <p className="text-sm text-gray-400 mb-6">
                      The more friends you refer, the higher your tier and the more rewards you earn!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {referralTiers.map((tier, index) => (
                        <motion.div
                          key={tier.level}
                          className={`card overflow-hidden border border-[#252540] ${
                            tier.level === "Bronze" ? "ring-2 ring-[#CD7F32]" : ""
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className={`p-4 text-center bg-gradient-to-r ${tier.color} text-white font-bold`}>
                            {tier.level}
                            {tier.level === "Bronze" && <span className="text-xs font-normal ml-2">(Current)</span>}
                          </div>
                          <div className="p-4">
                            <div className="text-center mb-4">
                              <div className="text-sm text-gray-400">Referrals</div>
                              <div className="font-bold">{tier.referrals}</div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
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
                                  className="text-green-400"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>{tier.reward}</span>
                              </div>
                              <div className="flex items-center gap-2">
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
                                  className="text-green-400"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>{tier.bonusReward}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#151524] to-[#1e1e32] rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Bonus Rewards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#00a3ff]/20 rounded-full flex items-center justify-center">
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
                            <circle cx="12" cy="8" r="7"></circle>
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Exclusive Badges</h4>
                          <p className="text-sm text-gray-400">
                            Earn exclusive referral badges at 5, 20, and 50 referrals
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#7928ca]/20 rounded-full flex items-center justify-center">
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
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Early Access</h4>
                          <p className="text-sm text-gray-400">
                            Get early access to new features and quests at 10+ referrals
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-24 h-24 bg-[#151524] rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00a3ff]"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-400 max-w-md mb-6">
              Connect your wallet to access the referral program and start earning rewards.
            </p>
            <WalletConnect />
          </div>
        )}
      </div>
    </Layout>
  )
}
