"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "@/components/Layout"
import QuestFormStep1 from "@/components/quest-form/QuestFormStep1"
import QuestFormStep2 from "@/components/quest-form/QuestFormStep2"
import QuestFormStep3 from "@/components/quest-form/QuestFormStep3"
import QuestPreview from "@/components/quest-form/QuestPreview"
import Modal from "@/components/Modal"
import WalletConnect from "@/components/WalletConnect"

export default function CreateQuest() {
  const router = useRouter()
  const { connected } = useWallet()
  const [currentStep, setCurrentStep] = useState(1)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "quiz",
    level: "lvl1",
    timeToComplete: "10",
    reward: "0.05",
    question: "",
    answer: "",
    hint: "",
    image: null,
    imagePreview: null,
  })

  // Check if wallet is connected
  useEffect(() => {
    if (!connected) {
      setShowWalletModal(true)
    }
  }, [connected])

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error submitting quest:", error)
      alert("Failed to submit quest. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Toggle preview mode
  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  // Validate current step
  const validateCurrentStep = () => {
    if (currentStep === 1) {
      return formData.title && formData.description && formData.category && formData.level
    } else if (currentStep === 2) {
      return formData.timeToComplete && formData.reward && formData.image
    } else if (currentStep === 3) {
      return formData.question && formData.answer
    }
    return false
  }

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Create New Quest</h1>

          <button
            className="text-sm bg-[#151524] hover:bg-[#1e1e32] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
            onClick={togglePreview}
          >
            {previewMode ? (
              <>
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
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span>Edit</span>
              </>
            ) : (
              <>
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
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Preview</span>
              </>
            )}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-[#151524] rounded-full h-2">
            <div
              className="bg-[#00a3ff] h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {previewMode ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuestPreview formData={formData} />
            </motion.div>
          ) : (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="card p-6"
            >
              {currentStep === 1 && <QuestFormStep1 formData={formData} handleChange={handleChange} />}

              {currentStep === 2 && (
                <QuestFormStep2 formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload} />
              )}

              {currentStep === 3 && <QuestFormStep3 formData={formData} handleChange={handleChange} />}

              <div className="flex justify-between mt-8">
                <button
                  className="px-4 py-2 bg-[#151524] hover:bg-[#1e1e32] rounded-lg transition-colors"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Back
                </button>

                <button className="btn-primary" onClick={nextStep} disabled={!validateCurrentStep() || isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : currentStep === 3 ? (
                    "Submit Quest"
                  ) : (
                    "Next Step"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Wallet Connection Modal */}
      <Modal isOpen={showWalletModal} onClose={() => router.push("/")} title="Connect Wallet">
        <div className="p-4 text-center">
          <p className="mb-6">You need to connect your wallet to create quests.</p>

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

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          router.push("/quests")
        }}
        title="Success!"
      >
        <div className="p-4 text-center">
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

          <h3 className="text-xl font-bold mb-2">Quest Created Successfully!</h3>
          <p className="text-gray-400 mb-6">Your quest has been submitted and is now live.</p>

          <button
            className="w-full bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            onClick={() => {
              setShowSuccessModal(false)
              router.push("/quests")
            }}
          >
            View All Quests
          </button>
        </div>
      </Modal>
    </Layout>
  )
}
