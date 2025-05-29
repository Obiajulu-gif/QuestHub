"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Layout } from "@/components/Layout"
import FunFactWidget from "@/components/FunFactWidget"
import QuestWelcomeMessage from "@/components/QuestWelcomeMessage"
import { getFunFact } from "@/services/questApi"

const questCategories = [
  { id: "all", name: "All", icon: "🔍" },
  { id: "quiz", name: "Quiz", icon: "📝" },
  { id: "riddle", name: "Riddles", icon: "🧩" },
  { id: "creative", name: "Creative", icon: "✨" },
]

const levelFilters = [
  { id: "lvl1", name: "Level 1", color: "#0DF5E3" },
  { id: "lvl2", name: "Level 2", color: "#8A3FFC" },
  { id: "lvl3", name: "Level 3", color: "#FF4ECD", locked: true },
  { id: "lvl4", name: "Level 4", color: "#FFB400", locked: true },
  { id: "lvl5", name: "Level 5", color: "#FF3D6B", locked: true },
]

// Updated quests with proper links and categories
const quests = [
  {
    id: 1,
    title: "Blockchain Quiz Challenge",
    description: "Test your blockchain knowledge with multiple-choice questions about crypto, Web3, and decentralized technologies.",
    image: "/floating-cerebrum.png",
    category: "quiz",
    level: "lvl1",
    time: "15 min",
    reward: "0.05 BNB",
    locked: false,
    route: "/quests/quiz",
  },
  {
    id: 2,
    title: "Blockchain Riddles",
    description: "Solve brain-teasing riddles about blockchain concepts and earn rewards for your critical thinking skills.",
    image: "/virtual-violet.png",
    category: "riddle",
    level: "lvl1",
    time: "10 min",
    reward: "0.005 BNB",
    locked: false,
    route: "/quests/riddles",
  },
  {
    id: 3,
    title: "Creative Web3 Challenge",
    description: "Showcase your understanding of Web3 technologies through creative writing challenges and earn rewards for your innovative ideas.",
    image: "/collaborative-coding.png",
    category: "creative",
    level: "lvl1",
    time: "48 hours",
    reward: "0.08 BNB",
    locked: false,
    route: "/quests/creative",
  },
  {
    id: 4,
    title: "Advanced Blockchain Quiz",
    description: "Challenge yourself with more complex questions about blockchain technology, smart contracts, and DeFi concepts.",
    image: "/single-puzzle-piece.png",
    category: "quiz",
    level: "lvl2",
    time: "15 min",
    reward: "0.05 BNB",
    locked: true,
    route: "/quests/quiz",
  },
  {
    id: 5,
    title: "Advanced Blockchain Riddles",
    description: "Test your problem-solving abilities with more challenging blockchain-related riddles and brain teasers.",
    image: "/collaborative-coding.png",
    category: "riddle",
    level: "lvl2",
    time: "15 min",
    reward: "0.08 BNB",
    locked: true,
    route: "/quests/riddles",
  },
  {
    id: 6,
    title: "Expert Web3 Creative Challenge",
    description: "Develop complex, innovative solutions to Web3 challenges in this advanced creative writing prompt.",
    image: "/single-puzzle-piece.png",
    category: "creative",
    level: "lvl2",
    time: "48 hours",
    reward: "0.1 BNB",
    locked: true,
    route: "/quests/creative",
  },
]

export default function Quests() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeLevel, setActiveLevel] = useState("lvl1")
  const [factData, setFactData] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showWelcome, setShowWelcome] = useState(true)

  const filteredQuests = quests.filter((quest) => {
    // Filter by category
    if (activeCategory !== "all" && quest.category !== activeCategory) return false
    
    // Filter by level
    if (quest.level !== activeLevel) return false
    
    // Filter by search query
    if (searchQuery && !quest.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !quest.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    return true
  })

  useEffect(() => {
    // Fetch an initial fun fact when the page loads
    const loadInitialFact = async () => {
      try {
        const data = await getFunFact()
        setFactData(data)
      } catch (err) {
        console.error("Failed to load fun fact:", err)
      }
    }
    
    loadInitialFact()
  }, [])

  return (
    <Layout>
      {showWelcome && (
        <QuestWelcomeMessage 
          gameMode={null} // null for general welcome
          onClose={() => setShowWelcome(false)} 
        />
      )}
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <span className="text-2xl">🔥</span> Blockchain Quests
            </h1>

            <div className="relative">
              <input
                type="text"
                placeholder="Search quests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#151524] border border-[#252540] rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-[#00a3ff] w-48 md:w-64"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
          </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
          {questCategories.map((category) => (
            <button
              key={category.id}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all flex items-center gap-1 ${
                activeCategory === category.id
                  ? "bg-[#00a3ff] text-white"
                  : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-4">
              <div className="flex items-center justify-end">
                <div className="inline-flex items-center rounded-full bg-[#151524] p-1">
                  {levelFilters.map((level) => (
                    <button
                      key={level.id}
                      disabled={level.locked}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                        activeLevel === level.id
                          ? "bg-[#252540] text-white"
                          : level.locked 
                            ? "text-gray-500 cursor-not-allowed"
                            : "text-gray-300 hover:text-white"
                      }`}
                      onClick={() => !level.locked && setActiveLevel(level.id)}
                    >
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: level.color }}></span>
                        <span>{level.name.replace("Level ", "Lvl ")}</span>
                        {level.locked && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
            </button>
          ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredQuests.length === 0 ? (
          <div className="bg-[#151524] rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No Quests Found</h3>
            <p className="text-gray-400 mb-4">
              Try a different filter or search term to find more quests.
            </p>
            <button 
              onClick={() => {
                setActiveCategory("all")
                setSearchQuery("")
              }}
              className="px-4 py-2 bg-[#00a3ff] text-white rounded-lg text-sm hover:bg-[#0090e0] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-3">
        <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <QuestCard quest={quest} />
            </motion.div>
          ))}
        </motion.div>
            </div>
          </div>
        )}

        {/* Bottom section with Fun Facts and rewards visualization */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fun Facts Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span> Blockchain Knowledge
            </h2>
            <FunFactWidget />
          </div>

          {/* Rewards & Achievements Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">🏆</span> Rewards & Achievements
            </h2>
            <div className="bg-[#151524] rounded-xl p-6 border border-[#252540] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00a3ff]/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#252540] rounded-full flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold">Earn Rewards</div>
                    <div className="text-gray-400 text-sm">Complete quests to earn BNB rewards</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#252540] flex items-center justify-center">
                        <span>📝</span>
                      </div>
                      <span>Quiz Challenge</span>
                    </div>
                    <div className="text-[#00a3ff] font-medium">0.05 BNB</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#252540] flex items-center justify-center">
                        <span>🧩</span>
                      </div>
                      <span>Riddle Challenge</span>
                    </div>
                    <div className="text-[#00a3ff] font-medium">0.05 BNB</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#252540] flex items-center justify-center">
                        <span>✨</span>
                      </div>
                      <span>Creative Challenge</span>
                    </div>
                    <div className="text-[#00a3ff] font-medium">Up to 0.08 BNB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function QuestCard({ quest }) {
  return (
    <div className="quest-card overflow-hidden transition-all duration-300 h-full bg-[#151524] rounded-xl border border-[#252540] hover:shadow-[0_0_15px_rgba(0,163,255,0.3)] hover:border-[#00a3ff]/50 group">
      <div className="relative">
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={quest.image}
            alt={quest.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {quest.locked && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div className="text-4xl mb-2">🔒</div>
              <div className="text-white font-medium text-sm">Complete Previous Level</div>
            </div>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-[#1B2A6E] text-xs font-medium text-white">
          {quest.category === "quiz" && "📝 Quiz"}
          {quest.category === "riddle" && "🧩 Riddle"}
          {quest.category === "creative" && "✨ Creative"}
        </div>
        
        {/* Level indicator */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-[#1B2A6E] text-xs font-medium">
          {quest.level === "lvl1" && <span className="text-[#0DF5E3]">Level 1</span>}
          {quest.level === "lvl2" && <span className="text-[#8A3FFC]">Level 2</span>}
          {quest.level === "lvl3" && <span className="text-[#FF4ECD]">Level 3</span>}
          {quest.level === "lvl4" && <span className="text-[#FFB400]">Level 4</span>}
          {quest.level === "lvl5" && <span className="text-[#FF3D6B]">Level 5</span>}
        </div>

        {/* Time badge */}
        <div className="absolute -bottom-3 right-3 px-3 py-1 rounded-full bg-[#0F1642] border border-[#1B2A6E] text-xs font-medium text-[#B3C6FF]">
          ⏱️ {quest.time}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-white">{quest.title}</h3>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{quest.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-base font-medium text-[#0DF5E3]">{quest.reward}</div>
          </div>
        </div>

        {!quest.locked ? (
          <Link
            href={quest.route}
            className="block w-full py-2 text-center bg-[#00a3ff] hover:bg-[#0090e0] text-white rounded-lg transition-colors font-medium"
          >
            Start Quest
          </Link>
        ) : (
          <button
            disabled
            className="w-full py-2 text-center bg-[#17245F] text-[#687FCA] rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
          >
            Locked
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
