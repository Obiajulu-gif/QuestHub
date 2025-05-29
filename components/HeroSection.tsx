"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

// Hero slider data
const heroSlides = [
  {
    id: 1,
    title: "BATTLE OF THE BRAINS",
    subtitle: "Compete with the best minds and climb the ranks",
    description: "Test your knowledge, solve puzzles, and compete for your place on the leaderboard.",
    image: "/hero-battle.png",
    ctaText: "JOIN CONTEST",
    ctaLink: "/quests",
    gradient: "from-[#0DF5E3] to-[#0644A9]"
  },
  {
    id: 2,
    title: "COLLECT NFT BADGES",
    subtitle: "Exclusive digital achievements for your collection",
    description: "Complete quests to earn unique NFT badges that showcase your accomplishments.",
    image: "/hero-badges.png",
    ctaText: "EXPLORE BADGES",
    ctaLink: "/badges",
    gradient: "from-[#8A3FFC] to-[#FF4ECD]"
  },
  {
    id: 3,
    title: "EARN CRYPTO REWARDS",
    subtitle: "Daily challenges with SOL rewards",
    description: "Participate in daily quests and competitions to earn valuable SOL rewards.",
    image: "/hero-rewards.png",
    ctaText: "START EARNING",
    ctaLink: "/quests",
    gradient: "from-[#FFD700] to-[#FF6B00]"
  },
]

export default function HeroSection() {
  const { user } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  useEffect(() => {
    // Auto-rotate slides
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    
    return () => clearInterval(slideInterval)
  }, [])

  // Handle slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block px-4 py-1 rounded-full bg-[#0F1642] border border-[#1B2A6E] text-sm text-[#B3C6FF] mb-4">
                  <span className="mr-2">⚡</span> {currentSlide === 0 ? "Popular Quest Category" : currentSlide === 1 ? "Exclusive Rewards" : "Limited Time Offer"}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">
                  {heroSlides[currentSlide].title}
                </h1>
                
                <h2 className="text-xl md:text-2xl font-medium mb-4 text-[#B3C6FF]">
                  {heroSlides[currentSlide].subtitle}
                </h2>
                
                <p className="text-[#687FCA] mb-8 md:text-lg max-w-md">
                  {heroSlides[currentSlide].description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={heroSlides[currentSlide].ctaLink}
                    className={`btn-primary py-3 px-8 text-base font-medium`}
                  >
                    {heroSlides[currentSlide].ctaText}
                  </Link>
                  
                  <Link
                    href="/learn-more"
                    className="btn-outline py-3 px-8 text-base font-medium"
                  >
                    LEARN MORE
                  </Link>
                </div>
                
                {/* Slide indicators */}
                <div className="flex gap-3 mt-10">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-12 h-1.5 rounded-full transition-all ${
                        currentSlide === index 
                          ? `bg-[#0DF5E3] shadow-[0_0_10px_rgba(13,245,227,0.5)]` 
                          : `bg-[#1B2A6E]`
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${heroSlides[currentSlide].gradient} opacity-20 blur-2xl -z-10`}></div>
                <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] animate-float">
                  <Image
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Bottom glowing line */}
      <div className="cyber-line"></div>
    </section>
  )
}
