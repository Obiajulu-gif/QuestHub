"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "@/context/NotificationContext"
import ToastNotification from "./ToastNotification"

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])
  const { notifications } = useNotifications()

  // Watch for new notifications to show as toasts
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0]

      // Only show badge earned notifications as toasts
      if (latestNotification.type === "badge_earned" && !latestNotification.read) {
        // Check if this notification is already in toasts
        const exists = toasts.some((toast) => toast.id === latestNotification.id)

        if (!exists) {
          setToasts((prev) => [...prev, latestNotification])
        }
      }
    }
  }, [notifications])

  // Remove a toast
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <>
      {toasts.map((toast) => (
        <ToastNotification key={toast.id} notification={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </>
  )
}
