import React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(({ className, spacing = "lg", ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        {
          "py-0": spacing === "none",
          "py-4 sm:py-6": spacing === "sm",
          "py-8 sm:py-12": spacing === "md",
          "py-12 sm:py-16 md:py-20": spacing === "lg",
          "py-16 sm:py-24 md:py-32": spacing === "xl",
        },
        className,
      )}
      {...props}
    />
  )
})

Section.displayName = "Section"

export { Section }
