"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"

// Sample quest data
const featuredQuests = [
  {
    id: "1",
    title: "Blockchain Basics",
    description: "Learn the fundamentals of blockchain technology and earn your first badge.",
    difficulty: "Beginner",
    rewards: "50 XP + NFT Badge",
    category: "Education",
    image: "/quest-knowledge.png",
    completions: 1289,
    creator: {
      name: "Blockchain Academy",
      avatar: "/avatars/avatar-1.png",
    },
  },
  {
    id: "2",
    title: "Crypto Riddles",
    description: "Solve cryptographic puzzles and earn exclusive rewards.",
    difficulty: "Intermediate",
    rewards: "100 XP + 0.01 SOL",
    category: "Puzzle",
    image: "/quest-riddle.png",
    completions: 856,
    creator: {
      name: "CryptoMaster",
      avatar: "/avatars/avatar-2.png",
    },
  },
  {
    id: "3",
    title: "Smart Contract Challenge",
    description: "Build a simple smart contract and deploy it to the testnet.",
    difficulty: "Advanced",
    rewards: "200 XP + NFT Badge",
    category: "Development",
    image: "/collaborative-code.png",
    completions: 432,
    creator: {
      name: "Web3 Developers",
      avatar: "/avatars/avatar-3.png",
    },
  },
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Web3 Developer",
    avatar: "/avatars/avatar-1.png",
    content:
      "QuestHub has transformed how I learn blockchain concepts. The interactive quests make complex topics accessible and fun!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Crypto Enthusiast",
    avatar: "/avatars/avatar-2.png",
    content:
      "I've earned 12 NFT badges and learned so much about DeFi through the platform. The community is incredibly supportive!",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Student",
    avatar: "/avatars/avatar-4.png",
    content:
      "QuestHub made blockchain learning accessible for me. Now I'm building my own dApps and earning while I learn!",
    rating: 4,
  },
]

// How it works steps
const howItWorksSteps = [
  {
    id: 1,
    title: "Create an Account",
    description: "Sign up with email or connect your wallet to get started on your quest journey.",
    icon: "/single-puzzle-piece.png",
  },
  {
    id: 2,
    title: "Discover Quests",
    description: "Browse through various quests categorized by difficulty, rewards, and topics.",
    icon: "/quest-brain.png",
  },
  {
    id: 3,
    title: "Complete Challenges",
    description: "Solve puzzles, answer questions, and complete tasks to progress through quests.",
    icon: "/quest-logic.png",
  },
  {
    id: 4,
    title: "Earn Rewards",
    description: "Collect NFT badges, XP points, and cryptocurrency rewards for your achievements.",
    icon: "/digital-achievements.png",
  },
]

export default function Home() {
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-100 filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-100 filter blur-3xl opacity-60"></div>
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-green-100 filter blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              className="lg:w-1/2"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Discover, Learn, and <span className="text-purple-600">Earn</span> in the Web3 World
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Join thousands of explorers completing quests, earning NFT badges, and building skills while having fun
                in the decentralized universe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/quests"
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Quests
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-8 py-4 bg-white hover:bg-gray-100 text-purple-600 font-medium rounded-lg border border-purple-200 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Join Now
                </Link>
              </div>

              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={`/avatars/avatar-${i}.png`}
                        alt={`User ${i}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Join 10,000+ explorers</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">4.9/5 from 2,000+ reviews</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-200 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-200 rounded-full filter blur-xl opacity-70 animate-pulse delay-700"></div>

                <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                  <Image src="/hero-battle.png" alt="Quest Hub Hero" width={600} height={400} className="rounded-xl" />

                  <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border border-gray-100">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Quest Completed!</p>
                      <p className="text-xs text-gray-500">+50 XP & NFT Badge</p>
                    </div>
                  </div>

                  <div className="absolute -top-6 -left-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border border-gray-100">
                    <Image
                      src="/badges/first-quest.png"
                      alt="First Quest Badge"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">Badge Earned!</p>
                      <p className="text-xs text-gray-500">First Quest Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <h3 className="text-4xl font-bold text-purple-600 mb-2">10K+</h3>
              <p className="text-gray-600">Active Explorers</p>
            </motion.div>

            <motion.div variants={fadeIn} className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-gray-600">Unique Quests</p>
            </motion.div>

            <motion.div variants={fadeIn} className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <h3 className="text-4xl font-bold text-green-600 mb-2">50K+</h3>
              <p className="text-gray-600">NFT Badges Earned</p>
            </motion.div>

            <motion.div variants={fadeIn} className="p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100">
              <h3 className="text-4xl font-bold text-yellow-600 mb-2">100K+</h3>
              <p className="text-gray-600">SOL Rewarded</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Quests Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Featured Quests
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover popular quests that challenge your skills and reward your achievements
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {featuredQuests.map((quest, index) => (
              <motion.div key={quest.id} variants={fadeIn}>
                <Link href={`/quest/${quest.id}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={quest.image || "/placeholder.svg"} alt={quest.title} fill className="object-cover" />
                      <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {quest.difficulty}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={quest.creator.avatar || "/placeholder.svg"}
                            alt={quest.creator.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-600">{quest.creator.name}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{quest.title}</h3>
                      <p className="text-gray-600 mb-4">{quest.description}</p>

                      <div className="flex justify-between items-center">
                        <span className="text-purple-600 font-medium">{quest.rewards}</span>
                        <span className="text-sm text-gray-500">{quest.completions.toLocaleString()} completions</span>
                      </div>

                      <div className="mt-6 flex justify-between items-center">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                          {quest.category}
                        </span>
                        <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                          Start Quest
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/quests"
              className="inline-flex items-center px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-lg transition-all"
            >
              View All Quests
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              How QuestHub Works
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your journey from novice to expert in four simple steps
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {howItWorksSteps.map((step) => (
              <motion.div key={step.id} variants={fadeIn} className="relative">
                {step.id < howItWorksSteps.length && (
                  <div className="hidden lg:block absolute top-1/4 left-full w-full h-0.5 bg-gray-200 z-0">
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-xl p-6 h-full relative z-10">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Image src={step.icon || "/placeholder.svg"} alt={step.title} width={32} height={32} />
                  </div>

                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                    {step.id}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              What Our Explorers Say
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of satisfied users on their quest journey
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={fadeIn} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>

                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/cta-background.png" alt="CTA Background" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-600/90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Ready to Start Your Quest Journey?
            </motion.h2>
            <motion.p
              className="text-xl mb-10 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of explorers learning, earning, and having fun in the Web3 universe.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-white text-purple-600 font-medium rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Create Free Account
              </Link>
              <Link
                href="/quests"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg transition-all hover:bg-white/10 transform hover:-translate-y-1"
              >
                Explore Quests
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
