import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  fallback?: string
  status?: "online" | "offline" | "away" | "busy" | null
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = "", size = "md", fallback, status, ...props }, ref) => {
    const sizeClasses = {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
      xl: "w-16 h-16 text-xl",
    }

    const statusClasses = {
      online: "bg-green-500",
      offline: "bg-gray-400",
      away: "bg-yellow-500",
      busy: "bg-red-500",
    }

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={cn(
            "rounded-full bg-[#252540] flex items-center justify-center overflow-hidden flex-shrink-0",
            sizeClasses[size],
            className,
          )}
          {...props}
        >
          {src ? (
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={size === "xl" ? 64 : size === "lg" ? 48 : size === "md" ? 40 : size === "sm" ? 32 : 24}
              height={size === "xl" ? 64 : size === "lg" ? 48 : size === "md" ? 40 : size === "sm" ? 32 : 24}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="font-medium text-gray-200">{fallback || alt.charAt(0).toUpperCase()}</span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full border-2 border-[#151524]",
              statusClasses[status],
              {
                "w-2 h-2": size === "xs" || size === "sm",
                "w-3 h-3": size === "md" || size === "lg",
                "w-4 h-4": size === "xl",
              },
            )}
          />
        )}
      </div>
    )
  },
)

Avatar.displayName = "Avatar"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, size = "md", ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const maxAvatars = max || childrenArray.length
    const displayAvatars = childrenArray.slice(0, maxAvatars)
    const overflowCount = childrenArray.length - maxAvatars

    return (
      <div ref={ref} className={cn("flex -space-x-2", className)} {...props}>
        {displayAvatars.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              key: index,
              size,
              className: cn("border-2 border-[#151524]", (child as React.ReactElement<any>).props.className),
            })
          }
          return child
        })}
        {overflowCount > 0 && (
          <div
            className={cn(
              "rounded-full bg-[#252540] flex items-center justify-center text-gray-400 border-2 border-[#151524]",
              {
                "w-6 h-6 text-xs": size === "xs",
                "w-8 h-8 text-xs": size === "sm",
                "w-10 h-10 text-sm": size === "md",
                "w-12 h-12 text-base": size === "lg",
                "w-16 h-16 text-lg": size === "xl",
              },
            )}
          >
            +{overflowCount}
          </div>
        )}
      </div>
    )
  },
)

AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup }
