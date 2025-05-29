"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
// Update import to use named export
import { Layout } from "@/components/Layout"
import Image from "next/image"
import WalletConnect from "@/components/WalletConnect"

// Mock data for community events
const communityEvents = [
  {
    id: 1,
    title: "Weekly Quest Challenge",
    description: "Join our weekly challenge and compete with other questers to win special rewards.",
    date: "2023-11-25T18:00:00Z",
    image: "/collaborative-brainstorm.png",
    participants: 128,
  },
  {
    id: 2,
    title: "Solana Developer Workshop",
    description: "Learn how to build on Solana blockchain with our expert developers.",
    date: "2023-11-30T15:00:00Z",
    image: "/collaborative-code.png",
    participants: 56,
  },
  {
    id: 3,
    title: "NFT Badge Showcase",
    description: "Show off your rarest badges and hear stories behind other collectors' achievements.",
    date: "2023-12-05T19:00:00Z",
    image: "/digital-achievements.png",
    participants: 89,
  },
]

// Mock data for community discussions
const communityDiscussions = [
  {
    id: 1,
    title: "Best strategy for solving riddle quests?",
    author: "CryptoRiddler",
    replies: 24,
    likes: 18,
    lastActivity: "2023-11-20T14:32:00Z",
  },
  {
    id: 2,
    title: "Which badge was the hardest for you to earn?",
    author: "BadgeCollector",
    replies: 42,
    likes: 35,
    lastActivity: "2023-11-21T09:15:00Z",
  },
  {
    id: 3,
    title: "Ideas for new quest types",
    author: "QuestDesigner",
    replies: 31,
    likes: 27,
    lastActivity: "2023-11-22T16:45:00Z",
  },
  {
    id: 4,
    title: "How to maximize rewards from quests?",
    author: "RewardHunter",
    replies: 19,
    likes: 14,
    lastActivity: "2023-11-23T11:20:00Z",
  },
]

// Mock data for community members
const communityMembers = [
  {
    id: 1,
    username: "CryptoExplorer",
    badges: 12,
    quests: 48,
    joined: "2023-04-15",
  },
  {
    id: 2,
    username: "SolanaWizard",
    badges: 18,
    quests: 62,
    joined: "2023-03-22",
  },
  {
    id: 3,
    username: "QuestMaster",
    badges: 24,
    quests: 87,
    joined: "2023-02-10",
  },
  {
    id: 4,
    username: "BlockchainNinja",
    badges: 15,
    quests: 53,
    joined: "2023-05-05",
  },
  {
    id: 5,
    username: "TokenCollector",
    badges: 9,
    quests: 31,
    joined: "2023-06-18",
  },
]

export default function Community() {
  const router = useRouter()
  const { connected } = useWallet()
  const [activeTab, setActiveTab] = useState("events") // events, discussions, members
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Format date for display
  const formatEventDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  // Format relative time for discussions
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? "s" : ""} ago`
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
            <h1 className="text-xl font-bold">👥 Community Hub</h1>
            <p className="text-sm text-gray-400">
              Connect with fellow questers, join events, and share your experiences
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#252540] mb-6 overflow-x-auto hide-scrollbar">
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === "events" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("events")}
          >
            Upcoming Events
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === "discussions" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("discussions")}
          >
            Discussions
          </button>
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === "members" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Active Members
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[60vh]">
          {/* Events Tab */}
          {activeTab === "events" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Upcoming Community Events</h2>
                <button className="text-sm bg-[#00a3ff] hover:bg-[#0090e0] text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <span>Create Event</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="card overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="relative h-40">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <div className="text-xs font-medium bg-[#00a3ff] text-white px-2 py-1 rounded-md inline-block mb-2">
                          {formatEventDate(event.date)}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{event.description}</p>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>{event.participants} participants</span>
                        </div>

                        <button className="text-[#00a3ff] hover:underline">Join</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="text-sm bg-[#151524] hover:bg-[#252540] px-4 py-2 rounded-lg transition-colors">
                  View All Events
                </button>
              </div>
            </motion.div>
          )}

          {/* Discussions Tab */}
          {activeTab === "discussions" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Community Discussions</h2>
                <button className="text-sm bg-[#00a3ff] hover:bg-[#0090e0] text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <line x1="12" y1="7" x2="12" y2="13"></line>
                    <line x1="9" y1="10" x2="15" y2="10"></line>
                  </svg>
                  <span>New Topic</span>
                </button>
              </div>

              <div className="card overflow-hidden">
                {communityDiscussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    className="p-4 border-b border-[#252540] hover:bg-[#1e1e32] transition-colors cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium mb-1">{discussion.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>By {discussion.author}</span>
                          <span>•</span>
                          <span>{formatRelativeTime(discussion.lastActivity)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <span>{discussion.replies}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          <span>{discussion.likes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="text-sm bg-[#151524] hover:bg-[#252540] px-4 py-2 rounded-lg transition-colors">
                  View All Discussions
                </button>
              </div>
            </motion.div>
          )}

          {/* Members Tab */}
          {activeTab === "members" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Active Community Members</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search members..."
                    className="text-sm bg-[#151524] border border-[#252540] rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-[#00a3ff]"
                  />
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {communityMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="card p-4 cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00a3ff] to-[#7928ca] rounded-full flex items-center justify-center text-lg font-bold">
                        {member.username.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-medium">{member.username}</h3>
                        <p className="text-xs text-gray-400">Joined {new Date(member.joined).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="bg-[#151524] p-2 rounded-lg text-center">
                        <div className="text-sm font-medium">{member.badges}</div>
                        <div className="text-xs text-gray-400">Badges</div>
                      </div>

                      <div className="bg-[#151524] p-2 rounded-lg text-center">
                        <div className="text-sm font-medium">{member.quests}</div>
                        <div className="text-xs text-gray-400">Quests</div>
                      </div>
                    </div>

                    <button className="w-full mt-4 text-sm bg-[#1e1e32] hover:bg-[#252540] px-3 py-1.5 rounded-lg transition-colors">
                      View Profile
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="text-sm bg-[#151524] hover:bg-[#252540] px-4 py-2 rounded-lg transition-colors">
                  View All Members
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="mt-12 bg-gradient-to-r from-[#151524] to-[#1e1e32] rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#00a3ff]/20 rounded-full flex items-center justify-center mb-3">
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Be Respectful</h3>
              <p className="text-sm text-gray-400">
                Treat others with respect. No harassment, hate speech, or inappropriate content.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#7928ca]/20 rounded-full flex items-center justify-center mb-3">
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Stay On Topic</h3>
              <p className="text-sm text-gray-400">
                Keep discussions relevant to quests, blockchain, and the QuestHub community.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#ff3d71]/20 rounded-full flex items-center justify-center mb-3">
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="font-medium mb-2">No Scams</h3>
              <p className="text-sm text-gray-400">
                Don't share scams, phishing links, or ask for private keys and seed phrases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
