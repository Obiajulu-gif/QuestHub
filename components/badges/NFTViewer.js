"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function NFTViewer({ badge }) {
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const image = new Image()
    image.crossOrigin = "anonymous" // Prevent CORS issues

    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 500

    // Draw background
    ctx.fillStyle = "#151524"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw border
    ctx.strokeStyle = getRarityBorderColor(badge.rarity)
    ctx.lineWidth = 10
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10)

    // Draw badge image
    image.onload = () => {
      // Center the image
      const x = (canvas.width - 300) / 2
      const y = (canvas.height - 300) / 2
      ctx.drawImage(image, x, y, 300, 300)

      // Draw badge name
      ctx.font = "bold 24px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText(badge.name, canvas.width / 2, 400)

      // Draw rarity
      ctx.font = "16px Arial"
      ctx.fillStyle = getRarityTextColor(badge.rarity)
      ctx.fillText(badge.rarity, canvas.width / 2, 430)

      // Draw QuestHub logo
      ctx.font = "12px Arial"
      ctx.fillStyle = "#00a3ff"
      ctx.fillText("QuestHub NFT", canvas.width / 2, 460)

      setLoading(false)
    }

    // Handle image error
    image.onerror = () => {
      ctx.font = "bold 20px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("Image could not be loaded", canvas.width / 2, canvas.height / 2)
      setLoading(false)
    }

    // Set image source
    if (badge.image) {
      image.src = badge.image
    } else {
      image.src = `/placeholder.svg?height=300&width=300&query=badge with ${badge.name}`
    }

    return () => {
      // Clean up
      image.onload = null
      image.onerror = null
    }
  }, [badge])

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

  return (
    <div className="flex flex-col items-center">
      {loading && (
        <div className="flex items-center justify-center h-[300px] w-full">
          <div className="w-8 h-8 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`rounded-lg shadow-lg max-w-full h-auto ${loading ? "hidden" : "block"}`}
        style={{ maxHeight: "350px" }}
      />

      {!loading && (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-2">NFT Metadata</p>
          <div className="bg-[#151524] p-3 rounded-lg w-full max-w-xs text-xs font-mono overflow-x-auto">
            <pre className="text-gray-300">
              {JSON.stringify(
                {
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
                },
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
