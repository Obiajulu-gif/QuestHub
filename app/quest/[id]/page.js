"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
// Update import to use named export
import { Layout } from "@/components/Layout"
import Modal from "@/components/Modal"
import WalletConnect from "@/components/WalletConnect"

export default function QuestDetail({ params }) {
  const router = useRouter()
  const { connected } = useWallet()
  const { id } = params
  const [progress, setProgress] = useState(0)
  const [answer, setAnswer] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [showQuitModal, setShowQuitModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  const quest = {
    id: id,
    title: "Solve the Riddle",
    description:
      "I am a digital currency that powers the Solana ecosystem. You can use me to pay for transactions and participate in the network.",
    question: "What am I?",
    answer: "sol",
    complexity: "1/5",
    maxAttempts: 3,
  }

  useEffect(() => {
    // Check if wallet is connected
    if (!connected) {
      setShowWalletModal(true)
    }

    // Update progress bar
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 25, 100))
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [progress, connected])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (answer.toLowerCase().trim() === quest.answer) {
      setShowSuccessModal(true)
    } else {
      setAttempts((prev) => prev + 1)

      // Add a wrong answer animation
      const answerInput = document.getElementById("answer-input")
      answerInput.classList.add("animate-shake")
      setTimeout(() => {
        answerInput.classList.remove("animate-shake")
      }, 500)
    }
  }

  const handleQuit = () => {
    router.push("/quests")
  }

  return (
    <Layout hideNav>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
          <div className="text-center mb-2">
            <div className="text-sm text-gray-400">Complexity: {quest.complexity}</div>
          </div>

          <div className="text-center mb-2">
            <div className="text-sm text-gray-400">
              Attempts: {attempts}/{quest.maxAttempts}
            </div>
          </div>

          <motion.div
            className="card p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-xl font-bold mb-4">{quest.title}</h1>
            <p className="text-gray-300 mb-4">{quest.description}</p>
            <div className="font-medium mb-6">What am I?</div>

            <div className="bg-[#1e1e32] p-3 rounded-lg mb-6">
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
                <span>Hint: I am the native token of the Solana blockchain.</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                id="answer-input"
                type="text"
                className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 mb-4 focus:outline-none focus:border-[#00a3ff]"
                placeholder="Enter your answer here"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <div className="flex justify-end">
                <button type="submit" className="btn-primary" disabled={attempts >= quest.maxAttempts}>
                  Submit Answer
                </button>
              </div>
            </form>
          </motion.div>

          <div className="w-full bg-[#151524] rounded-full h-2 mb-2">
            <div
              className="bg-[#00a3ff] h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-400">
            <div>Exit Quest</div>
            <div>Submit Answer</div>
          </div>
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      <Modal isOpen={showQuitModal} onClose={() => setShowQuitModal(false)} title="Confirm">
        <div className="p-4">
          <p className="mb-6">Do you want to quit?</p>

          <div className="flex gap-4">
            <button
              className="flex-1 bg-[#ff3d71] hover:bg-[#e02e5f] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              onClick={handleQuit}
            >
              Quit
            </button>
            <button
              className="flex-1 bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              onClick={() => setShowQuitModal(false)}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          router.push("/quests")
        }}
        title="WOW"
      >
        <div className="p-4 text-center">
          <p className="mb-6 text-xl font-bold">You Made It to Lvl 2</p>

          <button
            className="w-full bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            onClick={() => {
              setShowSuccessModal(false)
              router.push("/quests")
            }}
          >
            Okay
          </button>
        </div>
      </Modal>

      {/* Wallet Connection Modal */}
      <Modal isOpen={showWalletModal} onClose={() => router.push("/")} title="Connect Wallet">
        <div className="p-4 text-center">
          <p className="mb-6">You need to connect your wallet to participate in quests.</p>

          <div className="mb-6 flex justify-center">
            <WalletConnect />
          </div>

          <button
            className="w-full bg-[#ff3d71] hover:bg-[#e02e5f] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 mt-4"
            onClick={() => router.push("/")}
          >
            Back to Home
          </button>
        </div>
      </Modal>
    </Layout>
  )
}
