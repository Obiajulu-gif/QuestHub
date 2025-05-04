import Link from "next/link"
import QuestCard from "./QuestCard"

// Sample quest data - in a real app, this would come from an API or database
const featuredQuests = [
  {
    id: "1",
    title: "Blockchain Basics",
    description: "Learn the fundamentals of blockchain technology and earn your first badge.",
    difficulty: "Beginner",
    rewards: "50 XP + Badge",
    category: "Education",
    image: "/quest-knowledge.png",
    completions: 1245,
    timeEstimate: "30 min",
  },
  {
    id: "2",
    title: "Crypto Puzzles",
    description: "Solve cryptographic puzzles and earn exclusive rewards.",
    difficulty: "Intermediate",
    rewards: "100 XP + NFT Badge",
    category: "Puzzle",
    image: "/quest-riddle.png",
    completions: 876,
    timeEstimate: "45 min",
  },
  {
    id: "3",
    title: "Smart Contract Challenge",
    description: "Build your first smart contract and deploy it to the testnet.",
    difficulty: "Advanced",
    rewards: "200 XP + Premium Badge",
    category: "Development",
    image: "/collaborative-code.png",
    completions: 532,
    timeEstimate: "2 hours",
  },
  {
    id: "4",
    title: "Web3 Knowledge Test",
    description: "Test your knowledge of Web3 concepts and technologies.",
    difficulty: "Intermediate",
    rewards: "75 XP + Badge",
    category: "Quiz",
    image: "/quest-brain.png",
    completions: 1089,
    timeEstimate: "20 min",
  },
]

const FeaturedQuests = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Quests</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our most popular challenges and start earning rewards today.
            </p>
          </div>
          <Link
            href="/quests"
            className="mt-4 md:mt-0 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            View All Quests
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedQuests
