"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function QuestCard({ quest }) {
  const router = useRouter()
  const { title, image, locked, id, time, reward } = quest

  const handleClick = () => {
    if (!locked) {
      router.push(`/quest/${id}`)
    }
  }

  return (
    <motion.div
      className="card overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="bg-[#151524] rounded-xl overflow-hidden h-full flex flex-col hover:shadow-lg hover:shadow-[#1e1e32]/20 hover:translate-y-[-2px] transition-all duration-300">
        <div className="relative h-32 sm:h-40">
          <Image
            src={image || "/placeholder.svg"}
            width={300}
            height={200}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgJQKVrGgQAAAABJRU5ErkJggg=="
          />

          {locked && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
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
                className="text-white"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-base sm:text-lg mb-1 sm:mb-2 line-clamp-1">{title}</h3>

          <div className="flex items-center justify-between text-xs text-gray-400">
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
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{time}</span>
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
                className="text-[#ffc107]"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{reward}</span>
            </div>
          </div>
        </div>

        {!locked && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-[#00a3ff] rounded-full p-1">
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
                className="text-white"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
