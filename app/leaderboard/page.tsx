"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Layout } from "@/components/Layout"

// Mock data for leaderboard
const leaderboardData = [
  { rank: 1, profile: "Crypto Whiz", points: 25080, avatar: "/avatars/avatar-1.png" },
  { rank: 2, profile: "Brain Master", points: 21330, avatar: "/avatars/avatar-2.png" },
  { rank: 3, profile: "Quiz King", points: 18131, avatar: "/avatars/avatar-3.png" },
  { rank: 4, profile: "Puzzle Pro", points: 15301, avatar: "/avatars/avatar-4.png" },
  { rank: 5, profile: "Riddle Solver", points: 12023, avatar: "/avatars/avatar-5.png" },
  { rank: 6, profile: "Code Ninja", points: 11567, avatar: "/avatars/avatar-1.png" },
  { rank: 7, profile: "Logic Master", points: 10982, avatar: "/avatars/avatar-2.png" },
  { rank: 8, profile: "Quest Hunter", points: 9876, avatar: "/avatars/avatar-3.png" },
  { rank: 9, profile: "Crypto Expert", points: 9543, avatar: "/avatars/avatar-4.png" },
  { rank: 10, profile: "Badge Collector", points: 8765, avatar: "/avatars/avatar-5.png" },
  { rank: 11, profile: "Blockchain Guru", points: 8432, avatar: "/avatars/avatar-1.png" },
  { rank: 12, profile: "NFT Enthusiast", points: 7654, avatar: "/avatars/avatar-2.png" },
  { rank: 13, profile: "Web3 Pioneer", points: 7321, avatar: "/avatars/avatar-3.png" },
  { rank: 14, profile: "Solana Dev", points: 6789, avatar: "/avatars/avatar-4.png" },
  { rank: 15, profile: "Smart Contract Wizard", points: 6543, avatar: "/avatars/avatar-5.png" },
]

export default function LeaderboardPage() {
  const [filter, setFilter] = useState("all-time")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen pt-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Leaderboard</h1>
            <p className="text-gray-400">
              Compete with the best minds and climb the ranks. Top performers earn exclusive rewards and recognition.
            </p>
          </div>

          <div className="bg-[#151524] rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Rankings</h2>
                <div className="bg-[#00a3ff]/20 text-[#00a3ff] text-sm px-3 py-1 rounded-full">
                  {leaderboardData.length} Players
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Filter By:</span>
                  <select
                    className="bg-[#0a0a14] border border-[#252540] rounded-lg px-3 py-2 text-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all-time">All Time</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="this-year">This Year</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-[#252540]">
                    <th className="pb-4 font-normal">Rank</th>
                    <th className="pb-4 font-normal">Player</th>
                    <th className="pb-4 font-normal">Quests Completed</th>
                    <th className="pb-4 font-normal">Badges</th>
                    <th className="pb-4 font-normal text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((item, index) => (
                    <motion.tr
                      key={index}
                      className="border-b border-[#252540] last:border-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-4">
                        {item.rank === 1 && (
                          <span className="text-[#ffc107] flex items-center">
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
                              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                              <path d="M4 22h16"></path>
                              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                            </svg>
                            <span className="ml-1">1</span>
                          </span>
                        )}
                        {item.rank === 2 && (
                          <span className="text-gray-300 flex items-center">
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
                              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                              <path d="M4 22h16"></path>
                              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                            </svg>
                            <span className="ml-1">2</span>
                          </span>
                        )}
                        {item.rank === 3 && (
                          <span className="text-[#cd7f32] flex items-center">
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
                              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                              <path d="M4 22h16"></path>
                              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                            </svg>
                            <span className="ml-1">3</span>
                          </span>
                        )}
                        {item.rank > 3 && <span className="text-gray-400">{item.rank}</span>}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-[#252540] flex items-center justify-center text-xs overflow-hidden">
                            {item.avatar ? (
                              <Image
                                src={item.avatar || "/placeholder.svg"}
                                alt={item.profile}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            ) : (
                              item.profile.charAt(0)
                            )}
                          </div>
                          <span className="font-medium">{item.profile}</span>
                        </div>
                      </td>
                      <td className="py-4">{Math.floor(item.points / 1000) + Math.floor(Math.random() * 10)}</td>
                      <td className="py-4">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#151524] overflow-hidden">
                              <Image
                                src={`/badges/${["quiz-wizard", "first-quest", "early-adopter"][i]}.png`}
                                alt="Badge"
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {item.rank < 4 && (
                            <div className="w-6 h-6 rounded-full border-2 border-[#151524] overflow-hidden">
                              <Image
                                src="/badges/quest-master.png"
                                alt="Badge"
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold">{item.points.toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#151524] rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Position</h2>
            <div className="bg-[#1e1e32] rounded-lg p-4 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-[#252540] flex items-center justify-center text-lg overflow-hidden">
                  <Image
                    src="/avatars/avatar-3.png"
                    alt="Your Avatar"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Your Rank</div>
                  <div className="text-xl font-bold">42nd</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Quests</div>
                  <div className="text-xl font-bold">24</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Badges</div>
                  <div className="text-xl font-bold">7</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Points</div>
                  <div className="text-xl font-bold">5,432</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
