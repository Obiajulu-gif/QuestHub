import Image from "next/image"
import Link from "next/link"

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Discover, Complete, <span className="text-yellow-400">Earn</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-lg mx-auto md:mx-0">
              Join the ultimate quest platform where knowledge meets rewards. Complete challenges, earn badges, and
              climb the leaderboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/quests"
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium rounded-lg transition-all transform hover:scale-105 text-center"
              >
                Explore Quests
              </Link>
              <Link
                href="/auth/signup"
                className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-lg transition-all text-center"
              >
                Join Community
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 relative">
            <div className="relative h-64 md:h-80 lg:h-96 w-full">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-md">
                  <Image
                    src="/hero-rewards.png"
                    alt="Quest rewards"
                    className="object-contain z-20 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    fill
                    priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">10K+</div>
            <div className="text-sm md:text-base text-gray-300">Active Questers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">500+</div>
            <div className="text-sm md:text-base text-gray-300">Unique Quests</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">50K+</div>
            <div className="text-sm md:text-base text-gray-300">Badges Earned</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">100K</div>
            <div className="text-sm md:text-base text-gray-300">Rewards Distributed</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
