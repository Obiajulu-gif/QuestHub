"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
// Comment out wallet import but keep it for reference
import { useWallet } from "@solana/wallet-adapter-react"
// Update import to use named export
import { Layout } from "@/components/Layout"
import Modal from "@/components/Modal"
import WalletConnect from "@/components/WalletConnect"
import { getFunFact } from "@/services/questApi"

// Quest mapping to proper routes
const questRoutes = {
  "1": "/quests/riddles",
  "2": "/quests/quiz", 
  "3": "/quests/riddles",
  "4": "/quests/riddles",
  "5": "/quests/riddles",
  "6": "/quests/riddles",
  "7": "/quests/riddles",
  "8": "/quests/riddles",
}

export default function QuestDetail({ params }) {
  const router = useRouter()
  // Comment out the useWallet hook and set connected to always be true
  // const { connected } = useWallet()
  const connected = true // Set to always be connected
  const { id } = params
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [factData, setFactData] = useState(null)
  
  const [progress, setProgress] = useState(0) // Keep for backward compatibility
  const [answer, setAnswer] = useState("") // Keep for backward compatibility
  const [attempts, setAttempts] = useState(0) // Keep for backward compatibility
  const [showQuitModal, setShowQuitModal] = useState(false) // Keep for backward compatibility
  const [showSuccessModal, setShowSuccessModal] = useState(false) // Keep for backward compatibility

  // Legacy quest data (kept for backward compatibility)
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
    // Comment out wallet connection check
    /*
    // Check if wallet is connected
    if (!connected) {
      setShowWalletModal(true)
      return
    }
    */

    // Load a fun fact while redirecting
    const loadFunFact = async () => {
      try {
        const data = await getFunFact()
        setFactData(data)
      } catch (err) {
        console.error("Failed to load fun fact:", err)
      }
    }
    
    loadFunFact()

    // Redirect to the proper quest route
    setRedirecting(true)
    const timer = setTimeout(() => {
      const route = questRoutes[id] || "/quests"
      router.push(route)
    }, 2000)

    return () => clearTimeout(timer)
  }, [id, connected, router])

  // Legacy handlers (kept for backward compatibility)
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push("/quests")
  }

  const handleQuit = () => {
    router.push("/quests")
  }

  return (
    <Layout hideNav>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        {redirecting && (
          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="text-4xl mb-4">🚀</div>
              <h1 className="text-xl font-bold mb-2">Redirecting to Quest</h1>
              <p className="text-gray-400">
                You're being redirected to the quest. Please wait a moment...
              </p>
            </div>
            
            <div className="w-full h-2 bg-[#151524] rounded-full overflow-hidden mb-8">
              <motion.div
                className="h-full bg-[#00a3ff]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
            
            {factData && (
              <div className="bg-[#151524] rounded-xl p-6 border border-[#252540]">
                <h3 className="font-bold text-sm text-[#00a3ff] mb-2">While you wait...</h3>
                <div 
                  className="text-sm text-gray-300"
                  dangerouslySetInnerHTML={{ __html: factData.facts.replace(/\n/g, '<br />') }}
                />
              </div>
            )}
          </motion.div>
        )}
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

      {/* Wallet Connection Modal - Kept for reference but not used */}
      <Modal isOpen={showWalletModal} onClose={() => router.push("/quests")} title="Connect Wallet">
        <div className="p-4 text-center">
          <p className="mb-6">You need to connect your wallet to participate in quests.</p>

          <div className="mb-6 flex justify-center">
            <WalletConnect />
          </div>

          <button
            className="w-full bg-[#ff3d71] hover:bg-[#e02e5f] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 mt-4"
            onClick={() => router.push("/quests")}
          >
            Back to Quests
          </button>
        </div>
      </Modal>
    </Layout>
  )
}
