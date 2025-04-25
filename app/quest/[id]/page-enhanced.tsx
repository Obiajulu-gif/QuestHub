"use client"

import { useParams } from "next/navigation"
import { QuestDetailComponent } from "@/app/components/quest-detail-component"
import type { Badge } from "@/types/badge"

// Sample badge data
const sampleBadge: Badge = {
  id: "quest-master",
  name: "Quest Master",
  description: "Completed 10 quests successfully",
  image: "/badges/quest-master.png",
  rarity: "Uncommon",
  attributes: [
    { trait_type: "Category", value: "Achievement" },
    { trait_type: "Rarity", value: "Uncommon" },
    { trait_type: "Edition", value: "1 of 500" },
  ],
  owned: true,
}

// Sample quest data - in a real app, this would come from an API or database
const questData = {
  "1": {
    questId: "1",
    title: "Solve the AI Riddle",
    description:
      "I am a digital currency that powers the Solana ecosystem. You can use me to pay for transactions and participate in the network.",
    difficulty: "Easy",
    image: "/virtual-violet.png",
    points: 100,
    reward: "0.005 SOL",
    timeEstimate: "10 min",
    badgeReward: sampleBadge,
  },
  "2": {
    questId: "2",
    title: "Blockchain Quiz Challenge",
    description:
      "Test your knowledge about blockchain technology and cryptocurrency fundamentals with this challenging quiz.",
    difficulty: "Medium",
    image: "/floating-cerebrum.png",
    points: 250,
    reward: "0.01 SOL",
    timeEstimate: "15 min",
    badgeReward: null,
  },
}

export default function EnhancedQuestPage() {
  const params = useParams()
  const questId = typeof params.id === "string" ? params.id : "1"

  // Get quest data based on ID (with fallback)
  const quest = questData[questId] || questData["1"]

  return <QuestDetailComponent {...quest} />
}
