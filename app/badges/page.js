"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { motion } from "framer-motion"
// Update import to use named export
import { Layout } from "@/components/Layout"
import BadgeCard from "@/components/badges/BadgeCard"
import BadgeDetailModal from "@/components/badges/BadgeDetailModal"
// WalletConnect is no longer needed
// import WalletConnect from "@/components/WalletConnect"

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

export default function Badges() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { publicKey } = useWallet()
  const [badges, setBadges] = useState(badgesData)
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [filter, setFilter] = useState("all") // all, owned, available
  const [loading, setLoading] = useState(true)
  const [showEarnedAnimation, setShowEarnedAnimation] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [recipientAddress, setRecipientAddress] = useState("")

  useEffect(() => {
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
  }, [searchParams, badges])

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

  // Function to send a badge to an account
  const sendBadge = (badgeId, recipientAddress) => {
    // Simulate sending badge to recipient
    console.log(`Sending badge ${badgeId} to ${recipientAddress}...`)
    // Show success message
    alert(`Badge successfully sent to ${recipientAddress}`)
    setShowSendModal(false)
    setRecipientAddress("")
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
              className="bg-[#00a3ff] hover:bg-[#0080cc] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
              onClick={() => earnBadge(filteredBadges[0].id)}
            >
              Earn a Badge (Demo)
            </button>
          </div>
        )}

        {/* Badge detail modal */}
        {selectedBadge && (
          <BadgeDetailModal
            badge={selectedBadge}
            onClose={closeBadgeDetail}
            showEarnedAnimation={showEarnedAnimation}
            onSend={() => setShowSendModal(true)}
          />
        )}

        {/* Send Badge Modal */}
        {showSendModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-[#151524] p-6 rounded-xl max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Send Badge to Wallet</h3>
              <p className="text-sm text-gray-400 mb-4">
                Enter the recipient's wallet address to send this badge as an NFT.
              </p>

              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Wallet Address"
                className="w-full p-3 rounded-lg bg-[#252540] border border-[#353550] text-white mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg text-gray-300 hover:bg-[#252540]"
                  onClick={() => setShowSendModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-[#00a3ff] text-white"
                  onClick={() => sendBadge(selectedBadge.id, recipientAddress)}
                  disabled={!recipientAddress}
                >
                  Send Badge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
