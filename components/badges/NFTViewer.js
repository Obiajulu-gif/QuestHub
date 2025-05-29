"use client"

import { useState, useEffect, useRef } from "react"
// Don't import Image since we're using the browser's built-in Image constructor

export default function NFTViewer({ badge }) {
  const canvasRef = useRef(null)
  const metadataRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 })
  const [showFullMetadata, setShowFullMetadata] = useState(false)

  // Handle responsive canvas size
  useEffect(() => {
    const handleResize = () => {
      // Adjust canvas size based on viewport width
      const maxWidth = Math.min(window.innerWidth - 40, 500) // Max 500px, with 40px padding
      setCanvasSize({
        width: maxWidth,
        height: maxWidth // Keep it square
      })
    }

    // Set initial size
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const image = new window.Image() // Use the browser's built-in Image constructor
    image.crossOrigin = "anonymous" // Prevent CORS issues

    // Set canvas dimensions from state
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    // Draw background
    ctx.fillStyle = "#151524"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw border
    ctx.strokeStyle = getRarityBorderColor(badge.rarity)
    ctx.lineWidth = 10
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10)

    // Draw badge image
    image.onload = () => {
      // Center the image, scaled proportionally to canvas size
      const imageSize = Math.min(canvas.width, canvas.height) * 0.6
      const x = (canvas.width - imageSize) / 2
      const y = (canvas.height - imageSize) / 3
      ctx.drawImage(image, x, y, imageSize, imageSize)

      // Calculate font sizes relative to canvas
      const titleFontSize = Math.max(Math.floor(canvas.width * 0.05), 16)
      const subtitleFontSize = Math.max(Math.floor(canvas.width * 0.035), 12)
      const smallFontSize = Math.max(Math.floor(canvas.width * 0.025), 10)

      // Draw badge name
      ctx.font = `bold ${titleFontSize}px Arial`
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText(badge.name, canvas.width / 2, canvas.height * 0.8)

      // Draw rarity
      ctx.font = `${subtitleFontSize}px Arial`
      ctx.fillStyle = getRarityTextColor(badge.rarity)
      ctx.fillText(badge.rarity, canvas.width / 2, canvas.height * 0.85)

      // Draw QuestHub logo
      ctx.font = `${smallFontSize}px Arial`
      ctx.fillStyle = "#00a3ff"
      ctx.fillText("QuestHub NFT", canvas.width / 2, canvas.height * 0.9)

      setLoading(false)
    }

    // Handle image error
    image.onerror = () => {
      const fontSize = Math.max(Math.floor(canvas.width * 0.04), 14)
      ctx.font = `bold ${fontSize}px Arial`
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("Image could not be loaded", canvas.width / 2, canvas.height / 2)
      setLoading(false)
    }

    // Set image source
    if (badge.image) {
      image.src = badge.image
    } else {
      image.src = `/blank-badge.png`
    }

    return () => {
      // Clean up
      image.onload = null
      image.onerror = null
    }
  }, [badge, canvasSize])

  // Helper function to get rarity border color
  const getRarityBorderColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "#9ca3af" // gray
      case "uncommon":
        return "#4ade80" // green
      case "rare":
        return "#60a5fa" // blue
      case "epic":
        return "#a78bfa" // purple
      case "legendary":
        return "#ffc107" // gold
      default:
        return "#9ca3af" // gray
    }
  }

  // Helper function to get rarity text color
  const getRarityTextColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case "common":
        return "#9ca3af" // gray
      case "uncommon":
        return "#4ade80" // green
      case "rare":
        return "#60a5fa" // blue
      case "epic":
        return "#a78bfa" // purple
      case "legendary":
        return "#ffc107" // gold
      default:
        return "#9ca3af" // gray
    }
  }

  // Generate the NFT metadata object
  const metadata = {
    name: badge.name,
    description: badge.description,
    image: badge.image || "badge_image_url",
    attributes: badge.attributes,
    symbol: "QHUB",
    seller_fee_basis_points: 0,
    external_url: "https://questhub.io/badges/" + badge.id,
    properties: {
      files: [
        {
          uri: badge.image || "badge_image_url",
          type: "image/png",
        },
      ],
      category: "image",
      creators: [
        {
          address: "QuestHub1111111111111111111111111111111",
          share: 100,
        },
      ],
    },
  };

  // Toggle full metadata view
  const toggleMetadataView = () => {
    setShowFullMetadata(!showFullMetadata);
    
    // Scroll to metadata section when expanding
    if (!showFullMetadata && metadataRef.current) {
      setTimeout(() => {
        metadataRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {loading && (
        <div className="flex items-center justify-center h-[200px] w-full">
          <div className="w-8 h-8 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="max-w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`rounded-lg shadow-lg mx-auto ${loading ? "hidden" : "block"}`}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      {!loading && (
        <div className="mt-4 flex flex-col items-center w-full" ref={metadataRef}>
          <div className="flex justify-between items-center w-full mb-2">
            <p className="text-sm text-gray-400">NFT Metadata</p>
            <button 
              onClick={toggleMetadataView}
              className="text-xs text-[#00a3ff] hover:text-blue-300 transition-colors"
            >
              {showFullMetadata ? "Show Less" : "Show More"}
            </button>
          </div>
          
          <div 
            className={`bg-[#151524] p-3 rounded-lg w-full overflow-auto transition-all duration-300 ease-in-out ${
              showFullMetadata ? "max-h-[500px]" : "max-h-[150px]"
            }`}
          >
            <pre className="text-gray-300 whitespace-pre-wrap text-xs font-mono">
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </div>
          
          <div className="mt-2 w-full flex justify-center">
            <div className="w-12 h-1 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
                 onClick={toggleMetadataView}></div>
          </div>
        </div>
      )}
    </div>
  )
}
