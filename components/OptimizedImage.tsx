"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  showLoadingIndicator?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  sizes,
  quality = 80,
  priority = false,
  showLoadingIndicator = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative">
      {isLoading && showLoadingIndicator && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || ""}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        className={`${className} ${isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"} transition-all duration-300`}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
}
