"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
import Layout from "@/components/Layout"
import NotificationItem from "@/components/notifications/NotificationItem"
import { useNotifications } from "@/context/NotificationContext"
import WalletConnect from "@/components/WalletConnect"

export default function Notifications() {
  const router = useRouter()
  const { connected } = useWallet()
  const { notifications, markAllAsRead, clearNotifications } = useNotifications()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all") // all, unread, badges, quests, rewards

  useEffect(() => {
    // Check if wallet is connected
    if (!connected) {
      router.push("/")
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [connected, router])

  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read
    if (filter === "badges") return notification.type === "badge_earned"
    if (filter === "quests") return notification.type === "quest_completed"
    if (filter === "rewards") return notification.type === "reward_received"
    return true // "all" filter
  })

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    )
  }

  if (!connected) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-[#151524] rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#00a3ff]"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 max-w-md mb-6">Connect your wallet to view your notifications.</p>
          <WalletConnect />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold">🔔 Notifications</h1>
            <p className="text-sm text-gray-400">Stay updated with your achievements and activities</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === "all" ? "bg-[#00a3ff] text-white" : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === "unread" ? "bg-[#00a3ff] text-white" : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setFilter("unread")}
            >
              Unread
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === "badges" ? "bg-[#00a3ff] text-white" : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setFilter("badges")}
            >
              Badges
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === "quests" ? "bg-[#00a3ff] text-white" : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setFilter("quests")}
            >
              Quests
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-4 gap-2">
          <button
            className="text-sm bg-[#151524] hover:bg-[#252540] px-3 py-1.5 rounded-lg transition-colors"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
          <button
            className="text-sm bg-[#151524] hover:bg-[#252540] px-3 py-1.5 rounded-lg transition-colors text-[#ff3d71]"
            onClick={clearNotifications}
          >
            Clear all
          </button>
        </div>

        <motion.div
          className="card overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-[#252540] rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-gray-400"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No notifications found</h3>
              <p className="text-gray-400">
                {filter === "all"
                  ? "You don't have any notifications yet."
                  : `You don't have any ${filter} notifications.`}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  )
}
