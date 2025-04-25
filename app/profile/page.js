"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
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

export default function Profile() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [activeTab, setActiveTab] = useState("badges") // badges, quests, stats
  const [userBadges, setUserBadges] = useState([])

  useEffect(() => {
    // In a real app, you would fetch the user's badges from an API
    // For now, we'll use mock data
    setUserBadges(mockBadges)
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

  return (
    <ProtectedRoute>
      <Layout>
        <div className="px-4 py-6 md:px-6">
          {/* Profile Header */}
          <div className="card p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#00a3ff] to-[#7928ca] rounded-full flex items-center justify-center text-2xl font-bold">
                {user?.username?.charAt(0)}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-xl font-bold mb-1">{user?.username}</h1>
                <p className="text-sm text-gray-400 mb-4">
                  {user?.email && <span className="mr-3">Email: {user.email}</span>}
                  {user?.walletAddress && <span>Wallet: {formatWalletAddress(user.walletAddress)}</span>}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#151524] p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Level</p>
                    <p className="font-bold text-[#00a3ff]">5</p>
                  </div>
                  <div className="bg-[#151524] p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Rank</p>
                    <p className="font-bold">#42</p>
                  </div>
                  <div className="bg-[#151524] p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Quests</p>
                    <p className="font-bold">12</p>
                  </div>
                  <div className="bg-[#151524] p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Points</p>
                    <p className="font-bold">3,450</p>
                  </div>
                </div>
              </div>
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">My Badges</h2>
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
              <h2 className="text-lg font-semibold mb-4">Completed Quests</h2>
              <div className="bg-[#151524] rounded-lg p-6 text-center">
                <p className="text-gray-400">Quest history will be displayed here.</p>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">User Statistics</h2>
              <div className="bg-[#151524] rounded-lg p-6 text-center">
                <p className="text-gray-400">Detailed statistics will be displayed here.</p>
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
