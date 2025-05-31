"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@solana/wallet-adapter-react"
import { Layout } from "@/components/Layout"

// Constants
const TABS = {
  LINK: "link",
  HISTORY: "history",
  TIERS: "tiers"
}

const SOCIAL_PLATFORMS = {
  TWITTER: "twitter",
  TELEGRAM: "telegram", 
  FACEBOOK: "facebook"
}

// Mock data - moved outside component to prevent re-creation
const REFERRAL_HISTORY = [
  {
    id: 1,
    username: "Alice",
    date: "2025-05-20T11:00:00Z",
    status: "completed",
    reward: "0.01 BNB",
  },
  {
    id: 2,
    username: "Bob",
    date: "2025-05-18T09:30:00Z",
    status: "pending",
    reward: "0.01 BNB",
  },
  {
    id: 3,
    username: "Charlie",
    date: "2025-05-15T14:20:00Z",
    status: "completed",
    reward: "0.015 BNB",
  },
  {
    id: 4,
    username: "Dana",
    date: "2025-05-12T16:45:00Z",
    status: "completed",
    reward: "0.02 BNB",
  },
  {
    id: 5,
    username: "Eve",
    date: "2025-05-10T08:15:00Z",
    status: "completed",
    reward: "0.02 BNB",
  },
]

const REFERRAL_TIERS = [
  {
    level: "Bronze",
    referrals: "1-5",
    reward: "0.01 BNB per referral",
    bonusReward: "None",
    color: "from-[#CD7F32] to-[#A05A2C]",
    iconColor: "#CD7F32",
    bgColor: "rgba(205, 127, 50, 0.2)",
    description: "Start your journey and earn for every successful referral.",
    icon: '✨'
  },
  {
    level: "Silver",
    referrals: "6-15",
    reward: "0.015 BNB per referral",
    bonusReward: "0.1 BNB bonus at 10 referrals",
    color: "from-[#C0C0C0] to-[#A0A0A0]",
    iconColor: "#C0C0C0",
    bgColor: "rgba(192, 192, 192, 0.2)",
    description: "Increase your earnings and unlock a bonus for hitting your first milestone.",
    icon: '💎'
  },
  {
    level: "Gold",
    referrals: "16-30",
    reward: "0.02 BNB per referral",
    bonusReward: "0.2 BNB bonus at 20 referrals",
    color: "from-[#FFD700] to-[#FFA500]",
    iconColor: "#FFD700",
    bgColor: "rgba(255, 215, 0, 0.2)",
    description: "Reach for gold with higher per-referral rewards and a significant bonus.",
    icon: '🏆'
  },
  {
    level: "Platinum",
    referrals: "31+",
    reward: "0.025 BNB per referral",
    bonusReward: "0.5 BNB bonus at 50 referrals",
    color: "from-[#E5E4E2] to-[#8A9A9A]",
    iconColor: "#E5E4E2",
    bgColor: "rgba(229, 228, 226, 0.2)",
    description: "Achieve elite status for maximum rewards and a grand bonus for your dedication.",
    icon: '👑'
  },
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const cardHover = {
  whileHover: { y: -2 },
  transition: { duration: 0.2 }
}

// Utility functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const parseRewardValue = (reward) => parseFloat(reward.replace(" BNB", ""))

// Custom hooks
const useReferralStats = (referralHistory) => {
  return useMemo(() => {
    const totalReferrals = referralHistory.length
    const totalRewards = referralHistory
      .reduce((sum, referral) => sum + parseRewardValue(referral.reward), 0)
      .toFixed(2)
    
    return { totalReferrals, totalRewards }
  }, [referralHistory])
}

const useCurrentTier = (totalReferrals) => {
  return useMemo(() => {
    const currentTier = REFERRAL_TIERS.find(tier => {
      const [min, max] = tier.referrals.split('-').map(s => parseInt(s))
      if (tier.referrals.includes('+')) {
        return totalReferrals >= min
      }
      return totalReferrals >= min && totalReferrals <= max
    }) || REFERRAL_TIERS[0]

    const nextTier = REFERRAL_TIERS[REFERRAL_TIERS.indexOf(currentTier) + 1]
    const referralsNeededForNextTier = nextTier 
      ? parseInt(nextTier.referrals.split('-')[0]) - totalReferrals 
      : 0

    return { currentTier, nextTier, referralsNeededForNextTier }
  }, [totalReferrals])
}

// Sub-components for better organization
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-[80vh]">
    <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
  </div>
)

const StatCard = ({ icon, title, value, delay = 0, bgColor = "#00a3ff" }) => (
  <motion.div
    className="p-5 rounded-xl bg-[#151524] border border-[#252540] shadow-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    {...cardHover}
  >
    <div className="flex items-center gap-4">
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${bgColor}20` }}
      >
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  </motion.div>
)

const TierProgressCard = ({ currentTier, nextTier, referralsNeededForNextTier }) => (
  <motion.div
    className="p-5 rounded-xl bg-[#151524] border border-[#252540] shadow-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    {...cardHover}
  >
    <div className="flex items-center gap-4">
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ 
          backgroundColor: currentTier.bgColor, 
          border: `1px solid ${currentTier.iconColor}` 
        }}
      >
        <span className="text-xl" style={{ color: currentTier.iconColor }}>
          {currentTier.icon}
        </span>
      </div>
      <div>
        <div className="text-sm text-gray-400">Your Current Tier</div>
        <div className="text-2xl font-bold text-white">{currentTier.level}</div>
        {nextTier ? (
          <p className="text-xs text-gray-500 mt-1">
            {referralsNeededForNextTier} more referrals to reach{' '}
            <span className="text-[#00a3ff] font-semibold">{nextTier.level}</span> tier!
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">You've reached the highest tier!</p>
        )}
      </div>
    </div>
  </motion.div>
)

const TabButton = ({ isActive, onClick, children }) => (
  <button
    className={`px-4 py-2 rounded-t-lg text-sm whitespace-nowrap transition-all ${
      isActive 
        ? "bg-[#151524] text-[#00a3ff] border border-b-0 border-gray-700" 
        : "text-gray-400 hover:text-white"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

const SocialShareButton = ({ platform, onShare, icon, label, bgColor, hoverColor }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => onShare(platform)}
    className={`flex items-center px-4 py-2 ${bgColor} text-white rounded-md font-medium shadow-sm ${hoverColor} transition-all duration-200`}
  >
    <i className={`${icon} mr-2`}></i> {label}
  </motion.button>
)

const ReferralLinkTab = ({ referralLink, onCopy, copied, onShare }) => (
  <motion.div
    key="link-tab"
    {...fadeInUp}
    transition={{ duration: 0.3 }}
    className="p-6 rounded-xl bg-[#151524] border border-[#252540] shadow-md"
  >
    <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
    <p className="text-sm text-gray-400 mb-4">
      Share this link with your friends to invite them to QuestHub!
    </p>
    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
      <div className="relative flex-grow w-full">
        <input
          type="text"
          readOnly
          value={referralLink}
          className="w-full p-3 rounded-lg bg-[#252540] border border-[#353550] text-white focus:outline-none focus:ring-1 focus:ring-[#00a3ff]"
        />
        <button
          onClick={onCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-[#00a3ff] text-white text-xs font-semibold hover:bg-[#0080cc] transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
    <div className="flex flex-wrap gap-3 justify-center">
      <SocialShareButton
        platform={SOCIAL_PLATFORMS.TWITTER}
        onShare={onShare}
        icon="fab fa-twitter"
        label="Twitter"
        bgColor="bg-[#1DA1F2]"
        hoverColor="hover:bg-[#1A91DA]"
      />
      <SocialShareButton
        platform={SOCIAL_PLATFORMS.TELEGRAM}
        onShare={onShare}
        icon="fab fa-telegram-plane"
        label="Telegram"
        bgColor="bg-[#0088CC]"
        hoverColor="hover:bg-[#007AB8]"
      />
      <SocialShareButton
        platform={SOCIAL_PLATFORMS.FACEBOOK}
        onShare={onShare}
        icon="fab fa-facebook-f"
        label="Facebook"
        bgColor="bg-[#1877F2]"
        hoverColor="hover:bg-[#156DCF]"
      />
    </div>
  </motion.div>
)

const ReferralHistoryTab = ({ referralHistory, onSwitchToLink }) => (
  <motion.div
    key="history-tab"
    {...fadeInUp}
    transition={{ duration: 0.3 }}
    className="p-6 rounded-xl bg-[#151524] border border-[#252540] shadow-md"
  >
    <h2 className="text-xl font-bold mb-4">Referral Activity Log</h2>
    {referralHistory.length > 0 ? (
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full bg-[#151524] rounded-lg">
          <thead className="sticky top-0 bg-[#151524] z-20">
            <tr className="text-left text-gray-400 border-b border-gray-700 text-sm">
              <th className="py-2 px-3 font-semibold">ID</th>
              <th className="py-2 px-3 font-semibold">Referral Username</th>
              <th className="py-2 px-3 font-semibold">Date Joined</th>
              <th className="py-2 px-3 font-semibold">Status</th>
              <th className="py-2 px-3 font-semibold">Reward Earned</th>
            </tr>
          </thead>
          <tbody>
            {referralHistory.map((referral) => (
              <motion.tr
                key={referral.id}
                className="border-b border-[#252540] last:border-b-0 hover:bg-[#252540] transition-colors duration-200"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: referral.id * 0.05 }}
              >
                <td className="py-3 px-3 text-gray-300">{referral.id}</td>
                <td className="py-3 px-3 font-medium text-white">{referral.username}</td>
                <td className="py-3 px-3 text-gray-400 text-xs">{formatDate(referral.date)}</td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      referral.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {referral.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-white">{referral.reward}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-400 text-base mb-3">
          No referral history yet. Start inviting friends to see your progress here!
        </p>
        <button
          onClick={onSwitchToLink}
          className="bg-[#00a3ff] hover:bg-[#0080cc] text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200"
        >
          Get Your Referral Link
        </button>
      </div>
    )}
  </motion.div>
)

const TierCard = ({ tier, isCurrentTier, totalReferrals, index }) => (
  <motion.div
    className={`relative p-5 rounded-lg overflow-hidden shadow-sm border ${
      isCurrentTier ? 'border-[#00a3ff]' : 'border-[#252540]'
    } bg-gradient-to-br ${tier.color} transform transition-all duration-300`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    whileHover={{ 
      scale: 1.02, 
      boxShadow: `0 0 10px ${tier.iconColor}80` 
    }}
  >
    <div className="absolute inset-0 opacity-20" style={{ backgroundColor: tier.bgColor }}></div>
    {isCurrentTier && (
      <motion.span
        className="absolute top-2 right-2 bg-[#00a3ff] text-white text-xs font-semibold px-2 py-0.5 rounded-full uppercase"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Your Tier
      </motion.span>
    )}
    <div className="relative z-10 text-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold flex items-center">
          <span className="mr-2 text-2xl" style={{ color: tier.iconColor }}>
            {tier.icon}
          </span>
          {tier.level}
        </h3>
        {isCurrentTier && (
          <span className="text-xs font-semibold text-gray-300">
            {totalReferrals} / {tier.referrals.includes('+') 
              ? `${parseInt(tier.referrals.split('+')[0])}+` 
              : tier.referrals.split('-')[1]
            }
          </span>
        )}
      </div>
      <p className="text-sm text-gray-400 mb-2">{tier.description}</p>
      <ul className="text-sm text-gray-300 space-y-1">
        <li><span className="font-semibold">Referrals:</span> {tier.referrals}</li>
        <li><span className="font-semibold">Reward:</span> {tier.reward}</li>
        <li><span className="font-semibold">Bonus:</span> {tier.bonusReward}</li>
      </ul>
    </div>
  </motion.div>
)

const ReferralTiersTab = ({ currentTier, totalReferrals }) => (
  <motion.div
    key="tiers-tab"
    {...fadeInUp}
    transition={{ duration: 0.3 }}
    className="p-6 rounded-xl bg-[#151524] border border-[#252540] shadow-md"
  >
    <h2 className="text-xl font-bold mb-4 text-center">Referral Tier Structure</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {REFERRAL_TIERS.map((tier, index) => (
        <TierCard
          key={tier.level}
          tier={tier}
          isCurrentTier={tier.level === currentTier.level}
          totalReferrals={totalReferrals}
          index={index}
        />
      ))}
    </div>
  </motion.div>
)

// Main component
export default function Referrals() {
  const router = useRouter()
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(true)
  const [referralCode, setReferralCode] = useState("")
  const [referralLink, setReferralLink] = useState("")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.LINK)

  // Custom hooks
  const { totalReferrals, totalRewards } = useReferralStats(REFERRAL_HISTORY)
  const { currentTier, nextTier, referralsNeededForNextTier } = useCurrentTier(totalReferrals)

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    const simulatedCode = "Q3sth8b5"
    setReferralCode(simulatedCode)
    setReferralLink(`https://questhub.io/join?ref=${simulatedCode}`)
    return () => clearTimeout(timer)
  }, [])

  // Event handlers
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [referralLink])

  const shareReferral = useCallback((platform) => {
    const shareUrls = {
      [SOCIAL_PLATFORMS.TWITTER]: `https://twitter.com/intent/tweet?text=Join%20me%20on%20QuestHub%20and%20earn%20rewards%20for%20completing%20quests!%20Use%20my%20referral%20link:%20${encodeURIComponent(referralLink)}`,
      [SOCIAL_PLATFORMS.TELEGRAM]: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join%20me%20on%20QuestHub%20and%20earn%20rewards%20for%20completing%20quests!`,
      [SOCIAL_PLATFORMS.FACEBOOK]: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
    }

    const shareUrl = shareUrls[platform]
    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }, [referralLink])

  const handleTabChange = useCallback((tab) => setActiveTab(tab), [])
  const handleSwitchToLink = useCallback(() => setActiveTab(TABS.LINK), [])

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-6 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold">🔗 Referral Program</h1>
            <p className="text-sm text-gray-400">
              Invite friends and earn rewards when they join QuestHub
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
            title="Total Referrals"
            value={totalReferrals}
            delay={0}
          />

          <StatCard
            icon={
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
                className="text-[#FFD700]"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            }
            title="Total Rewards"
            value={`${totalRewards} BNB`}
            delay={0.1}
            bgColor="#FFD700"
          />

          <TierProgressCard
            currentTier={currentTier}
            nextTier={nextTier}
            referralsNeededForNextTier={referralsNeededForNextTier}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-start border-b border-gray-700 mb-6">
          <TabButton
            isActive={activeTab === TABS.LINK}
            onClick={() => handleTabChange(TABS.LINK)}
          >
            Referral Link
          </TabButton>
          <div className="ml-2">
            <TabButton
              isActive={activeTab === TABS.HISTORY}
              onClick={() => handleTabChange(TABS.HISTORY)}
            >
              Referral History
            </TabButton>
          </div>
          <div className="ml-2">
            <TabButton
              isActive={activeTab === TABS.TIERS}
              onClick={() => handleTabChange(TABS.TIERS)}
            >
              Referral Tiers
            </TabButton>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === TABS.LINK && (
            <ReferralLinkTab
              referralLink={referralLink}
              onCopy={copyToClipboard}
              copied={copied}
              onShare={shareReferral}
            />
          )}

          {activeTab === TABS.HISTORY && (
            <ReferralHistoryTab
              referralHistory={REFERRAL_HISTORY}
              onSwitchToLink={handleSwitchToLink}
            />
          )}

          {activeTab === TABS.TIERS && (
            <ReferralTiersTab
              currentTier={currentTier}
              totalReferrals={totalReferrals}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}