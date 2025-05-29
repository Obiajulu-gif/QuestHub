"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Layout } from "@/components/Layout"
import Link from "next/link"

// FAQ categories and questions
const faqData = [
  {
    category: "Getting Started",
    icon: "/icons/rocket.svg",
    color: "#0DF5E3",
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
    icon: "/icons/trophy.svg",
    color: "#8A3FFC",
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
    icon: "/icons/badge.svg",
    color: "#FF4ECD",
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
    icon: "/icons/user.svg",
    color: "#FFB400",
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
    icon: "/icons/support.svg",
    color: "#FF3D6B",
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
  const [hoverIndex, setHoverIndex] = useState(null)

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
            categoryColor: category.color,
          })
        }
      })
    })

    setSearchResults(results)
  }
  
  // Find the current category object
  const currentCategory = faqData.find(cat => cat.category === activeCategory) || faqData[0]

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-12 h-12 border-4 border-[#0DF5E3] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
              <span className="mr-2">❓</span> 
              <span>Frequently Asked</span>
              <span className="ml-2 glow-text">Questions</span>
            </h1>
            <p className="text-[#B3C6FF]">Find answers to common questions about QuestHub</p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full md:w-64 bg-[#0F1642] border border-[#1B2A6E] rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-[#0DF5E3] text-white"
              value={searchQuery}
              onChange={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#687FCA]"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {searchQuery ? (
          // Search results
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold flex items-center">
              Search Results: <span className="ml-2 px-3 py-1 rounded-full bg-[#0F1642] text-[#0DF5E3] text-sm">{searchResults.length} found</span>
            </h2>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    className="card overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <div
                      className={`p-4 cursor-pointer hover:bg-[#17245F] transition-colors ${
                        expandedQuestions[result.id] ? "border-b border-[#1B2A6E]" : ""
                      }`}
                      onClick={() => toggleQuestion(result.id)}
                      style={{
                        borderLeft: hoverIndex === index ? `4px solid ${result.categoryColor}` : '4px solid transparent',
                        transition: 'border-left-color 0.3s ease'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${result.categoryColor}20`, color: result.categoryColor }}>{result.category}</span>
                          <h3 className="text-base font-medium mt-2">{result.question}</h3>
                        </div>
                        <div
                          className={`ml-4 transition-transform duration-300 ${
                            expandedQuestions[result.id] ? "rotate-180" : ""
                          }`}
                        >
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
                            className="text-[#687FCA]"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                        </div>
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
                          <div className="p-4 bg-[#0A0F33] text-[#B3C6FF]">{result.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-[#687FCA] mb-4">
                  Try different keywords or check out the categories below.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="btn-outline text-sm py-2 px-4"
                >
                  View All Questions
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          // FAQ categories and questions
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories */}
            <div className="lg:col-span-1">
              <div className="card p-1 sticky top-20">
                <div className="space-y-1">
                    {faqData.map((category) => (
                        <button
                      key={category.category}
                      onClick={() => setActiveCategory(category.category)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                            activeCategory === category.category
                          ? "bg-[#17245F] text-white"
                          : "hover:bg-[#17245F]/50 text-[#B3C6FF]"
                      }`}
                      style={{
                        borderLeft: activeCategory === category.category ? `4px solid ${category.color}` : '4px solid transparent'
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${category.color}20` }}>
                        <span style={{ color: category.color }}>
                          {category.category === "Getting Started" ? "🚀" : 
                           category.category === "Quests & Rewards" ? "🏆" : 
                           category.category === "Badges & NFTs" ? "🏅" : 
                           category.category === "Account & Profile" ? "👤" : 
                           category.category === "Technical & Support" ? "🛠️" : "❓"}
                        </span>
                      </div>
                      <span className="font-medium">{category.category}</span>
                        </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${currentCategory.color}20`, color: currentCategory.color }}>
                    {currentCategory.category === "Getting Started" ? "🚀" : 
                     currentCategory.category === "Quests & Rewards" ? "🏆" : 
                     currentCategory.category === "Badges & NFTs" ? "🏅" : 
                     currentCategory.category === "Account & Profile" ? "👤" : 
                     currentCategory.category === "Technical & Support" ? "🛠️" : "❓"}
                  </div>
                  <h2 className="text-xl font-bold">{activeCategory}</h2>
                </div>

                <div className="space-y-4">
                  {faqData
                    .find((cat) => cat.category === activeCategory)
                    ?.questions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        className="card overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        style={{
                          borderLeft: hoverIndex === index ? `4px solid ${currentCategory.color}` : '4px solid transparent',
                          transition: 'border-left-color 0.3s ease'
                        }}
                      >
                        <div
                          className={`p-4 cursor-pointer hover:bg-[#17245F] transition-colors ${
                            expandedQuestions[question.id] ? "border-b border-[#1B2A6E]" : ""
                          }`}
                          onClick={() => toggleQuestion(question.id)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium">{question.question}</h3>
                            <div
                              className={`ml-4 transition-transform duration-300 ${
                                expandedQuestions[question.id] ? "rotate-180" : ""
                              }`}
                            >
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
                                className="text-[#687FCA]"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            </div>
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
                              <div className="p-4 bg-[#0A0F33] text-[#B3C6FF]">{question.answer}</div>
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

        {/* Contact Us Section */}
        <div className="mt-12 card p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
            <p className="text-[#B3C6FF] mb-6 max-w-xl mx-auto">
              Can't find the answer you're looking for? Get in touch with our support team, and we'll be happy to help.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 py-2.5 px-6">
              Contact Support
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M19 12l-7-7m7 7l-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
