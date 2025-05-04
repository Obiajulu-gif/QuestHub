import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#00a3ff] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#252540] text-white",
        primary: "bg-[#00a3ff] text-white",
        secondary: "bg-[#7928ca] text-white",
        accent: "bg-[#ff3d71] text-white",
        success: "bg-[#00d68f] text-white",
        warning: "bg-[#ffc107] text-black",
        outline: "bg-transparent border border-[#252540] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, ...props }, ref) => {
  return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
})

Badge.displayName = "Badge"

export { Badge, badgeVariants }
