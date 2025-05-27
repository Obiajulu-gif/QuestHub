"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const QuestCard = ({ quest }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Different border colors based on difficulty
  const getBorderColor = () => {
    if (quest.level === "lvl1") return "border-[#0DF5E3]"
    if (quest.level === "lvl2") return "border-[#8A3FFC]"
    if (quest.level === "lvl3") return "border-[#FF4ECD]"
    if (quest.level === "lvl4") return "border-[#FFB400]"
    if (quest.level === "lvl5") return "border-[#FF3D6B]"
    return "border-[#0DF5E3]"
  }
  
  // Different glow colors based on difficulty
  const getGlowColor = () => {
    if (quest.level === "lvl1") return "shadow-[0_0_15px_rgba(13,245,227,0.3)]"
    if (quest.level === "lvl2") return "shadow-[0_0_15px_rgba(138,63,252,0.3)]"
    if (quest.level === "lvl3") return "shadow-[0_0_15px_rgba(255,78,205,0.3)]"
    if (quest.level === "lvl4") return "shadow-[0_0_15px_rgba(255,180,0,0.3)]"
    if (quest.level === "lvl5") return "shadow-[0_0_15px_rgba(255,61,107,0.3)]"
    return "shadow-[0_0_15px_rgba(13,245,227,0.3)]"
  }
  
  // Get text color for level indicator
  const getLevelColor = () => {
    if (quest.level === "lvl1") return "text-[#0DF5E3]"
    if (quest.level === "lvl2") return "text-[#8A3FFC]"
    if (quest.level === "lvl3") return "text-[#FF4ECD]"
    if (quest.level === "lvl4") return "text-[#FFB400]"
    if (quest.level === "lvl5") return "text-[#FF3D6B]"
    return "text-[#0DF5E3]"
  }
  
  // Get level name
  const getLevelName = (level) => {
    const levels = {
      lvl1: "Novice",
      lvl2: "Adept", 
      lvl3: "Expert",
      lvl4: "Master",
      lvl5: "Legend"
    }
    return levels[level] || "Unknown"
  }

  return (
    <motion.div
      className={`quest-card card-hover overflow-hidden ${isHovered ? getGlowColor() : ""} transition-all duration-300 h-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
          <Image
            src={quest.image}
            alt={quest.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          {quest.locked && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div className="text-5xl mb-2">🔒</div>
              <div className="text-white font-medium">Complete Previous Level</div>
            </div>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-[#1B2A6E] text-xs font-medium text-white">
          {quest.category}
        </div>
        
        {/* Level indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-[#1B2A6E]">
          <span className={`text-xs font-bold ${getLevelColor()}`}>{getLevelName(quest.level)}</span>
            </div>

        {/* Time badge */}
        <div className="absolute -bottom-3 right-3 px-3 py-1 rounded-full bg-[#0F1642] border border-[#1B2A6E] text-xs font-medium text-[#B3C6FF]">
          ⏱️ {quest.time}
        </div>
            </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold mb-3 text-white">{quest.title}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-base font-medium text-[#0DF5E3]">{quest.reward}</div>
          </div>
        </div>

        {!quest.locked ? (
          <Link
            href={`/quest/${quest.id}`}
            className="btn-primary w-full py-2 text-center flex items-center justify-center gap-2 text-black"
          >
            Start Quest
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        ) : (
          <button
            disabled
            className="w-full py-2 text-center bg-[#17245F] text-[#687FCA] rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
          >
            Locked
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default QuestCard
