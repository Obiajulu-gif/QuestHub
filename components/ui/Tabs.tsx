"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  defaultTabId?: string
  onChange?: (tabId: string) => void
  variant?: "default" | "pills" | "underline"
  className?: string
  tabsClassName?: string
  contentClassName?: string
}

export const Tabs = ({
  tabs,
  defaultTabId,
  onChange,
  variant = "default",
  className,
  tabsClassName,
  contentClassName,
}: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId)
    onChange?.(tabId)
  }

  const variantStyles = {
    default: {
      tabs: "border-b border-[#252540]",
      tab: (isActive: boolean) =>
        cn(
          "px-4 py-2 font-medium text-sm transition-colors",
          isActive ? "border-b-2 border-[#00a3ff] text-white" : "text-gray-400 hover:text-white hover:bg-[#252540]/50",
        ),
    },
    pills: {
      tabs: "p-1 bg-[#0a0a14] rounded-lg",
      tab: (isActive: boolean) =>
        cn(
          "px-4 py-2 font-medium text-sm rounded-md transition-colors",
          isActive ? "bg-[#252540] text-white" : "text-gray-400 hover:text-white hover:bg-[#252540]/50",
        ),
    },
    underline: {
      tabs: "",
      tab: (isActive: boolean) =>
        cn(
          "px-4 py-2 font-medium text-sm transition-colors border-b-2",
          isActive
            ? "border-[#00a3ff] text-white"
            : "border-transparent text-gray-400 hover:text-white hover:border-gray-700",
        ),
    },
  }

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("flex", variantStyles[variant].tabs, tabsClassName)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            className={cn(
              variantStyles[variant].tab(activeTabId === tab.id),
              tab.disabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={tab.disabled}
            aria-selected={activeTabId === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={cn("mt-4", contentClassName)}>{tabs.find((tab) => tab.id === activeTabId)?.content}</div>
    </div>
  )
}
