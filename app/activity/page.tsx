"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Layout } from "@/components/Layout"

// Mock data for activities
const activitiesData = [
  {
    id: 1,
    type: "quest_completed",
    user: {
      name: "CryptoWhiz",
      avatar: "/avatars/avatar-1.png",
      id: "user1",
    },
    content: {
      title: "Brain Flex Challenge",
      description: "Completed with a score of 95/100",
      image: "/quest-brain.png",
    },
    timestamp: "5 minutes ago",
    likes: 24,
    comments: 3,
  },
  {
    id: 2,
    type: "badge_earned",
    user: {
      name: "BadgeCollector",
      avatar: "/avatars/avatar-2.png",
      id: "user2",
    },
    content: {
      title: "Logic Master",
      description: "Earned for completing 10 logic puzzles",
      image: "/badges/quest-master.png",
    },
    timestamp: "20 minutes ago",
    likes: 18,
    comments: 2,
  },
  {
    id: 3,
    type: "joined_contest",
    user: {
      name: "RiddleSolver",
      avatar: "/avatars/avatar-3.png",
      id: "user3",
    },
    content: {
      title: "Weekly Brain Battle",
      description: "Joined the contest with 128 other participants",
      image: "/hero-battle.png",
    },
    timestamp: "1 hour ago",
    likes: 12,
    comments: 0,
  },
  {
    id: 4,
    type: "quest_created",
    user: {
      name: "PuzzleMaster",
      avatar: "/avatars/avatar-4.png",
      id: "user4",
    },
    content: {
      title: "Cryptic Conundrums",
      description: "Created a new quest with 5 challenging puzzles",
      image: "/quest-riddle.png",
    },
    timestamp: "3 hours ago",
    likes: 31,
    comments: 7,
  },
  {
    id: 5,
    type: "level_up",
    user: {
      name: "BrainTrainer",
      avatar: "/avatars/avatar-5.png",
      id: "user5",
    },
    content: {
      title: "Level 10 Achieved",
      description: "Reached expert level status",
      image: "/digital-achievements.png",
    },
    timestamp: "5 hours ago",
    likes: 42,
    comments: 8,
  },
  {
    id: 6,
    type: "quest_completed",
    user: {
      name: "MindHacker",
      avatar: "/avatars/avatar-1.png",
      id: "user6",
    },
    content: {
      title: "Memory Masters",
      description: "Completed with a perfect score",
      image: "/quest-memory.png",
    },
    timestamp: "6 hours ago",
    likes: 19,
    comments: 2,
  },
  {
    id: 7,
    type: "badge_earned",
    user: {
      name: "QuestChampion",
      avatar: "/avatars/avatar-2.png",
      id: "user7",
    },
    content: {
      title: "Early Adopter",
      description: "Earned for being one of the first 100 users",
      image: "/badges/early-adopter.png",
    },
    timestamp: "8 hours ago",
    likes: 27,
    comments: 4,
  },
  {
    id: 8,
    type: "reward_claimed",
    user: {
      name: "TokenCollector",
      avatar: "/avatars/avatar-3.png",
      id: "user8",
    },
    content: {
      title: "50 SOL Reward",
      description: "Claimed for winning the monthly challenge",
      image: "/overflowing-treasure.png",
    },
    timestamp: "10 hours ago",
    likes: 56,
    comments: 12,
  },
]

// Trending topics data
const trendingTopics = [
  {
    id: 1,
    title: "Weekly Brain Battle",
    participants: 128,
    category: "contest",
  },
  {
    id: 2,
    title: "Logic Master Badge",
    earners: 45,
    category: "badge",
  },
  {
    id: 3,
    title: "Cryptic Conundrums",
    completions: 76,
    category: "quest",
  },
  {
    id: 4,
    title: "Memory Challenge",
    participants: 92,
    category: "challenge",
  },
]

// Suggested users data
const suggestedUsers = [
  {
    id: "user10",
    name: "PuzzleGenius",
    avatar: "/avatars/avatar-4.png",
    badges: 12,
    quests: 34,
  },
  {
    id: "user11",
    name: "CryptoQueen",
    avatar: "/avatars/avatar-5.png",
    badges: 8,
    quests: 27,
  },
  {
    id: "user12",
    name: "BrainWizard",
    avatar: "/avatars/avatar-1.png",
    badges: 15,
    quests: 41,
  },
]

// Activity type icons
const activityIcons = {
  quest_completed: (
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
      className="text-[#00a3ff]"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  badge_earned: (
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
      className="text-[#7928ca]"
    >
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  ),
  joined_contest: (
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
      className="text-[#ff3d71]"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  quest_created: (
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
      className="text-[#00d68f]"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="12" y1="18" x2="12" y2="12"></line>
      <line x1="9" y1="15" x2="15" y2="15"></line>
    </svg>
  ),
  level_up: (
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
      className="text-[#ffc107]"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  ),
  reward_claimed: (
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
      className="text-[#ffc107]"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  ),
}

export default function ActivityFeed() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [likedActivities, setLikedActivities] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLike = (activityId: number) => {
    if (likedActivities.includes(activityId)) {
      setLikedActivities(likedActivities.filter((id) => id !== activityId))
    } else {
      setLikedActivities([...likedActivities, activityId])
    }
  }

  const filteredActivities = activitiesData.filter((activity) => {
    if (activeFilter === "all") return true
    return activity.type === activeFilter
  })

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a14]">
        <div className="flex flex-col items-center">
          <div className="text-[#00a3ff] text-2xl font-bold mb-4">QuestHub</div>
          <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-[#151524] rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Activity Feed</h2>

              {/* Activity Type Filters */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Filter By Type</h3>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      activeFilter === "all" ? "bg-[#00a3ff]/20 text-[#00a3ff]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setActiveFilter("all")}
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
                      className={activeFilter === "all" ? "text-[#00a3ff]" : "text-gray-400"}
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    All Activities
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      activeFilter === "quest_completed" ? "bg-[#00a3ff]/20 text-[#00a3ff]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setActiveFilter("quest_completed")}
                  >
                    {activityIcons.quest_completed}
                    Completed Quests
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      activeFilter === "badge_earned" ? "bg-[#7928ca]/20 text-[#7928ca]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setActiveFilter("badge_earned")}
                  >
                    {activityIcons.badge_earned}
                    Earned Badges
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      activeFilter === "joined_contest" ? "bg-[#ff3d71]/20 text-[#ff3d71]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setActiveFilter("joined_contest")}
                  >
                    {activityIcons.joined_contest}
                    Joined Contests
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      activeFilter === "quest_created" ? "bg-[#00d68f]/20 text-[#00d68f]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setActiveFilter("quest_created")}
                  >
                    {activityIcons.quest_created}
                    Created Quests
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      activeFilter === "level_up" ? "bg-[#ffc107]/20 text-[#ffc107]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setActiveFilter("level_up")}
                  >
                    {activityIcons.level_up}
                    Level Ups
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      activeFilter === "reward_claimed" ? "bg-[#ffc107]/20 text-[#ffc107]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setActiveFilter("reward_claimed")}
                  >
                    {activityIcons.reward_claimed}
                    Claimed Rewards
                  </button>
                </div>
              </div>

              {/* Time Filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Time Period</h3>
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      timeFilter === "all" ? "bg-[#00a3ff]/20 text-[#00a3ff]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setTimeFilter("all")}
                  >
                    All Time
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      timeFilter === "today" ? "bg-[#00a3ff]/20 text-[#00a3ff]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setTimeFilter("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      timeFilter === "week" ? "bg-[#00a3ff]/20 text-[#00a3ff]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setTimeFilter("week")}
                  >
                    This Week
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      timeFilter === "month" ? "bg-[#00a3ff]/20 text-[#00a3ff]" : "hover:bg-[#252540]"
                    }`}
                    onClick={() => setTimeFilter("month")}
                  >
                    This Month
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Activity Feed */}
          <div className="flex-grow">
            <div className="bg-[#151524] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Activity Feed</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Sort By:</span>
                  <select className="bg-[#0a0a14] border border-[#252540] rounded-lg px-2 py-1 text-sm">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Commented</option>
                  </select>
                </div>
              </div>

              {/* Activity List */}
              <div className="space-y-6">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      className="bg-[#0a0a14] rounded-xl p-4 border border-[#252540]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#252540] overflow-hidden flex-shrink-0">
                          <Image
                            src={activity.user.avatar || "/placeholder.svg"}
                            alt={activity.user.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <Link href={`/profile/${activity.user.id}`} className="font-medium hover:text-[#00a3ff]">
                              {activity.user.name}
                            </Link>
                            <span className="text-gray-400 text-sm">•</span>
                            <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            {activityIcons[activity.type as keyof typeof activityIcons]}
                            <span>
                              {activity.type === "quest_completed" && "completed a quest"}
                              {activity.type === "badge_earned" && "earned a badge"}
                              {activity.type === "joined_contest" && "joined a contest"}
                              {activity.type === "quest_created" && "created a quest"}
                              {activity.type === "level_up" && "leveled up"}
                              {activity.type === "reward_claimed" && "claimed a reward"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="font-medium text-lg mb-1">{activity.content.title}</h3>
                        <p className="text-gray-400 text-sm">{activity.content.description}</p>
                      </div>

                      {activity.content.image && (
                        <div className="mb-4 relative h-48 rounded-lg overflow-hidden">
                          <Image
                            src={activity.content.image || "/placeholder.svg"}
                            alt={activity.content.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <button
                            className={`flex items-center gap-1 ${
                              likedActivities.includes(activity.id) ? "text-[#00a3ff]" : "text-gray-400"
                            } hover:text-[#00a3ff]`}
                            onClick={() => handleLike(activity.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill={likedActivities.includes(activity.id) ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span>{likedActivities.includes(activity.id) ? activity.likes + 1 : activity.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-[#00a3ff]">
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
                              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            <span>{activity.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-[#00a3ff]">
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
                              <circle cx="18" cy="5" r="3"></circle>
                              <circle cx="6" cy="12" r="3"></circle>
                              <circle cx="18" cy="19" r="3"></circle>
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            <span>Share</span>
                          </button>
                        </div>
                        <Link
                          href={`/quest/${activity.id}`}
                          className="text-[#00a3ff] hover:underline flex items-center gap-1"
                        >
                          View Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
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
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No activities found</h3>
                    <p className="text-gray-400">Try changing your filters to see more results</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#252540] text-gray-400 hover:bg-[#00a3ff] hover:text-white">
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
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00a3ff] text-white">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#252540] text-gray-400 hover:bg-[#00a3ff] hover:text-white">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#252540] text-gray-400 hover:bg-[#00a3ff] hover:text-white">
                    3
                  </button>
                  <span className="text-gray-400">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#252540] text-gray-400 hover:bg-[#00a3ff] hover:text-white">
                    10
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#252540] text-gray-400 hover:bg-[#00a3ff] hover:text-white">
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
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Trending & Suggestions */}
          <div className="md:w-72 flex-shrink-0">
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-[#151524] rounded-xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Trending</h2>
                  <Link href="/trending" className="text-[#00a3ff] text-xs hover:underline">
                    See All
                  </Link>
                </div>
                <div className="space-y-4">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="bg-[#0a0a14] rounded-lg p-3 cursor-pointer hover:bg-[#252540]">
                      <h3 className="font-medium mb-1">{topic.title}</h3>
                      <div className="flex items-center text-xs text-gray-400">
                        {topic.category === "contest" && <span>{topic.participants} participants</span>}
                        {topic.category === "badge" && <span>{topic.earners} users earned</span>}
                        {topic.category === "quest" && <span>{topic.completions} completions</span>}
                        {topic.category === "challenge" && <span>{topic.participants} participants</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Users */}
              <div className="bg-[#151524] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Suggested Users</h2>
                  <Link href="/discover" className="text-[#00a3ff] text-xs hover:underline">
                    Discover More
                  </Link>
                </div>
                <div className="space-y-4">
                  {suggestedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#252540] overflow-hidden">
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/profile/${user.id}`} className="font-medium hover:text-[#00a3ff]">
                            {user.name}
                          </Link>
                          <div className="text-xs text-gray-400">
                            {user.badges} badges • {user.quests} quests
                          </div>
                        </div>
                      </div>
                      <button className="text-xs bg-[#252540] hover:bg-[#00a3ff] text-white px-3 py-1 rounded-full">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
