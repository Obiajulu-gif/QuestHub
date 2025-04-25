"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Layout from "@/components/Layout"
import QuestCard from "@/components/QuestCard"

const questCategories = [
  { id: "all", name: "All" },
  { id: "quiz", name: "Quiz" },
  { id: "riddles", name: "Riddles" },
]

const levelFilters = [
  { id: "lvl1", name: "Lvl 1" },
  { id: "lvl2", name: "Lvl 2" },
  { id: "lvl3", name: "Lvl 3" },
  { id: "lvl4", name: "Lvl 4" },
  { id: "lvl5", name: "Lvl 5" },
]

const quests = [
  {
    id: 1,
    title: "Solve the AI Riddle",
    image: "/virtual-violet.png",
    category: "riddle",
    level: "lvl1",
    time: "10 min",
    reward: "0.005 BNB",
    locked: false,
  },
  {
    id: 2,
    title: "Solve the Quiz",
    image: "/floating-cerebrum.png",
    category: "quiz",
    level: "lvl1",
    time: "15 min",
    reward: "0.05 BNB",
    locked: false,
  },
  {
    id: 3,
    title: "Solve the AI Riddle",
    image: "/collaborative-coding.png",
    category: "riddle",
    level: "lvl1",
    time: "10 min",
    reward: "0.08 BNB",
    locked: false,
  },
  {
    id: 4,
    title: "Solve the AI Riddle",
    image: "/placeholder.svg?height=200&width=200&query=puzzle piece on blue background",
    category: "riddle",
    level: "lvl1",
    time: "15 min",
    reward: "0.05 BNB",
    locked: false,
  },
  {
    id: 5,
    title: "Solve the AI Riddle",
    image: "/collaborative-coding.png",
    category: "riddle",
    level: "lvl2",
    time: "15 min",
    reward: "0.08 BNB",
    locked: true,
  },
  {
    id: 6,
    title: "Solve the AI Riddle",
    image: "/placeholder.svg?height=200&width=200&query=puzzle piece on blue background",
    category: "riddle",
    level: "lvl2",
    time: "10 min",
    reward: "0.05 BNB",
    locked: true,
  },
  {
    id: 7,
    title: "Solve the AI Riddle",
    image: "/floating-cerebrum.png",
    category: "riddle",
    level: "lvl3",
    time: "10 min",
    reward: "0.08 BNB",
    locked: true,
  },
  {
    id: 8,
    title: "Solve the AI Riddle",
    image: "/placeholder.svg?height=200&width=200&query=brain with weights",
    category: "riddle",
    level: "lvl3",
    time: "15 min",
    reward: "0.05 BNB",
    locked: true,
  },
]

export default function Quests() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeLevel, setActiveLevel] = useState("lvl1")

  const filteredQuests = quests.filter((quest) => {
    if (activeCategory !== "all" && quest.category !== activeCategory) return false
    if (quest.level !== activeLevel) return false
    return true
  })

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">🔥 All Quests</h1>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Filter By:</span>
            <select
              className="bg-[#151524] border border-[#252540] rounded-lg px-2 py-1 text-sm"
              value={activeLevel}
              onChange={(e) => setActiveLevel(e.target.value)}
            >
              {levelFilters.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-2 mb-4 gap-2 hide-scrollbar">
          {questCategories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? "bg-[#00a3ff] text-white"
                  : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
    </Layout>
  )
}
