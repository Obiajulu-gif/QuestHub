"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroCard({
  title,
  subtitle,
  buttonText,
  buttonAction,
  imageSrc,
  bgColor = "from-[#0a2e44] to-[#0a1e2c]",
}) {
  return (
    <motion.div
      className={`card overflow-hidden bg-gradient-to-br ${bgColor}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-300 mb-4">{subtitle}</p>

          <button
            className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
            onClick={buttonAction}
          >
            {buttonText}
          </button>
        </div>

        <div className="flex-shrink-0">
          <Image src={imageSrc || "/placeholder.svg"} width={100} height={100} alt={title} className="object-contain" />
        </div>
      </div>
    </motion.div>
  )
}
