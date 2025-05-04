import Image from "next/image"
import Link from "next/link"

// Sample community stats - in a real app, this would come from an API or database
const stats = [
  { label: "Active Users", value: "10,000+" },
  { label: "Countries", value: "120+" },
  { label: "Quests Completed", value: "250,000+" },
  { label: "Community Events", value: "500+" },
]

const CommunitySection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Join Our Global Community</h2>
            <p className="text-indigo-200 mb-6">
              Connect with fellow questers from around the world. Share strategies, celebrate achievements, and
              participate in community events.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">{stat.value}</div>
                  <div className="text-sm text-indigo-200">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/community"
                className="px-6 py-3 bg-white text-indigo-900 hover:bg-indigo-100 font-medium rounded-lg transition-colors"
              >
                Join Community
              </Link>
              <Link
                href="/events"
                className="px-6 py-3 bg-transparent border border-white hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
              >
                Upcoming Events
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-64 md:h-80 lg:h-96 w-full">
              <Image
                src="/collaborative-brainstorm.png"
                alt="QuestHub Community"
                className="object-contain rounded-lg"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent rounded-lg flex items-end justify-center p-6">
                <div className="text-center">
                  <div className="font-medium mb-2">Weekly Community Challenge</div>
                  <div className="text-sm text-indigo-200">Join our weekly challenges and earn exclusive rewards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
