"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define notification types
export const NOTIFICATION_TYPES = {
  BADGE_EARNED: "badge_earned",
  QUEST_COMPLETED: "quest_completed",
  REWARD_RECEIVED: "reward_received",
  LEVEL_UP: "level_up",
  SYSTEM: "system",
}

// Create the context
const NotificationContext = createContext()

// Sample notifications for demonstration
const sampleNotifications = [
  {
    id: "1",
    type: NOTIFICATION_TYPES.BADGE_EARNED,
    title: "New Badge Earned!",
    message: "You've earned the Early Adopter badge.",
    image: "/badges/early-adopter.png",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    data: {
      badgeId: "1",
      badgeName: "Early Adopter",
    },
  },
  {
    id: "2",
    type: NOTIFICATION_TYPES.QUEST_COMPLETED,
    title: "Quest Completed",
    message: "You've successfully completed the Riddle Master quest.",
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    data: {
      questId: "3",
      questName: "Riddle Master",
    },
  },
  {
    id: "3",
    type: NOTIFICATION_TYPES.BADGE_EARNED,
    title: "New Badge Earned!",
    message: "You've earned the Quest Master badge.",
    image: "/badges/quest-master.png",
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    data: {
      badgeId: "2",
      badgeName: "Quest Master",
    },
  },
]

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Initialize with sample notifications
  useEffect(() => {
    setNotifications(sampleNotifications)
    updateUnreadCount(sampleNotifications)
  }, [])

  // Update unread count whenever notifications change
  const updateUnreadCount = (notifs) => {
    const count = notifs.filter((notif) => !notif.read).length
    setUnreadCount(count)
  }

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      read: false,
      date: new Date().toISOString(),
      ...notification,
    }

    setNotifications((prev) => {
      const updated = [newNotification, ...prev]
      updateUnreadCount(updated)
      return updated
    })

    // Return the notification ID so it can be referenced later
    return newNotification.id
  }

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
      updateUnreadCount(updated)
      return updated
    })
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((notif) => ({ ...notif, read: true }))
      updateUnreadCount(updated)
      return updated
    })
  }

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications((prev) => {
      const updated = prev.filter((notif) => notif.id !== id)
      updateUnreadCount(updated)
      return updated
    })
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  // Add a badge earned notification
  const addBadgeEarnedNotification = (badge) => {
    return addNotification({
      type: NOTIFICATION_TYPES.BADGE_EARNED,
      title: "New Badge Earned!",
      message: `You've earned the ${badge.name} badge.`,
      image: badge.image,
      data: {
        badgeId: badge.id,
        badgeName: badge.name,
      },
    })
  }

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    addBadgeEarnedNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
