"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function BadgeCard({ badge }) {
  const [isHovered, setIsHovered] = useState(false)

  // Helper function to get rarity color
  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return {
          text: "text-[#B3C6FF]",
          bg: "bg-[#1B2A6E]",
          border: "border-[#1B2A6E]",
          glow: "shadow-[0_0_10px_rgba(179,198,255,0.3)]"
        }
      case "uncommon":
        return {
          text: "text-[#0DF5E3]",
          bg: "bg-[#0DF5E3]/10",
          border: "border-[#0DF5E3]",
          glow: "shadow-[0_0_10px_rgba(13,245,227,0.5)]"
        }
      case "rare":
        return {
          text: "text-[#8A3FFC]",
          bg: "bg-[#8A3FFC]/10",
          border: "border-[#8A3FFC]",
          glow: "shadow-[0_0_10px_rgba(138,63,252,0.5)]"
        }
      case "epic":
        return {
          text: "text-[#FF4ECD]",
          bg: "bg-[#FF4ECD]/10",
          border: "border-[#FF4ECD]",
          glow: "shadow-[0_0_10px_rgba(255,78,205,0.5)]"
        }
      case "legendary":
        return {
          text: "text-[#FFD700]",
          bg: "bg-[#FFD700]/10",
          border: "border-[#FFD700]",
          glow: "shadow-[0_0_15px_rgba(255,215,0,0.6)]"
        }
      default:
        return {
          text: "text-[#B3C6FF]",
          bg: "bg-[#1B2A6E]",
          border: "border-[#1B2A6E]",
          glow: ""
        }
    }
  }
  
  const rarityStyle = getRarityColor(badge.rarity)
  
  // Badge card class based on rarity
  const getBadgeCardClass = () => {
    switch (badge.rarity.toLowerCase()) {
      case "common":
        return "badge-card"
      case "uncommon":
        return "badge-card"
      case "rare":
        return "badge-card badge-card-rare"
      case "epic":
        return "badge-card badge-card-rare"
      case "legendary":
        return "badge-card badge-card-legendary"
      default:
        return "badge-card"
    }
  }

  return (
    <motion.div
      className={`${getBadgeCardClass()} cursor-pointer relative overflow-hidden transition-all duration-300 h-full ${isHovered ? rarityStyle.glow : ""}`}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Badge Image */}
        <div className="relative h-52 w-full bg-gradient-to-br from-[#0A0F33] to-[#17245F] flex items-center justify-center rounded-t-xl overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          
          {/* Hexagon shape for badge background */}
          <div className="absolute w-32 h-32 mx-auto" style={{
            background: badge.rarity.toLowerCase() === "legendary" ? "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,107,0,0.2))" : 
                       badge.rarity.toLowerCase() === "epic" ? "linear-gradient(135deg, rgba(255,78,205,0.2), rgba(138,63,252,0.2))" :
                       badge.rarity.toLowerCase() === "rare" ? "linear-gradient(135deg, rgba(138,63,252,0.2), rgba(0,164,255,0.2))" :
                       badge.rarity.toLowerCase() === "uncommon" ? "linear-gradient(135deg, rgba(13,245,227,0.2), rgba(6,68,169,0.2))" :
                       "linear-gradient(135deg, rgba(27,42,110,0.2), rgba(10,15,51,0.2))",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}></div>
          
          <div className="relative z-10 transform transition-transform duration-700 hover:scale-110 hover:rotate-3">
            <Image
              src={badge.image || "/blank-badge.png"}
              width={150}
              height={150}
              alt={badge.name}
              className="object-contain drop-shadow-lg"
              loading="lazy"
              quality={85}
            />
          </div>
        </div>

        {/* Rarity tag */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${rarityStyle.bg} border ${rarityStyle.border} text-xs font-medium ${rarityStyle.text}`}>
          {badge.rarity}
        </div>

        {/* Owned Badge Indicator */}
        {badge.owned && (
          <div className="absolute top-3 right-3 bg-[#0DF5E3] rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#060B27"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
        )}

        {/* Locked Badge Overlay */}
        {!badge.owned && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="text-5xl mb-2">🔒</div>
            <div className="text-white text-sm font-medium">Complete Quests to Unlock</div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-2">{badge.name}</h3>
        <p className="text-sm text-[#B3C6FF] mb-3 line-clamp-2">{badge.description}</p>

        <div className="flex items-center justify-between text-xs mt-2">
          {badge.dateEarned ? (
            <div className="text-[#687FCA] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Earned: {new Date(badge.dateEarned).toLocaleDateString()}
            </div>
          ) : (
            <div className="text-[#FF4ECD]">Not earned yet</div>
          )}
          
          {/* View details button */}
          <button 
            className="text-[#0DF5E3] hover:underline font-medium flex items-center gap-1"
          >
            Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M19 12l-7-7m7 7l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
