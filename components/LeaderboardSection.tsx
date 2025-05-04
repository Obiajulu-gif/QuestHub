import Image from "next/image"
import Link from "next/link"

// Sample leaderboard data - in a real app, this would come from an API or database
const topUsers = [
  {
    id: "1",
    name: "CryptoMaster",
    avatar: "/avatars/avatar-1.png",
    points: 12450,
    badges: 42,
    rank: 1,
  },
  {
    id: "2",
    name: "BlockchainWiz",
    avatar: "/avatars/avatar-2.png",
    points: 10890,
    badges: 38,
    rank: 2,
  },
  {
    id: "3",
    name: "QuestHunter",
    avatar: "/avatars/avatar-3.png",
    points: 9675,
    badges: 35,
    rank: 3,
  },
  {
    id: "4",
    name: "TokenCollector",
    avatar: "/avatars/avatar-4.png",
    points: 8540,
    badges: 31,
    rank: 4,
  },
  {
    id: "5",
    name: "Web3Explorer",
    avatar: "/avatars/avatar-5.png",
    points: 7890,
    badges: 29,
    rank: 5,
  },
]

const LeaderboardSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Leaderboard Champions</h2>
            <p className="text-indigo-200 max-w-2xl">
              Our top performers who've mastered the most quests and earned the highest rewards.
            </p>
          </div>
          <Link
            href="/leaderboard"
            className="mt-4 md:mt-0 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-colors"
          >
            Full Leaderboard
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/20">
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-right">Points</th>
                  <th className="px-4 py-3 text-right">Badges</th>
                  <th className="px-4 py-3 text-right hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user) => (
                  <tr key={user.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {user.rank <= 3 ? (
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                              user.rank === 1
                                ? "bg-yellow-500 text-yellow-900"
                                : user.rank === 2
                                  ? "bg-gray-300 text-gray-700"
                                  : "bg-amber-700 text-amber-200"
                            }`}
                          >
                            {user.rank}
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-700 mr-2">
                            {user.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 mr-3">
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="rounded-full object-cover"
                            fill
                          />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium">{user.points.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">{user.badges}</td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      {user.rank === 1 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-yellow-900">
                          Champion
                        </span>
                      ) : user.rank <= 3 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500 text-white">
                          Elite
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-700 text-indigo-200">
                          Top Player
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeaderboardSection
