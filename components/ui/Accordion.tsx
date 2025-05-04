"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  titleClassName?: string
  contentClassName?: string
}

export const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
  className,
  titleClassName,
  contentClassName,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("border-b border-[#252540]", className)}>
      <button
        className={cn(
          "flex justify-between items-center w-full py-4 text-left font-medium transition-colors",
          titleClassName,
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn("h-5 w-5 transition-transform", isOpen ? "transform rotate-180" : "")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={cn("pb-4", contentClassName)}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

export const Accordion = ({ children, className }: AccordionProps) => {
  return <div className={cn("divide-y divide-[#252540]", className)}>{children}</div>
}
