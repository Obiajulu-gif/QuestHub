"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
// Update import to use named export
import { Layout } from "@/components/Layout"
import Link from "next/link"

// FAQ categories and questions
const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        id: "what-is-questhub",
        question: "What is QuestHub?",
        answer:
          "QuestHub is a gamified quest platform on the Solana blockchain where users can complete quests, earn badges as NFTs, and win rewards in cryptocurrency. It combines learning, fun challenges, and blockchain technology to create an engaging experience.",
      },
      {
        id: "how-to-start",
        question: "How do I get started with QuestHub?",
        answer:
          "To get started, connect your Solana wallet (like Phantom or Solflare), browse available quests on the Quests page, and start completing them to earn rewards. New users should begin with Level 1 quests to learn the basics.",
      },
      {
        id: "wallet-requirements",
        question: "What wallet do I need to use QuestHub?",
        answer:
          "QuestHub supports popular Solana wallets including Phantom, Solflare, and others. You'll need a small amount of SOL for transaction fees when claiming rewards or minting badge NFTs.",
      },
    ],
  },
  {
    category: "Quests & Rewards",
    questions: [
      {
        id: "quest-types",
        question: "What types of quests are available?",
        answer:
          "QuestHub offers various quest types including riddles, quizzes, creative challenges, and learning tasks. Quests are categorized by difficulty levels (1-5) and different themes. New quest types are regularly added to keep the experience fresh and engaging.",
      },
      {
        id: "reward-claiming",
        question: "How do I claim rewards after completing a quest?",
        answer:
          "Once you successfully complete a quest, rewards are automatically processed. SOL rewards are sent directly to your connected wallet, while badge NFTs are minted to your wallet. You'll receive a notification when rewards are successfully delivered.",
      },
      {
        id: "quest-difficulty",
        question: "How are quest difficulty levels determined?",
        answer:
          "Quest difficulty is rated from Level 1 (easiest) to Level 5 (hardest). The difficulty is based on complexity, time required to complete, and knowledge needed. Higher difficulty quests offer greater rewards but may require more skills or experience.",
      },
    ],
  },
  {
    category: "Badges & NFTs",
    questions: [
      {
        id: "what-are-badges",
        question: "What are QuestHub badges?",
        answer:
          "Badges are NFTs (Non-Fungible Tokens) on the Solana blockchain that represent your achievements on QuestHub. Each badge has different rarity levels and unique designs. They serve as proof of your accomplishments and can be displayed on your profile or transferred like any other NFT.",
      },
      {
        id: "badge-rarity",
        question: "How does badge rarity work?",
        answer:
          "Badges come in different rarity levels: Common, Uncommon, Rare, Epic, and Legendary. Rarity is determined by the difficulty of obtaining the badge, with more challenging achievements resulting in rarer badges. Rarer badges often have more unique designs and special attributes.",
      },
      {
        id: "view-badges",
        question: "Where can I view my earned badges?",
        answer:
          "You can view all your earned badges in the Badges section of your profile. Each badge displays its rarity, when it was earned, and other attributes. You can also see your badges as NFTs in your connected wallet or any Solana NFT marketplace.",
      },
    ],
  },
  {
    category: "Account & Profile",
    questions: [
      {
        id: "create-profile",
        question: "How do I create a profile on QuestHub?",
        answer:
          "Your profile is automatically created when you connect your wallet for the first time. Your wallet address serves as your unique identifier. You can customize your profile by adding a username and profile picture in the Profile section. Your achievements, badges, and quest history will be displayed on your profile page.",
      },
      {
        id: "delete-account",
        question: "Can I delete my QuestHub account?",
        answer:
          "Since QuestHub uses your blockchain wallet as your identity, there isn't a traditional account to delete. You can simply disconnect your wallet and stop using the platform. However, any badges you've earned as NFTs will remain on the blockchain, and your public quest history may still be visible.",
      },
      {
        id: "multiple-wallets",
        question: "Can I use multiple wallets with QuestHub?",
        answer:
          "Yes, you can connect different wallets to QuestHub, but each wallet will have its own separate profile, quest progress, and badge collection. We recommend sticking with one wallet to keep all your achievements and rewards in one place.",
      },
    ],
  },
  {
    category: "Technical & Support",
    questions: [
      {
        id: "transaction-fees",
        question: "Are there any fees for using QuestHub?",
        answer:
          "QuestHub itself doesn't charge fees for completing quests. However, claiming rewards and minting badge NFTs require Solana blockchain transactions, which incur small network fees (typically less than $0.01). These fees go to the Solana network, not to QuestHub.",
      },
      {
        id: "support-help",
        question: "How can I get help if I encounter issues?",
        answer:
          "If you need assistance, you can reach out through our Discord community, submit a support ticket through the Help section, or check our documentation for common issues. Our community moderators and support team are available to help resolve any problems you encounter.",
      },
      {
        id: "smart-contracts",
        question: "Are QuestHub's smart contracts audited?",
        answer:
          "Yes, all QuestHub smart contracts undergo rigorous security audits by reputable blockchain security firms before deployment. Audit reports are publicly available in our documentation. We prioritize security to ensure user funds and NFTs remain safe.",
      },
    ],
  },
]

export default function FAQ() {
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("Getting Started")
  const [expandedQuestions, setExpandedQuestions] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Toggle question expansion
  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      setSearchResults([])
      return
    }

    const results = []
    faqData.forEach((category) => {
      category.questions.forEach((question) => {
        if (
          question.question.toLowerCase().includes(query.toLowerCase()) ||
          question.answer.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            ...question,
            category: category.category,
          })
        }
      })
    })

    setSearchResults(results)
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold">❓ Frequently Asked Questions</h1>
            <p className="text-sm text-gray-400">Find answers to common questions about QuestHub</p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full md:w-64 bg-[#151524] border border-[#252540] rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-[#00a3ff]"
              value={searchQuery}
              onChange={handleSearch}
            />
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {searchQuery ? (
          // Search results
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">
              Search Results: <span className="text-[#00a3ff]">{searchResults.length}</span> found
            </h2>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <motion.div
                    key={result.id}
                    className="card overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`p-4 cursor-pointer hover:bg-[#1e1e32] transition-colors ${
                        expandedQuestions[result.id] ? "border-b border-[#252540]" : ""
                      }`}
                      onClick={() => toggleQuestion(result.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-[#00a3ff] mb-1 block">{result.category}</span>
                          <h3 className="font-medium">{result.question}</h3>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transform transition-transform ${
                            expandedQuestions[result.id] ? "rotate-180" : ""
                          }`}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedQuestions[result.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-[#151524] text-gray-300">{result.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-[#252540] rounded-full flex items-center justify-center mx-auto mb-4">
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
                    className="text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-gray-400 mb-4">
                  We couldn't find any questions matching "{searchQuery}". Try a different search term or browse the
                  categories below.
                </p>
                <button
                  className="text-[#00a3ff] hover:underline"
                  onClick={() => {
                    setSearchQuery("")
                    setSearchResults([])
                  }}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        ) : (
          // Regular FAQ view
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-4 sticky top-4">
                <h2 className="font-semibold mb-4">Categories</h2>
                <nav>
                  <ul className="space-y-2">
                    {faqData.map((category) => (
                      <li key={category.category}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            activeCategory === category.category
                              ? "bg-[#00a3ff] text-white"
                              : "hover:bg-[#1e1e32] text-gray-300"
                          }`}
                          onClick={() => setActiveCategory(category.category)}
                        >
                          {category.category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Questions and answers */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold">{activeCategory}</h2>

                <div className="space-y-4">
                  {faqData
                    .find((category) => category.category === activeCategory)
                    .questions.map((question) => (
                      <motion.div
                        key={question.id}
                        className="card overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`p-4 cursor-pointer hover:bg-[#1e1e32] transition-colors ${
                            expandedQuestions[question.id] ? "border-b border-[#252540]" : ""
                          }`}
                          onClick={() => toggleQuestion(question.id)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{question.question}</h3>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`transform transition-transform ${
                                expandedQuestions[question.id] ? "rotate-180" : ""
                              }`}
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedQuestions[question.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-[#151524] text-gray-300">{question.answer}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Contact section */}
        <div className="mt-12 bg-gradient-to-r from-[#151524] to-[#1e1e32] rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Still have questions?</h2>
              <p className="text-gray-300">
                If you couldn't find the answer to your question, feel free to reach out to our support team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/community"
                className="bg-[#252540] hover:bg-[#303050] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Join Community</span>
              </Link>
              <button className="bg-[#00a3ff] hover:bg-[#0090e0] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
