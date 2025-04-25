"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Modal from "@/components/Modal"
import NFTViewer from "@/components/badges/NFTViewer"
import { useNotifications } from "@/context/NotificationContext"

export default function BadgeDetailModal({ badge, onClose, showEarnedAnimation = false }) {
  const [activeTab, setActiveTab] = useState("details") // details, attributes, nft
  const { addBadgeEarnedNotification } = useNotifications()
  const [showAnimation, setShowAnimation] = useState(showEarnedAnimation)

  // Show notification when badge is earned
  useEffect(() => {
    if (showEarnedAnimation && badge.owned) {
      // Add a slight delay before showing the notification
      const timer = setTimeout(() => {
        addBadgeEarnedNotification(badge)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [showEarnedAnimation, badge, addBadgeEarnedNotification])

  // Helper function to get rarity color
  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "text-gray-300"
      case "uncommon":
        return "text-green-400"
      case "rare":
        return "text-blue-400"
      case "epic":
        return "text-purple-400"
      case "legendary":
        return "text-[#ffc107]"
      default:
        return "text-gray-300"
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={badge.name}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Badge Image */}
          <div className="w-full md:w-1/3">
            <div className="relative h-48 md:h-64 w-full bg-gradient-to-br from-[#151524] to-[#252540] rounded-lg flex items-center justify-center">
              {badge.image ? (
                <Image
                  src={badge.image || "/placeholder.svg"}
                  width={200}
                  height={200}
                  alt={badge.name}
                  className="object-contain max-h-40 md:max-h-56"
                />
              ) : (
                <Image
                  src={`/blank-badge.png?height=200&width=200&query=badge with ${badge.name}`}
                  width={200}
                  height={200}
                  alt={badge.name}
                  className="object-contain max-h-40 md:max-h-56"
                />
              )}

              {/* Badge Earned Animation */}
              <AnimatePresence>
                {showAnimation && (
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onAnimationComplete={() => setShowAnimation(false)}
                  >
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    >
                      <motion.div
                        className="text-4xl font-bold text-[#00a3ff] mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        Badge Earned!
                      </motion.div>
                      <motion.div
                        className="text-lg text-white"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                      >
                        {badge.name}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Badge Status */}
            <div className="mt-4 flex justify-center">
              {badge.owned ? (
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
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
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Owned</span>
                </div>
              ) : (
                <div className="bg-[#252540] text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
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
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Locked</span>
                </div>
              )}
            </div>
          </div>

          {/* Badge Info */}
          <div className="w-full md:w-2/3">
            {/* Tabs */}
            <div className="flex border-b border-[#252540] mb-4">
              <button
                className={`px-4 py-2 text-sm ${
                  activeTab === "details" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`px-4 py-2 text-sm ${
                  activeTab === "attributes" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("attributes")}
              >
                Attributes
              </button>
              <button
                className={`px-4 py-2 text-sm ${
                  activeTab === "nft" ? "border-b-2 border-[#00a3ff] text-[#00a3ff]" : "text-gray-400"
                }`}
                onClick={() => setActiveTab("nft")}
              >
                NFT View
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold">{badge.name}</h3>
                      <p className="text-gray-400">{badge.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Rarity</p>
                        <p className={`font-medium ${getRarityColor(badge.rarity)}`}>{badge.rarity}</p>
                      </div>
                      {badge.dateEarned && (
                        <div>
                          <p className="text-sm text-gray-400">Date Earned</p>
                          <p>{new Date(badge.dateEarned).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>

                    {!badge.owned && (
                      <div className="bg-[#1e1e32] p-3 rounded-lg">
                        <div className="flex items-start gap-2">
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
                            className="text-[#00a3ff] mt-1"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                          </svg>
                          <div>
                            <p className="text-sm">How to earn this badge:</p>
                            <p className="text-xs text-gray-400">{badge.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "attributes" && (
                <motion.div
                  key="attributes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {badge.attributes.map((attr, index) => (
                      <div key={index} className="bg-[#151524] p-3 rounded-lg">
                        <p className="text-xs text-gray-400">{attr.trait_type}</p>
                        <p className="font-medium">{attr.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "nft" && (
                <motion.div
                  key="nft"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <NFTViewer badge={badge} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          {badge.owned && (
            <button className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center gap-2">
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Share Badge</span>
            </button>
          )}
          <button
            className="bg-[#151524] hover:bg-[#252540] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
