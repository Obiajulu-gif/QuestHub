"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useNotifications, NOTIFICATION_TYPES } from "@/context/NotificationContext"
import { formatDistanceToNow } from "date-fns"

export default function NotificationItem({ notification, closeDropdown }) {
  const router = useRouter()
  const { markAsRead } = useNotifications()

  // Format the notification date
  const formattedDate = formatDistanceToNow(new Date(notification.date), { addSuffix: true })

  // Handle notification click based on type
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
      case NOTIFICATION_TYPES.REWARD_RECEIVED:
        router.push("/profile")
        break
      default:
        // Do nothing for other notification types
        break
    }

    if (closeDropdown) {
      closeDropdown()
    }
  }

  // Get icon based on notification type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.BADGE_EARNED:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
        )
      case NOTIFICATION_TYPES.QUEST_COMPLETED:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#7928ca]"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        )
      case NOTIFICATION_TYPES.REWARD_RECEIVED:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#ffc107]"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        )
      case NOTIFICATION_TYPES.LEVEL_UP:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#ff3d71]"
          >
            <path d="m6 9 6-6 6 6"></path>
            <path d="M6 12h12"></path>
            <path d="M6 16h12"></path>
            <path d="M6 20h6"></path>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
        )
    }
  }

  return (
    <motion.div
      className={`p-3 border-b border-[#252540] cursor-pointer hover:bg-[#1e1e32] transition-colors ${
        !notification.read ? "bg-[#1e1e32]/50" : ""
      }`}
      onClick={handleClick}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-3">
        {notification.image ? (
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#252540]">
            <Image
              src={notification.image || "/placeholder.svg"}
              width={40}
              height={40}
              alt={notification.title}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#252540] flex items-center justify-center flex-shrink-0">
            {getNotificationIcon()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{notification.title}</h4>
            {!notification.read && <div className="w-2 h-2 rounded-full bg-[#00a3ff]"></div>}
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
        </div>
      </div>
    </motion.div>
  )
}
