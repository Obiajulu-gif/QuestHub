"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/Layout"
import Modal from "@/components/Modal"
import ApiLoading from "@/components/ApiLoading"
import ApiError from "@/components/ApiError"
import { useScore } from "@/context/ScoreContext"
import RewardWidget from "@/components/RewardWidget"
import {
  fetchRiddle,
  checkRiddleAnswer,
  getRiddleBreakOptions,
  resetRiddle
} from "@/services/questApi"

export default function RiddleGame() {
  const router = useRouter()
  const [riddleData, setRiddleData] = useState(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showBreakModal, setShowBreakModal] = useState(false)
  const [breakOptions, setBreakOptions] = useState("")
  const { addReward } = useScore()

  const loadRiddle = async () => {
    try {
      setLoading(true)
      setError(null)
      setFeedback(null)
      setUserAnswer("")
      
      const data = await fetchRiddle()
      setRiddleData(data)
    } catch (err) {
      console.error("Failed to load riddle:", err)
      setError("Failed to load riddle. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSubmit = async (e) => {
    e.preventDefault()
    if (!userAnswer.trim()) return
    
    try {
      setSubmitting(true)
      setFeedback(null)
      
      // Normalize answer to lowercase for case-insensitive matching
      const cleanedAnswer = userAnswer.trim().toLowerCase()
      const result = await checkRiddleAnswer(cleanedAnswer)
      
      if (result.correct) {
        // Add riddle reward
        addReward(0.005)
        setFeedback({ type: "success", message: result.message })
        // Show success modal after a delay
        setTimeout(() => {
          setShowSuccessModal(true)
        }, 1500)
      } else {
        setFeedback({
          type: "error",
          message: result.message,
          hint: result.hint
        })
        
        // If no attempts left, show failure message
        if (result.attempts_remaining <= 0) {
          setTimeout(() => {
            loadRiddle() // Load a new riddle after delay
          }, 3000)
        }
      }
    } catch (err) {
      console.error("Failed to submit answer:", err)
      setFeedback({
        type: "error",
        message: "Failed to submit answer. Please try again."
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleTakeBreak = async () => {
    try {
      const breakData = await getRiddleBreakOptions()
      setBreakOptions(breakData.break_options || "")
      setShowBreakModal(true)
    } catch (err) {
      console.error("Failed to load break options:", err)
      setError("Failed to load break options. Please try again.")
    }
  }

  const handleGoToQuests = () => {
    router.push('/quests')
  }

  const handleResetRiddle = async () => {
    try {
      await resetRiddle()
      loadRiddle()
    } catch (err) {
      console.error("Failed to reset riddle:", err)
      setError("Failed to reset riddle. Please try again.")
    }
  }

  useEffect(() => {
    loadRiddle()
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header with navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleGoToQuests}
                className="p-2 rounded-full bg-[#252540] hover:bg-[#353560] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h1 className="text-2xl font-bold">Blockchain Riddle Challenge</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleTakeBreak}
                className="px-4 py-2 bg-[#252540] rounded-lg text-sm hover:bg-[#353560] transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 9V15M14 9V15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Take a Break</span>
              </button>
              <button
                onClick={handleResetRiddle}
                className="px-4 py-2 bg-[#252540] rounded-lg text-sm hover:bg-[#353560] transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 3V8H16M16 16L21 21M21 16C19.8954 17.6094 18.1827 18.5586 16.2895 18.851C14.3962 19.1434 12.4492 18.7494 10.8289 17.7372C9.20861 16.725 8.01816 15.1711 7.5153 13.3677C7.01245 11.5643 7.23374 9.63224 8.13903 7.98754M3 16V11H8M3 8C4.10457 6.39058 5.81731 5.4414 7.71053 5.14895C9.60375 4.85649 11.5508 5.25062 13.1711 6.26284C14.7914 7.27505 15.9818 8.8289 16.4847 10.6323C16.9876 12.4357 16.7663 14.3678 15.861 16.0125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Reset Riddle</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {loading ? (
              <ApiLoading text="Loading riddle..." />
            ) : error ? (
              <ApiError error={error} onRetry={loadRiddle} />
            ) : riddleData ? (
              <motion.div
                className="bg-[#151524] rounded-xl p-6 border border-[#252540] relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00a3ff]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00a3ff]/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-[#252540]">
                      Complexity: {riddleData.complexity}/5
                    </div>
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-[#252540] flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Attempts: {riddleData.attempts_remaining}/5</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="bg-[#202040] p-6 rounded-lg mb-8 shadow-inner">
                      <h2 className="text-xl font-medium leading-relaxed">{riddleData.riddle}</h2>
                    </div>
                  </div>

                  {riddleData.hint && (
                    <motion.div 
                      className="bg-[#252540]/50 p-4 rounded-lg mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2 text-[#00a3ff]">
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
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                        </svg>
                        <span>{riddleData.hint}</span>
                      </div>
                    </motion.div>
                  )}

                  {feedback && (
                    <motion.div
                      className={`p-4 rounded-lg mb-6 ${
                        feedback.type === "success"
                          ? "bg-green-500/20 border border-green-500/50"
                          : "bg-red-500/20 border border-red-500/50"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p
                        className={
                          feedback.type === "success" ? "text-green-400" : "text-red-400"
                        }
                      >
                        {feedback.message}
                      </p>
                      {feedback.hint && (
                        <p className="text-gray-300 mt-2 text-sm">Hint: {feedback.hint}</p>
                      )}
                    </motion.div>
                  )}

                  <form onSubmit={handleAnswerSubmit}>
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Enter your answer here"
                          className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-4 pr-12 focus:outline-none focus:border-[#00a3ff] transition-colors"
                          disabled={submitting}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!userAnswer.trim() || submitting}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${
                        !userAnswer.trim() || submitting
                          ? "bg-[#252540] text-gray-400 cursor-not-allowed"
                          : "bg-[#00a3ff] text-white hover:bg-[#0090e0]"
                      }`}
                    >
                      {submitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        "Submit Answer"
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : null}
          </div>
          
          <div className="md:col-span-1 space-y-6">
            {/* Reward Widget */}
            <RewardWidget 
              type="riddle" 
              questData={feedback && feedback.type === "success" ? { correct: true } : null} 
            />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          loadRiddle() // Load a new riddle when closing the success modal
        }}
        title="Correct!"
      >
        <div className="p-6 text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h3 className="text-xl font-bold mb-4">Great job!</h3>
          <p className="mb-6 text-gray-300">
            You've successfully solved the riddle. Ready for the next challenge?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-[#252540] hover:bg-[#353560] text-white font-medium py-3 px-4 rounded-lg transition-all"
              onClick={() => {
                setShowSuccessModal(false)
                router.push('/quests')
              }}
            >
              Back to Quests
            </button>
            <button
              className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-4 rounded-lg transition-all"
              onClick={() => {
                setShowSuccessModal(false)
                loadRiddle()
              }}
            >
              Next Riddle
            </button>
          </div>
        </div>
      </Modal>

      {/* Break Modal */}
      <Modal
        isOpen={showBreakModal}
        onClose={() => setShowBreakModal(false)}
        title="Taking a Break"
      >
        <div className="p-6">
          <div 
            className="text-sm text-gray-300 space-y-2 mb-6 prose prose-sm max-w-none prose-invert"
            dangerouslySetInnerHTML={{ __html: breakOptions.replace(/\n/g, '<br />') }}
          />
          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-[#252540] hover:bg-[#353560] text-white font-medium py-3 px-4 rounded-lg transition-all"
              onClick={() => {
                setShowBreakModal(false)
                router.push('/quests')
              }}
            >
              Back to Quests
            </button>
            <button
              className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-4 rounded-lg transition-all"
              onClick={() => setShowBreakModal(false)}
            >
              Resume Riddle
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  )
} 