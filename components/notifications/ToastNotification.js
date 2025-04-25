"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useNotifications, NOTIFICATION_TYPES } from "@/context/NotificationContext"

export default function ToastNotification({ notification, onClose }) {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()
  const { markAsRead } = useNotifications()

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Handle animation complete
  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose()
    }
  }

  // Handle notification click
  const handleClick = () => {
    markAsRead(notification.id)

    // Navigate based on notification type
    switch (notification.type) {
      case NOTIFICATION_TYPES.BADGE_EARNED:
        router.push(`/badges?highlight=${notification.data.badgeId}`)
        break
      case NOTIFICATION_TYPES.QUEST_COMPLETED:
        router.push(`/quests?highlight=${notification.data.questId}`)
        break
      default:
        // Do nothing for other notification types
        break
    }

    setIsVisible(false)
  }

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 bg-[#151524] rounded-lg shadow-lg overflow-hidden z-50 max-w-sm w-full"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={handleClick}
        >
          <div className="p-4 cursor-pointer">
            <div className="flex items-start gap-3">
              {notification.image ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#252540]">
                  <Image
                    src={notification.image || "/placeholder.svg"}
                    width={48}
                    height={48}
                    alt={notification.title}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#252540] flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#00a3ff]"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
              )}

              <div className="flex-1">
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-400">{notification.message}</p>
                <p className="text-xs text-[#00a3ff] mt-1">Click to view</p>
              </div>

              <button
                className="text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsVisible(false)
                }}
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
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="h-1 bg-[#00a3ff]"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
