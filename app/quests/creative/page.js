"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/Layout"
import Modal from "@/components/Modal"
import ApiLoading from "@/components/ApiLoading"
import ApiError from "@/components/ApiError"
import { useScore } from "@/context/ScoreContext"
import RewardWidget from "@/components/RewardWidget"
import {
  generateCreativePrompt,
  evaluateChallenge,
  getChallengeScores,
  getChallengeDetails
} from "@/services/questApi"
import QuestWelcomeMessage from "@/components/QuestWelcomeMessage"

export default function CreativeChallenge() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [promptData, setPromptData] = useState(null)
  const [challengeId, setChallengeId] = useState(null)
  const [evaluationData, setEvaluationData] = useState(null)
  const [scores, setScores] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showScoresModal, setShowScoresModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const { addReward } = useScore()
  const [showWelcome, setShowWelcome] = useState(true)

  const loadPrompt = async () => {
    try {
      setLoading(true)
      setError(null)
      setEvaluationData(null)
      setScores(null)
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = null
      }
      
      const data = await generateCreativePrompt(48, "hours")
      setPromptData(data)
      setChallengeId(data.id)
      
      // Calculate time remaining
      const endTime = new Date(data.end_time)
      const now = new Date()
      const remainingMs = endTime - now
      setTimeRemaining(remainingMs > 0 ? remainingMs : 0)
    } catch (err) {
      console.error("Failed to load creative prompt:", err)
      setError("Failed to load creative prompt. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    } else {
      setError("Please select a valid PDF file.")
      fileInputRef.current.value = null
      setSelectedFile(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile || !challengeId) return
    
    try {
      setSubmitting(true)
      setError(null)
      
      const result = await evaluateChallenge(challengeId, selectedFile)
      setEvaluationData(result)
      
      // Get scores
      const scoresData = await getChallengeScores(challengeId)
      setScores(scoresData)
      
      // Add creative reward based on score
      const overall = parseFloat(scoresData.overall_score)
      if (overall >= 4) addReward(0.08)
      else if (overall >= 2) addReward(0.04)
      
      // Show success modal
      setShowSuccessModal(true)
    } catch (err) {
      console.error("Failed to submit challenge:", err)
      setError("Failed to submit challenge. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleViewScores = () => {
    setShowScoresModal(true)
  }

  const handleGoToQuests = () => {
    router.push('/quests')
  }

  const formatTimeRemaining = (ms) => {
    if (!ms) return "Time expired"
    
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`
  }

  useEffect(() => {
    loadPrompt()
  }, [])

  // Update time remaining
  useEffect(() => {
    if (!promptData) return

    const timer = setInterval(() => {
      const endTime = new Date(promptData.end_time)
      const now = new Date()
      const remainingMs = endTime - now
      setTimeRemaining(remainingMs > 0 ? remainingMs : 0)
      
      if (remainingMs <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [promptData])

  return (
    <Layout>
      {showWelcome && (
        <QuestWelcomeMessage 
          gameMode="creative" 
          onClose={() => setShowWelcome(false)} 
        />
      )}
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
              <h1 className="text-2xl font-bold">Creative Web3 Challenge</h1>
            </div>
            <div className="flex gap-3">
              {scores && (
                <button
                  onClick={handleViewScores}
                  className="px-4 py-2 bg-[#252540] rounded-lg text-sm hover:bg-[#353560] transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8.99997H8M16 13H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>View Scores</span>
                </button>
              )}
              <button
                onClick={loadPrompt}
                className="px-4 py-2 bg-[#252540] rounded-lg text-sm hover:bg-[#353560] transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 3V8H16M16 16L21 21M21 16C19.8954 17.6094 18.1827 18.5586 16.2895 18.851C14.3962 19.1434 12.4492 18.7494 10.8289 17.7372C9.20861 16.725 8.01816 15.1711 7.5153 13.3677C7.01245 11.5643 7.23374 9.63224 8.13903 7.98754M3 16V11H8M3 8C4.10457 6.39058 5.81731 5.4414 7.71053 5.14895C9.60375 4.85649 11.5508 5.25062 13.1711 6.26284C14.7914 7.27505 15.9818 8.8289 16.4847 10.6323C16.9876 12.4357 16.7663 14.3678 15.861 16.0125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>New Challenge</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {loading ? (
              <ApiLoading text="Loading creative prompt..." />
            ) : error ? (
              <ApiError error={error} onRetry={loadPrompt} />
            ) : promptData ? (
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
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-[#252540] flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3H4V8M9 21H4V16M21 3H16V8M21 21H16V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Challenge ID: {challengeId ? challengeId.substring(0, 8) + '...' : 'Loading...'}</span>
                    </div>
                    <div className="text-sm font-medium px-3 py-1 rounded-full bg-[#252540] flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Time: {formatTimeRemaining(timeRemaining)}</span>
                    </div>
                  </div>

                  <div className="mb-6 space-y-6">
                    <div className="prose prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: promptData.prompt.replace(/\n/g, '<br />') }} />
                    </div>
                    
                    <div className="bg-[#252540]/50 p-4 rounded-lg">
                      <h3 className="font-bold text-white mb-2">Evaluation Criteria</h3>
                      <div className="prose prose-sm prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: promptData.criteria.replace(/\n/g, '<br />') }} />
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8">
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-gray-200">
                        Upload Your Submission (PDF Only)
                      </label>
                      <div className="border-2 border-dashed border-[#252540] rounded-lg p-6 text-center bg-[#101020] hover:bg-[#151530] transition-colors">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="application/pdf"
                          className="hidden"
                          disabled={submitting}
                        />
                        
                        {selectedFile ? (
                          <div className="flex items-center justify-center gap-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 21H19C20.1046 21 21 20.1046 21 19V8.82843C21 8.29799 20.7893 7.78929 20.4142 7.41421L14.5858 1.58579C14.2107 1.21071 13.702 1 13.1716 1H5C3.89543 1 3 1.89543 3 3V19C3 20.1046 3.89543 21 5 21Z" stroke="#00a3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 10L14 17M14 17L11 14M14 17L17 14" stroke="#00a3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 1V5C14 6.10457 14.8954 7 16 7H21" stroke="#00a3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-[#00a3ff]">{selectedFile.name}</span>
                            <button 
                              type="button" 
                              className="ml-2 text-red-400 hover:text-red-300"
                              onClick={() => {
                                setSelectedFile(null)
                                fileInputRef.current.value = null
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => fileInputRef.current.click()}
                            className="cursor-pointer"
                          >
                            <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="mt-1 text-sm text-gray-400">
                              Click to select or drag and drop your PDF file here
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Maximum file size: 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedFile || submitting}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${
                        !selectedFile || submitting
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
                        "Submit Challenge"
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : null}
          </div>
          
          <div className="md:col-span-1 space-y-6">
            {/* Reward Widget Sidebar */}
            <RewardWidget 
              type="creative" 
              questData={{
                scores: scores ? { overall_score: scores.overall_score } : null
              }} 
            />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Submission Evaluated!"
      >
        <div className="p-6">
          <div className="mb-4 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Evaluation Complete</h3>
            <p className="text-gray-300 mb-4">
              Your submission has been evaluated. You can view your scores below.
            </p>
          </div>

          {evaluationData && (
            <div className="prose prose-sm prose-invert max-w-none mb-6 max-h-60 overflow-y-auto custom-scrollbar">
              <div dangerouslySetInnerHTML={{ __html: evaluationData.evaluation.replace(/\n/g, '<br />') }} />
            </div>
          )}

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
                setShowScoresModal(true)
              }}
            >
              View Scores
            </button>
          </div>
        </div>
      </Modal>

      {/* Scores Modal */}
      <Modal
        isOpen={showScoresModal}
        onClose={() => setShowScoresModal(false)}
        title="Challenge Scores"
      >
        <div className="p-6">
          {scores ? (
            <div>
              <div className="mb-6">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-[#00a3ff]">{scores.overall_score}</div>
                  <div className="text-sm text-gray-400 mt-1">Overall Score</div>
                </div>
                
                <div className="space-y-4">
                  <ScoreItem 
                    title="Technical Understanding" 
                    score={scores.technical_understanding.score} 
                    feedback={scores.technical_understanding.feedback}
                  />
                  <ScoreItem 
                    title="Creativity" 
                    score={scores.creativity.score} 
                    feedback={scores.creativity.feedback}
                  />
                  <ScoreItem 
                    title="Clarity" 
                    score={scores.clarity.score} 
                    feedback={scores.clarity.feedback}
                  />
                  <ScoreItem 
                    title="Engagement" 
                    score={scores.engagement.score} 
                    feedback={scores.engagement.feedback}
                  />
                  <ScoreItem 
                    title="Adherence to Requirements" 
                    score={scores.adherence.score} 
                    feedback={scores.adherence.feedback}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-[#252540] hover:bg-[#353560] text-white font-medium py-3 px-4 rounded-lg transition-all"
                  onClick={() => {
                    setShowScoresModal(false)
                    router.push('/quests')
                  }}
                >
                  Back to Quests
                </button>
                <button
                  className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-4 rounded-lg transition-all"
                  onClick={() => setShowScoresModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 mb-4">No scores available.</p>
              <button
                className="w-full bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-4 rounded-lg transition-all"
                onClick={() => setShowScoresModal(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </Modal>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #151524;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #252540;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #353560;
        }
      `}</style>
    </Layout>
  )
}

// Score item component
function ScoreItem({ title, score, feedback }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="bg-[#252540] rounded-lg p-3 transition-all hover:bg-[#2a2a4a]">
      <div className="flex justify-between items-center">
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-2">
          <div className={`font-bold px-2 py-1 rounded-full text-xs ${
            Number(score) >= 4 ? "bg-green-500/20 text-green-400" :
            Number(score) >= 3 ? "bg-blue-500/20 text-blue-400" :
            Number(score) >= 2 ? "bg-yellow-500/20 text-yellow-400" :
            "bg-red-500/20 text-red-400"
          }`}>{score}/5</div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
          >
            {expanded ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Hide
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Show
              </>
            )}
          </button>
        </div>
      </div>
      
      {expanded && (
        <motion.div 
          className="mt-2 text-sm text-gray-300 border-t border-[#353560] pt-2 transition-all"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
        >
          {feedback}
        </motion.div>
      )}
    </div>
  )
} 