"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { motion } from "framer-motion"
// Update import to use named export
import { Layout } from "@/components/Layout"
import BadgeCard from "@/components/badges/BadgeCard"
import BadgeDetailModal from "@/components/badges/BadgeDetailModal"
import WalletConnect from "@/components/WalletConnect"

// Mock data for badges
const badgesData = [
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
    id: "3",
    name: "Riddle Solver",
    description: "Solved 5 difficult riddles",
    image: "/badges/riddle-solver.png",
    rarity: "Epic",
    dateEarned: null,
    attributes: [
      { trait_type: "Category", value: "Achievement" },
      { trait_type: "Rarity", value: "Epic" },
      { trait_type: "Edition", value: "1 of 50" },
    ],
    owned: false,
  },
  {
    id: "4",
    name: "Community Champion",
    description: "Contributed significantly to the QuestHub community",
    image: "/badges/community-champion.png",
    rarity: "Legendary",
    dateEarned: null,
    attributes: [
      { trait_type: "Category", value: "Community" },
      { trait_type: "Rarity", value: "Legendary" },
      { trait_type: "Edition", value: "1 of 10" },
    ],
    owned: false,
  },
  {
    id: "5",
    name: "Quiz Wizard",
    description: "Answered 20 quiz questions correctly",
    image: "/hero-badges.png",
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
    image: "/blank-badge.png",
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

export default function Badges() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { connected } = useWallet()
  const [badges, setBadges] = useState(badgesData)
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [filter, setFilter] = useState("all") // all, owned, available
  const [loading, setLoading] = useState(true)
  const [showEarnedAnimation, setShowEarnedAnimation] = useState(false)

  useEffect(() => {
    // Check if wallet is connected
    if (!connected) {
      setShowWalletModal(true)
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Check if there's a highlighted badge from notification
    const highlightBadgeId = searchParams.get("highlight")
    if (highlightBadgeId) {
      const badge = badges.find((b) => b.id === highlightBadgeId)
      if (badge) {
        setSelectedBadge(badge)
      }
    }

    return () => clearTimeout(timer)
  }, [connected, searchParams, badges])

  // Filter badges based on selected filter
  const filteredBadges = badges.filter((badge) => {
    if (filter === "owned") return badge.owned
    if (filter === "available") return !badge.owned
    return true // "all" filter
  })

  const openBadgeDetail = (badge) => {
    setSelectedBadge(badge)
    setShowEarnedAnimation(false)
  }

  const closeBadgeDetail = () => {
    setSelectedBadge(null)
  }

  // Function to simulate earning a badge
  const earnBadge = (badgeId) => {
    setBadges((prev) =>
      prev.map((badge) => {
        if (badge.id === badgeId && !badge.owned) {
          setSelectedBadge({
            ...badge,
            owned: true,
            dateEarned: new Date().toISOString(),
          })
          setShowEarnedAnimation(true)
          return {
            ...badge,
            owned: true,
            dateEarned: new Date().toISOString(),
          }
        }
        return badge
      }),
    )
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
            <h1 className="text-xl font-bold">🏆 Achievement Badges</h1>
            <p className="text-sm text-gray-400">Collect NFT badges by completing quests and challenges</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === "all" ? "bg-[#00a3ff] text-white" : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setFilter("all")}
            >
              All Badges
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === "owned" ? "bg-[#00a3ff] text-white" : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setFilter("owned")}
            >
              My Collection
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === "available" ? "bg-[#00a3ff] text-white" : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setFilter("available")}
            >
              Available
            </button>
          </div>
        </div>

        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredBadges.map((badge, index) => (
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

          {/* Demo button to earn a badge - for testing notifications */}
          {filter === "available" && filteredBadges.length > 0 && (
            <div className="mt-8 text-center">
              <button
                className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                onClick={() => earnBadge(filteredBadges[0].id)}
              >
                Earn "{filteredBadges[0].name}" Badge (Demo)
              </button>
            </div>
          )}
        </>

        {/* Badge Detail Modal */}
        {selectedBadge && (
          <BadgeDetailModal
            badge={selectedBadge}
            onClose={closeBadgeDetail}
            showEarnedAnimation={showEarnedAnimation}
          />
        )}
      </div>
    </Layout>
  )
}
