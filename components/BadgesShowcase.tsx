import Image from "next/image"
import Link from "next/link"

// Sample badges data - in a real app, this would come from an API or database
const featuredBadges = [
  {
    id: "1",
    name: "Early Adopter",
    image: "/badges/early-adopter.png",
    description: "Awarded to the first 1000 users who joined QuestHub.",
    rarity: "Rare",
  },
  {
    id: "2",
    name: "Quest Master",
    image: "/badges/quest-master.png",
    description: "Complete 50 quests to earn this prestigious badge.",
    rarity: "Epic",
  },
  {
    id: "3",
    name: "Riddle Solver",
    image: "/badges/riddle-solver.png",
    description: "Successfully solve 10 cryptographic riddles.",
    rarity: "Uncommon",
  },
  {
    id: "4",
    name: "Community Champion",
    image: "/badges/community-champion.png",
    description: "Contribute to the community and help other questers.",
    rarity: "Legendary",
  },
]

const BadgesShowcase = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Collectible Badges</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Earn unique badges by completing quests and challenges. Show off your achievements!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300"
            >
              <div className="p-4 flex justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="relative w-32 h-32">
                  <Image src={badge.image || "/placeholder.svg"} alt={badge.name} className="object-contain" fill />
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{badge.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      badge.rarity === "Legendary"
                        ? "bg-yellow-100 text-yellow-800"
                        : badge.rarity === "Epic"
                          ? "bg-purple-100 text-purple-800"
                          : badge.rarity === "Rare"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                    }`}
                  >
                    {badge.rarity}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/badges"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            View All Badges
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BadgesShowcase
