"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { Layout } from "@/components/Layout"
import { useAuth } from "@/context/AuthContext"

/* Add a custom class for hiding scrollbars on mobile */
const hideScrollbarClass = "scrollbar-hide"

// Mock data for leaderboard
const leaderboardData = [
  { rank: 1, profile: "Crypto Whiz", points: 25080, avatar: "/avatars/avatar-1.png" },
  { rank: 2, profile: "Brain Master", points: 21330, avatar: "/avatars/avatar-2.png" },
  { rank: 3, profile: "Quiz King", points: 18131, avatar: "/avatars/avatar-3.png" },
  { rank: 4, profile: "Puzzle Pro", points: 15301, avatar: "/avatars/avatar-4.png" },
  { rank: 5, profile: "Riddle Solver", points: 12023, avatar: "/avatars/avatar-5.png" },
]

// Mock data for quests/tests
const questsData = [
  {
    id: 1,
    title: "Quest for Knowledge",
    image: "/quest-knowledge.png",
    category: "quiz",
    difficulty: "Medium",
    participants: 5678,
    likes: 432,
  },
  {
    id: 2,
    title: "Solve the Riddle",
    image: "/quest-riddle.png",
    category: "riddle",
    difficulty: "Hard",
    participants: 3489,
    likes: 289,
  },
  {
    id: 3,
    title: "Brain Flex Challenge",
    image: "/quest-brain.png",
    category: "challenge",
    difficulty: "Expert",
    participants: 2790,
    likes: 367,
  },
  {
    id: 4,
    title: "Logic Puzzles",
    image: "/quest-logic.png",
    category: "puzzle",
    difficulty: "Medium",
    participants: 4567,
    likes: 321,
  },
  {
    id: 5,
    title: "Memory Masters",
    image: "/quest-memory.png",
    category: "challenge",
    difficulty: "Hard",
    participants: 3298,
    likes: 276,
  },
]

// Hero slider data
const heroSlides = [
  {
    id: 1,
    title: "Battle of the Brains: Leaderboard Showdown",
    subtitle: "Compete with the best minds and climb the ranks",
    image: "/hero-battle.png",
    ctaText: "JOIN CONTEST NOW",
    ctaLink: "/quests",
  },
  {
    id: 2,
    title: "Earn Exclusive NFT Badges",
    subtitle: "Complete quests and collect unique digital achievements",
    image: "/hero-badges.png",
    ctaText: "EXPLORE BADGES",
    ctaLink: "/badges",
  },
  {
    id: 3,
    title: "Daily Challenges & Rewards",
    subtitle: "Test your skills daily and earn SOL rewards",
    image: "/hero-rewards.png",
    ctaText: "START EARNING",
    ctaLink: "/quests",
  },
]

// How it works steps
const howItWorksSteps = [
  {
    id: 1,
    title: "Create an Account",
    description: "Sign up with email or connect your wallet to get started",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#00a3ff]"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    image: "/placeholder.svg?key=m41tr",
  },
  {
    id: 2,
    title: "Choose Your Quests",
    description: "Browse available quests and select ones that match your interests and skills",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#7928ca]"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    image: "/placeholder.svg?key=j6syj",
  },
  {
    id: 3,
    title: "Complete Challenges",
    description: "Solve puzzles, answer questions, and complete tasks to earn points",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#ff3d71]"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    image: "/placeholder.svg?key=y2nqs",
  },
  {
    id: 4,
    title: "Earn Rewards",
    description: "Collect NFT badges, earn cryptocurrency, and climb the leaderboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#ffc107]"
      >
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
    image: "/placeholder.svg?key=t6by7",
  },
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Crypto Enthusiast",
    avatar: "/placeholder.svg?key=blqch",
    content:
      "QuestHub has completely transformed how I engage with learning. The quests are challenging and the rewards make it worth the effort!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Blockchain Developer",
    avatar: "/placeholder.svg?key=j71b2",
    content:
      "I've earned several NFT badges that I proudly display in my collection. The platform makes learning about blockchain fun and rewarding.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Student",
    avatar: "/placeholder.svg?key=ucc0o",
    content:
      "The competitive aspect of QuestHub keeps me coming back. I love seeing my name climb up the leaderboard as I complete more quests.",
    rating: 4,
  },
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function HomePage() {
  const router = useRouter()
  const { connected } = useWallet()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Refs for scroll animations
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const testimonialsRef = useRef(null)
  const questsRef = useRef(null)

  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })
  const questsInView = useInView(questsRef, { once: true, amount: 0.3 })

  const featuresControls = useAnimation()
  const howItWorksControls = useAnimation()
  const testimonialsControls = useAnimation()
  const questsControls = useAnimation()

  useEffect(() => {
    if (featuresInView) featuresControls.start("visible")
    if (howItWorksInView) howItWorksControls.start("visible")
    if (testimonialsInView) testimonialsControls.start("visible")
    if (questsInView) questsControls.start("visible")
  }, [
    featuresInView,
    howItWorksInView,
    testimonialsInView,
    questsInView,
    featuresControls,
    howItWorksControls,
    testimonialsControls,
    questsControls,
  ])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a14]">
        <div className="flex flex-col items-center">
          <div className="text-[#00a3ff] text-2xl font-bold mb-4">QuestHub</div>
          <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section with Slider */}
        <section className="relative">
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14] via-[#0a0a14]/70 to-transparent z-10"></div>
            <Image
              src={heroSlides[currentSlide].image || "/placeholder.svg"}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgJQKVrGgQAAAABJRU5ErkJggg=="
              sizes="100vw"
            />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-lg mx-auto md:mx-0">
                  <motion.h1
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-8 text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-wrap justify-center md:justify-start gap-4"
                  >
                    <Link
                      href={heroSlides[currentSlide].ctaLink}
                      className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-block"
                    >
                      {heroSlides[currentSlide].ctaText}
                    </Link>
                    {!user && (
                      <Link
                        href="/auth/signup"
                        className="bg-transparent border border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-block"
                      >
                        GET STARTED
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-[#00a3ff] w-6" : "bg-white/50"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* Stats Banner */}
        <section className="bg-gradient-to-r from-[#151524] to-[#1e1e32] py-6 border-y border-[#252540]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Active Users</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Quests Available</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                  50K+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">NFT Badges Minted</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">1M+</div>
                <div className="text-xs sm:text-sm text-gray-400">SOL Rewarded</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="px-4 py-12 md:px-6 max-w-7xl mx-auto">
          {/* Features Section */}
          <motion.section
            ref={featuresRef}
            initial="hidden"
            animate={featuresControls}
            variants={staggerContainer}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose QuestHub?
              </motion.h2>
              <motion.p variants={fadeIn} className="text-gray-400 max-w-2xl mx-auto">
                QuestHub combines learning, gaming, and blockchain technology to create a unique experience where your
                achievements have real value.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <motion.div variants={fadeIn} className="bg-[#151524] rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-[#00a3ff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#00a3ff]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Challenging Quests</h3>
                <p className="text-gray-400">
                  Test your knowledge with our diverse range of quests designed to challenge your intellect and expand
                  your skills.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-[#151524] rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-[#7928ca]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#7928ca]"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">NFT Badges</h3>
                <p className="text-gray-400">
                  Collect unique NFT badges as proof of your achievements and showcase them in your profile or trade
                  them on marketplaces.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-[#151524] rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-[#ff3d71]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ff3d71]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Crypto Rewards</h3>
                <p className="text-gray-400">
                  Complete quests and competitions to earn SOL rewards and climb the leaderboard for additional prizes.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.section
            ref={howItWorksRef}
            initial="hidden"
            animate={howItWorksControls}
            variants={staggerContainer}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </motion.h2>
              <motion.p variants={fadeIn} className="text-gray-400 max-w-2xl mx-auto">
                Getting started with QuestHub is easy. Follow these simple steps to begin your journey.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {howItWorksSteps.map((step, index) => (
                <motion.div key={step.id} variants={fadeIn} className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-[#151524] rounded-full flex items-center justify-center mb-6 z-10 relative">
                      {step.icon}
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#00a3ff] to-transparent -z-10 transform -translate-x-10"></div>
                    )}
                  </div>
                  <div className="bg-[#151524] rounded-xl p-6 w-full">
                    <div className="w-full h-40 relative mb-6 overflow-hidden rounded-lg">
                      <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.div variants={fadeIn}>
                {user ? (
                  <Link
                    href="/quests"
                    className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-block"
                  >
                    EXPLORE QUESTS
                  </Link>
                ) : (
                  <Link
                    href="/auth/signup"
                    className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-block"
                  >
                    GET STARTED NOW
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.section>

          {/* Leaderboard and Community Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24">
            {/* Leaderboard */}
            <div className="lg:col-span-2">
              <div className="bg-[#151524] rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Leaderboard</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Filter By:</span>
                      <select className="bg-[#0a0a14] border border-[#252540] rounded-lg px-2 py-1 text-sm">
                        <option>All Time</option>
                        <option>This Week</option>
                        <option>This Month</option>
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
                          transition={{ duration: 0.3, delay: index * 0.1 }}
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
                              <div
                                className="w-8 h-8 rounded-full bg-[#252540]
 flex items-center justify-center text-xs overflow-hidden"
                              >
                                {item.avatar ? (
                                  <Image
                                    src={item.avatar || "/placeholder.svg"}
                                    alt={item.profile}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                    loading="eager"
                                  />
                                ) : (
                                  item.profile.charAt(0)
                                )}
                              </div>
                              <span>{item.profile}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right">{item.points.toLocaleString()}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/leaderboard" className="text-[#00a3ff] text-sm hover:underline">
                    View Full Leaderboard
                  </Link>
                </div>
              </div>
            </div>

            {/* Community Section */}
            <div className="lg:col-span-1">
              <div className="bg-[#151524] rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Community</h2>

                {/* Online Members */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Online Now</h3>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((id) => (
                      <div key={id} className="relative cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-[#252540] overflow-hidden">
                          <Image
                            src={`/avatars/avatar-${id}.png`}
                            alt={`User ${id}`}
                            width={40}
                            height={40}
                            className="object-cover"
                            loading="eager"
                          />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#151524]"></div>
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-[#252540] flex items-center justify-center text-sm text-gray-400">
                      +24
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        user: "CryptoWhiz",
                        action: "completed the Brain Flex Challenge",
                        time: "5 min ago",
                        avatar: "/avatars/avatar-1.png",
                        icon: (
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
                            className="text-[#00a3ff]"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        ),
                      },
                      {
                        id: 2,
                        user: "BadgeCollector",
                        action: "earned the Logic Master badge",
                        time: "20 min ago",
                        avatar: "/avatars/avatar-2.png",
                        icon: (
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
                            className="text-[#7928ca]"
                          >
                            <circle cx="12" cy="8" r="7"></circle>
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                          </svg>
                        ),
                      },
                      {
                        id: 3,
                        user: "RiddleSolver",
                        action: "joined the weekly contest",
                        time: "1 hour ago",
                        avatar: "/avatars/avatar-3.png",
                        icon: (
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
                            className="text-[#ff3d71]"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        ),
                      },
                    ].map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#252540] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {activity.avatar ? (
                            <Image
                              src={activity.avatar || "/placeholder.svg"}
                              alt={activity.user}
                              width={32}
                              height={32}
                              className="object-cover"
                              loading="eager"
                            />
                          ) : (
                            activity.icon
                          )}
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>{" "}
                            <span className="text-gray-400">{activity.action}</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* View All Button */}
                <div className="mt-6 text-center">
                  <Link href="/activity" className="text-[#00a3ff] text-sm hover:underline">
                    View All Activity
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <motion.section
            ref={testimonialsRef}
            initial="hidden"
            animate={testimonialsControls}
            variants={staggerContainer}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </motion.h2>
              <motion.p variants={fadeIn} className="text-gray-400 max-w-2xl mx-auto">
                Join thousands of satisfied users who are already enjoying QuestHub's unique experience.
              </motion.p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                      <motion.div variants={fadeIn} className="bg-[#151524] rounded-xl p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                            <p className="text-gray-400">{testimonial.role}</p>
                            <div className="flex text-[#ffc107] mt-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill={i < testimonial.rating ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-lg text-gray-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeTestimonial ? "bg-[#00a3ff] w-6" : "bg-gray-500"
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </motion.section>

          {/* All Tests/Quests Section */}
          <motion.section
            ref={questsRef}
            initial="hidden"
            animate={questsControls}
            variants={staggerContainer}
            className="mb-24"
          >
            <div className="flex items-center justify-between mb-8">
              <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold">
                Popular Quests
              </motion.h2>
              <motion.div variants={fadeIn}>
                <Link href="/quests" className="text-[#00a3ff] text-sm hover:underline flex items-center gap-1">
                  View All
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
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Category Tabs */}
            <motion.div
              variants={fadeIn}
              className={`flex overflow-x-auto pb-2 mb-6 sm:mb-8 gap-2 ${hideScrollbarClass}`}
            >
              {["all", "quiz", "riddle", "challenge", "puzzle"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    activeTab === category ? "bg-[#00a3ff] text-white" : "bg-[#151524] text-gray-300 hover:bg-[#252540]"
                  }`}
                  onClick={() => setActiveTab(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>

            {/* Quest Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {questsData
                .filter((quest) => activeTab === "all" || quest.category === activeTab)
                .map((quest) => (
                  <motion.div
                    key={quest.id}
                    variants={fadeIn}
                    className="bg-[#151524] rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-[#1e1e32]/20 hover:translate-y-[-2px] transition-all duration-300"
                  >
                    <div className="relative h-40">
                      <Image
                        src={quest.image || "/placeholder.svg?height=200&width=200&query=quest background with brain"}
                        alt={quest.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#00a3ff]/80 text-white text-xs px-2 py-1 rounded-md">
                          {quest.difficulty}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-[#252540]/80 text-white text-xs px-2 py-1 rounded-md">
                          {quest.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-1">{quest.title}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                            </svg>
                            <span>{quest.participants.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span>{quest.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#00a3ff] rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.section>

          {/* CTA Banner */}
          <section className="relative mb-24 overflow-hidden rounded-xl">
            <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-r from-[#151524] to-[#252540] rounded-xl overflow-hidden">
              <Image
                src="/cta-background.png"
                alt="Join the community"
                fill
                className="object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 max-w-2xl">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-4">
                    Ready to Start Your Quest Journey?
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-8">
                    Join thousands of users who are already earning rewards, collecting NFT badges, and climbing the
                    leaderboard.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {user ? (
                      <Link
                        href="/quests"
                        className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-8 rounded-lg transition-all duration-200"
                      >
                        EXPLORE QUESTS
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/auth/signup"
                          className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-8 rounded-lg transition-all duration-200"
                        >
                          SIGN UP NOW
                        </Link>
                        <Link
                          href="/auth/signin"
                          className="bg-transparent border border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200"
                        >
                          SIGN IN
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="mb-12">
            <div className="bg-[#151524] rounded-xl p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                <div className="w-full md:max-w-md">
                  <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                  <p className="text-gray-400 mb-4">
                    Subscribe to our newsletter for the latest quests, rewards, and platform updates.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-[#0a0a14] border border-[#252540] rounded-lg px-4 py-3 focus:outline-none focus:border-[#00a3ff] w-full sm:w-64"
                    />
                    <button className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="relative w-full md:w-80 h-48">
                  <Image
                    src="/newsletter-updates.png"
                    alt="Newsletter"
                    fill
                    className="object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
