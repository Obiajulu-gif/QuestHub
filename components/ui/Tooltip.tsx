"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  position?: "top" | "right" | "bottom" | "left"
  delay?: number
  className?: string
}

export const Tooltip = ({ content, children, position = "top", delay = 300, className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      updatePosition()
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    let x = 0
    let y = 0

    switch (position) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.top - tooltipRect.height - 8
        break
      case "right":
        x = triggerRect.right + 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.bottom + 8
        break
      case "left":
        x = triggerRect.left - tooltipRect.width - 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
    }

    // Adjust if tooltip goes out of viewport
    const padding = 10
    if (x < padding) x = padding
    if (y < padding) y = padding
    if (x + tooltipRect.width > window.innerWidth - padding) {
      x = window.innerWidth - tooltipRect.width - padding
    }
    if (y + tooltipRect.height > window.innerHeight - padding) {
      y = window.innerHeight - tooltipRect.height - padding
    }

    setCoords({ x, y })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        updatePosition()
      }
    }

    window.addEventListener("scroll", handleScroll, true)
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("scroll", handleScroll, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [isVisible])

  // Clone the child element to add event handlers
  const childElement = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
  })

  return (
    <>
      {childElement}
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              "fixed z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-md shadow-md pointer-events-none",
              className,
            )}
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
            }}
            role="tooltip"
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  )
}
