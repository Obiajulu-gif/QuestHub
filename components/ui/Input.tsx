import React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{leftIcon}</div>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border bg-[#0a0a14] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a3ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-[#252540]": !error,
              "border-[#ff3d71] focus-visible:ring-[#ff3d71]": error,
              "pl-10": leftIcon,
              "pr-10": rightIcon,
            },
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{rightIcon}</div>
        )}
        {error && <p className="mt-1 text-xs text-[#ff3d71]">{error}</p>}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
