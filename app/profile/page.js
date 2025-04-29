"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Layout } from "@/components/Layout"
import { useAuth } from "@/context/AuthContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import BadgeCard from "@/components/badges/BadgeCard"
import BadgeDetailModal from "@/components/badges/BadgeDetailModal"

// Mock data for badges
const mockBadges = [
  {
    id: "1",
    name: "Early Adopter",
    description: "One of the first users to join QuestHub",
    image: "/badges/early-adopter.png",
    rarity: "Rare",
    dateEarned: "2023-04-15",
    attributes: [
      { trait_type: "Category", value: "Membership" },
      { trait_type: "Rarity", value: "Rare" },
      { trait_type: "Edition", value: "1 of 100" },
    ],
    owned: true,
  },
  {
    id: "2",
    name: "Quest Master",
    description: "Completed 10 quests successfully",
    image: "/badges/quest-master.png",
    rarity: "Uncommon",
    dateEarned: "2023-05-20",
    attributes: [
      { trait_type: "Category", value: "Achievement" },
      { trait_type: "Rarity", value: "Uncommon" },
      { trait_type: "Edition", value: "1 of 500" },
    ],
    owned: true,
  },
  {
    id: "5",
    name: "Quiz Wizard",
    description: "Answered 20 quiz questions correctly",
    image: "/badges/quiz-wizard.png",
    rarity: "Common",
    dateEarned: "2023-06-10",
    attributes: [
      { trait_type: "Category", value: "Achievement" },
      { trait_type: "Rarity", value: "Common" },
      { trait_type: "Edition", value: "1 of 1000" },
    ],
    owned: true,
  },
  {
    id: "6",
    name: "First Quest",
    description: "Completed your first quest",
    image: "/badges/first-quest.png",
    rarity: "Common",
    dateEarned: "2023-04-16",
    attributes: [
      { trait_type: "Category", value: "Achievement" },
      { trait_type: "Rarity", value: "Common" },
      { trait_type: "Edition", value: "1 of 2000" },
    ],
    owned: true,
  },
]

// Mock data for quests
const mockCompletedQuests = [
  {
    id: 1,
    title: "Introduction to Blockchain",
    category: "Educational",
    difficulty: "Easy",
    completedDate: "2023-05-15",
    reward: "0.01 SOL",
    image: "/quest-knowledge.png",
  },
  {
    id: 2,
    title: "Crypto Riddles Vol. 1",
    category: "Riddle",
    difficulty: "Medium",
    completedDate: "2023-06-02",
    reward: "0.02 SOL",
    image: "/quest-riddle.png",
  },
  {
    id: 3,
    title: "Logic Puzzle Challenge",
    category: "Puzzle",
    difficulty: "Hard",
    completedDate: "2023-06-20",
    reward: "0.05 SOL",
    image: "/quest-logic.png",
  },
]

// Mock data for stats
const mockStats = [
  { label: "Total Quests Completed", value: 12 },
  { label: "Total Rewards Earned", value: "0.15 SOL" },
  { label: "Badges Collected", value: 4 },
  { label: "Current Streak", value: "5 days" },
  { label: "Highest Score", value: 950 },
  { label: "Average Completion Time", value: "12 min" },
]

export default function Profile() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [activeTab, setActiveTab] = useState("badges") // badges, quests, stats
  const [userBadges, setUserBadges] = useState([])
  const [completedQuests, setCompletedQuests] = useState([])
  const [stats, setStats] = useState([])

  useEffect(() => {
    // In a real app, you would fetch the user's data from an API
    // For now, we'll use mock data
    setUserBadges(mockBadges)
    setCompletedQuests(mockCompletedQuests)
    setStats(mockStats)
  }, [])

  const openBadgeDetail = (badge) => {
    setSelectedBadge(badge)
  }

  const closeBadgeDetail = () => {
    setSelectedBadge(null)
  }

  // Format wallet address
  const formatWalletAddress = (address) => {
    if (!address) return ""
    return `${address.toString().slice(0, 4)}...${address.toString().slice(-4)}`
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="px-4 py-6 md:px-6 max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="relative mb-8">
            {/* Cover Image */}
            <div className="h-48 md:h-64 rounded-xl overflow-hidden relative">
              <Image
                src="/vibrant-flow.png"
                alt="Profile Cover"
                fill
                className="object-cover"
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgJQKVrGgQAAAABJRU5ErkJggg=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="relative px-4 md:px-8 pb-6 -mt-24">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
                {/* Profile Avatar */}
                <div className="w-32 h-32 bg-gradient-to-br from-[#00a3ff] to-[#7928ca] rounded-full flex items-center justify-center text-4xl font-bold border-4 border-[#0a0a14]">
                  {user?.username?.charAt(0)}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold">{user?.username}</h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 text-sm text-gray-400">
                    {user?.email && (
                      <div className="flex items-center gap-1">
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
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>{user.email}</span>
                      </div>
                    )}
                    {user?.walletAddress && (
                      <div className="flex items-center gap-1">
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
                          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                        <span>{formatWalletAddress(user.walletAddress)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
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
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Joined Apr 2023</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/settings"
                    className="bg-[#151524] hover:bg-[#1e1e32] px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
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
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    <span>Edit Profile</span>
                  </Link>
                  <button className="bg-[#151524] hover:bg-[#1e1e32] p-2 rounded-lg transition-colors">
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
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#151524] p-4 rounded-xl">
              <p className="text-sm text-gray-400">Level</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-[#00a3ff]">5</p>
                <div className="text-xs text-green-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  <span>+1</span>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-[#252540] rounded-full overflow-hidden">
                <div className="h-full bg-[#00a3ff] rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">750/1000 XP to Level 6</p>
            </div>
            <div className="bg-[#151524] p-4 rounded-xl">
              <p className="text-sm text-gray-400">Rank</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold">#42</p>
                <div className="text-xs text-green-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  <span>+3</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Top 5% of all users</p>
            </div>
            <div className="bg-[#151524] p-4 rounded-xl">
              <p className="text-sm text-gray-400">Quests</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-gray-400 mt-3">3 in progress</p>
            </div>
            <div className="bg-[#151524] p-4 rounded-xl">
              <p className="text-sm text-gray-400">Points</p>
              <p className="text-2xl font-bold">3,450</p>
              <p className="text-xs text-gray-400 mt-3">+120 this week</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#252540] mb-6">
            <button
              className={`px-4 py-2 ${
                activeTab === "badges" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("badges")}
            >
              Badges
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "quests" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("quests")}
            >
              Quests
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "stats" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("stats")}
            >
              Stats
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "badges" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">My Badges</h2>
                <button
                  className="text-sm text-[#00a3ff] hover:underline flex items-center gap-1"
                  onClick={() => router.push("/badges")}
                >
                  View All Badges
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
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {userBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => openBadgeDetail(badge)}
                  >
                    <BadgeCard badge={badge} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {activeTab === "quests" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Completed Quests</h2>
                <button
                  className="text-sm text-[#00a3ff] hover:underline flex items-center gap-1"
                  onClick={() => router.push("/quests")}
                >
                  Find New Quests
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
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[#151524] rounded-xl overflow-hidden"
                  >
                    <div className="relative h-40">
                      <Image src={quest.image || "/placeholder.svg"} alt={quest.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#00a3ff]/80 text-white text-xs px-2 py-1 rounded-md">
                          {quest.difficulty}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-[#252540]/80 text-white text-xs px-2 py-1 rounded-md">
                          {quest.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2">{quest.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-400">Completed {formatDate(quest.completedDate)}</div>
                        <div className="text-[#00a3ff]">{quest.reward}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {completedQuests.length === 0 && (
                <div className="bg-[#151524] rounded-xl p-8 text-center">
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">No quests completed yet</h3>
                  <p className="text-gray-400 mb-6">Start your journey by completing your first quest!</p>
                  <Link
                    href="/quests"
                    className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 inline-block"
                  >
                    Browse Quests
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">User Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[#151524] p-6 rounded-xl"
                  >
                    <h3 className="text-gray-400 mb-2">{stat.label}</h3>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-[#151524] p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Activity Heatmap</h3>
                <div className="h-48 flex items-center justify-center">
                  <p className="text-gray-400">Activity visualization will be displayed here.</p>
                </div>
              </div>
            </div>
          )}

          {/* Badge Detail Modal */}
          {selectedBadge && <BadgeDetailModal badge={selectedBadge} onClose={closeBadgeDetail} />}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
