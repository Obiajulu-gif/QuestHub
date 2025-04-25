"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
import WalletConnect from "@/components/WalletConnect"
import type { Badge } from "@/types/badge"

interface QuestDetailProps {
  questId: string
  title: string
  description: string
  difficulty: string
  image: string
  points: number
  reward: string
  timeEstimate: string
  badgeReward?: Badge
}

export default function QuestDetailComponent({
  questId,
  title,
  description,
  difficulty,
  image,
  points,
  reward,
  timeEstimate,
  badgeReward,
}: QuestDetailProps) {
  const router = useRouter()
  const { connected } = useWallet()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [answer, setAnswer] = useState("")
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [timer, setTimer] = useState<number>(0)
  const [timerActive, setTimerActive] = useState(false)

  // Handle wallet connection check
  useEffect(() => {
    if (!connected) {
      setShowWalletModal(true)
    } else {
      // Start timer when component loads and wallet is connected
      setTimerActive(true)
    }
  }, [connected])

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive])

  // Format timer to MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setHasError(false)

    try {
      // Simulate API call to verify answer
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes - accept any non-empty answer
      if (answer.trim() === "") {
        throw new Error("Please provide an answer")
      }

      // Stop the timer when answer is submitted
      setTimerActive(false)
      setShowSuccessModal(true)
    } catch (error) {
      setHasError(true)
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Quest Header */}
      <div className="bg-[#151524] rounded-xl overflow-hidden mb-6">
        <div className="relative h-64 w-full">
          <Image
            src={image || "/placeholder.svg?height=400&width=800&query=digital quest background"}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151524] to-transparent"></div>

          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#00a3ff] text-white text-xs px-2 py-1 rounded-full">{difficulty}</span>
              <span className="bg-[#252540] text-gray-300 text-xs px-2 py-1 rounded-full flex items-center gap-1">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {timeEstimate}
              </span>
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-400">
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
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>{points} points</span>
              </div>

              <div className="flex items-center gap-1 text-[#ffc107]">
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
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{reward}</span>
              </div>
            </div>

            {timerActive && (
              <div className="bg-[#252540] px-3 py-1 rounded-lg text-[#00a3ff] font-mono">{formatTime(timer)}</div>
            )}
          </div>

          <p className="text-gray-300">{description}</p>

          {badgeReward && (
            <div className="mt-4 p-3 bg-[#1e1e32] rounded-lg flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#252540] overflow-hidden relative">
                <Image
                  src={badgeReward.image || "/blank-badge.png"}
                  alt={badgeReward.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-sm text-gray-400">Badge Reward</div>
                <div className="font-medium">{badgeReward.name}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quest Challenge Form */}
      <div className="bg-[#151524] rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Challenge</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-300 mb-2">
              Your Answer
            </label>
            <textarea
              id="answer"
              className={`w-full bg-[#0a0a14] border ${hasError ? "border-red-500" : "border-[#252540]"} rounded-lg p-3 min-h-[120px] focus:outline-none focus:border-[#00a3ff]`}
              placeholder="Enter your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isSubmitting || showSuccessModal}
            />
            {hasError && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || showSuccessModal || !connected}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Answer"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Wallet Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#151524] rounded-xl p-6 max-w-sm w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <h3 className="text-xl font-bold mb-4">Connect Wallet</h3>
              <p className="text-gray-300 mb-6">
                You need to connect your wallet to participate in quests and earn rewards.
              </p>

              <div className="mb-6 flex justify-center">
                <WalletConnect />
              </div>

              <button
                className="w-full bg-[#252540] hover:bg-[#303050] text-gray-300 font-medium py-2 rounded-lg transition-all duration-200"
                onClick={() => router.push("/")}
              >
                Back to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#151524] rounded-xl p-6 max-w-sm w-full mx-4 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-green-500"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>

              <h3 className="text-xl font-bold mb-2">Quest Completed!</h3>
              <p className="text-gray-400 mb-2">You've successfully completed this quest.</p>
              <p className="text-[#00a3ff] font-medium mb-6">
                Time: {formatTime(timer)} | +{points} points earned
              </p>

              {badgeReward && (
                <div className="mb-6">
                  <p className="text-gray-400 mb-2">You've earned a new badge!</p>
                  <div className="w-20 h-20 mx-auto relative">
                    <Image
                      src={badgeReward.image || "/blank-badge.png"}
                      alt={badgeReward.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <p className="font-medium text-[#00a3ff] mt-2">{badgeReward.name}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  className="flex-1 bg-[#252540] hover:bg-[#303050] text-gray-300 font-medium py-2 rounded-lg transition-all duration-200"
                  onClick={() => router.push("/quests")}
                >
                  More Quests
                </button>
                <button
                  className="flex-1 bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 rounded-lg transition-all duration-200"
                  onClick={() => router.push(badgeReward ? "/badges" : "/profile")}
                >
                  {badgeReward ? "View Badge" : "View Profile"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
