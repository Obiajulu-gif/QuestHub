import type React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "avatar" | "card" | "text"
  width?: string | number
  height?: string | number
}

export function Skeleton({ className, variant = "default", width, height, ...props }: SkeletonProps) {
  const baseStyles = "animate-pulse bg-[#252540]/50 rounded-md"

  const variantStyles = {
    default: "",
    avatar: "rounded-full",
    card: "rounded-xl",
    text: "h-4 rounded-sm",
  }

  const styles = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
  }

  return <div className={cn(baseStyles, variantStyles[variant], className)} style={styles} {...props} />
}
