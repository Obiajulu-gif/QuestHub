"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function BadgeCard({ badge }) {
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
    <motion.div
      className="card overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        {/* Badge Image */}
        <div className="relative h-48 w-full bg-gradient-to-br from-[#151524] to-[#252540] flex items-center justify-center">
          {badge.image ? (
            <Image
              src={badge.image || "/placeholder.svg"}
              width={150}
              height={150}
              alt={badge.name}
              className="object-contain max-h-40"
              loading="lazy"
              quality={85}
            />
          ) : (
            <Image
              src={`/blank-badge.png?height=150&width=150&query=badge with ${badge.name}`}
              width={150}
              height={150}
              alt={badge.name}
              className="object-contain max-h-40"
              loading="lazy"
              quality={85}
            />
          )}
        </div>

        {/* Owned Badge Indicator */}
        {badge.owned && (
          <div className="absolute top-2 right-2 bg-[#00a3ff] rounded-full p-1">
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
              className="text-white"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
        )}

        {/* Locked Badge Overlay */}
        {!badge.owned && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
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
              className="text-white"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium mb-1">{badge.name}</h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{badge.description}</p>

        <div className="flex items-center justify-between text-xs">
          <span className={`font-medium ${getRarityColor(badge.rarity)}`}>{badge.rarity}</span>
          {badge.dateEarned && (
            <span className="text-gray-400">Earned: {new Date(badge.dateEarned).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
