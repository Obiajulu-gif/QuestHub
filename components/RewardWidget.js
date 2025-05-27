"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function RewardWidget({ type, questData = null, rewards = [] }) {
  const [showDetails, setShowDetails] = useState(false)

  // Get appropriate reward status based on type and data
  const getRewardStatus = () => {
    switch (type) {
      case "quiz":
        // For quiz, check if there was a correct answer
        return questData?.correct ? "earned" : "pending"
      case "riddle":
        // For riddles, check if there was a correct answer
        return questData?.correct ? "earned" : "pending"
      case "creative":
        // For creative challenges, check the overall score
        if (!questData?.scores) return "pending"
        const score = parseFloat(questData.scores.overall_score || 0)
        if (score >= 4) return "earned"
        if (score >= 2) return "partial"
        return "none"
      default:
        return "pending"
    }
  }

  // Get reward amount based on status
  const getRewardAmount = () => {
    const status = getRewardStatus()
    
    switch (status) {
      case "earned":
        return type === "creative" ? "0.08 BNB" : "0.05 BNB"
      case "partial":
        return "0.04 BNB"
      default:
        return "0.00 BNB"
    }
  }

  // Get message based on status
  const getMessage = () => {
    const status = getRewardStatus()
    
    switch (status) {
      case "earned":
        return type === "quiz" || type === "riddle" 
          ? "Congratulations! You earned a reward for your correct answer." 
          : "Congratulations! Your creative submission earned the full reward."
      case "partial":
        return "Good effort! You earned a partial reward based on your score."
      case "none":
        return "Your submission score was too low to earn a reward. Try again!"
      default:
        return type === "creative"
          ? "Submit your creative challenge to earn rewards based on your score!" 
          : "Complete the challenge with correct answers to earn rewards!"
    }
  }

  return (
    <motion.div 
      className="bg-[#151524] rounded-xl p-4 border border-[#252540] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-sm text-[#00a3ff]">Reward Status</h3>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-gray-400 hover:text-white"
          title={showDetails ? "Hide details" : "Show details"}
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
            style={{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)' }}
            className="transition-transform duration-300"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          getRewardStatus() === "earned" ? "bg-green-500/20" : 
          getRewardStatus() === "partial" ? "bg-yellow-500/20" : 
          "bg-gray-500/20"
        }`}>
          <span className="text-xl">
            {getRewardStatus() === "earned" ? "🏆" : 
             getRewardStatus() === "partial" ? "🥈" : 
             "🎯"}
          </span>
        </div>
        <div>
          <div className="font-bold text-lg">{getRewardAmount()}</div>
          <div className="text-xs text-gray-400">
            {getRewardStatus() === "earned" ? "Reward earned!" : 
             getRewardStatus() === "partial" ? "Partial reward" : 
             "Pending reward"}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-3">
        {getMessage()}
      </p>

      {showDetails && (
        <motion.div 
          className="mt-3 pt-3 border-t border-[#252540]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-xs font-bold mb-2 text-gray-300">Reward Tiers:</h4>
          <ul className="text-xs text-gray-400 space-y-1.5">
            {type === "creative" ? (
              <>
                <li className="flex items-center justify-between">
                  <span>Score 4.0-5.0:</span>
                  <span className="font-mono">0.08 BNB</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Score 2.0-3.9:</span>
                  <span className="font-mono">0.04 BNB</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Score 0.0-1.9:</span>
                  <span className="font-mono">0.00 BNB</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center justify-between">
                  <span>Correct solution:</span>
                  <span className="font-mono">0.05 BNB</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Incorrect solution:</span>
                  <span className="font-mono">0.00 BNB</span>
                </li>
              </>
            )}
          </ul>
        </motion.div>
      )}
    </motion.div>
  )
} 