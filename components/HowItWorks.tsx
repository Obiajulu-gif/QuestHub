import Image from "next/image"

const steps = [
  {
    id: 1,
    title: "Discover Quests",
    description: "Browse through our extensive collection of quests across various categories and difficulty levels.",
    icon: "/quest-brain.png",
  },
  {
    id: 2,
    title: "Complete Challenges",
    description: "Solve puzzles, answer questions, and complete tasks to progress through each quest.",
    icon: "/quest-riddle.png",
  },
  {
    id: 3,
    title: "Earn Rewards",
    description: "Collect XP, badges, and other rewards for successfully completing quests.",
    icon: "/digital-achievements.png",
  },
  {
    id: 4,
    title: "Climb the Ranks",
    description: "Compete with other questers and rise through the leaderboard rankings.",
    icon: "/golden-victory-cup.png",
  },
]

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How QuestHub Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your journey from novice to quest champion in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 mb-4">
                <Image src={step.icon || "/placeholder.svg"} alt={step.title} className="object-contain" fill />
              </div>
              <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-4">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Start Your Quest?</h3>
              <p className="text-gray-700">
                Join thousands of questers already exploring, learning, and earning rewards.
              </p>
            </div>
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
