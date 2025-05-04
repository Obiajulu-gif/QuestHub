import React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ className, size = "xl", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto px-4 sm:px-6",
        {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "max-w-none": size === "full",
        },
        className,
      )}
      {...props}
    />
  )
})

Container.displayName = "Container"

export { Container }
