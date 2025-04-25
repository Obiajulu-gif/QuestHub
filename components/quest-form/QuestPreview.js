"use client"

import Image from "next/image"

export default function QuestPreview({ formData }) {
  // Helper function to get level name
  const getLevelName = (levelId) => {
    const levels = {
      lvl1: "Level 1 (Easy)",
      lvl2: "Level 2 (Medium)",
      lvl3: "Level 3 (Hard)",
      lvl4: "Level 4 (Expert)",
      lvl5: "Level 5 (Master)",
    }
    return levels[levelId] || levelId
  }

  // Helper function to get category name
  const getCategoryName = (categoryId) => {
    const categories = {
      quiz: "Quiz",
      riddle: "Riddle",
      task: "Task",
      challenge: "Challenge",
    }
    return categories[categoryId] || categoryId
  }

  return (
    <div className="space-y-6">
      <div className="card overflow-hidden">
        {/* Quest Image */}
        <div className="relative h-48 w-full">
          {formData.imagePreview ? (
            <Image
              src={formData.imagePreview || "/placeholder.svg"}
              alt={formData.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#1e1e32] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          )}
        </div>

        {/* Quest Details */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-[#1e1e32] text-xs rounded-md">{getCategoryName(formData.category)}</span>
              <span className="px-2 py-1 bg-[#1e1e32] text-xs rounded-md">{getLevelName(formData.level)}</span>
            </div>

            <div className="flex items-center gap-2 text-[#ffc107]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{formData.reward} SOL</span>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2">{formData.title || "Quest Title"}</h2>

          <p className="text-gray-300 mb-4">{formData.description || "Quest description will appear here."}</p>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{formData.timeToComplete} min</span>
            </div>

            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Created by You</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">Challenge Preview</h3>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Question:</h4>
          <p className="text-gray-300">{formData.question || "Your question will appear here."}</p>
        </div>

        {formData.hint && (
          <div className="bg-[#1e1e32] p-3 rounded-lg mb-6">
            <div className="flex items-center gap-2 text-[#00a3ff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                <line x1="12" y1="8" x2="12" y2="12"></line>
              </svg>
              <span>Hint: {formData.hint}</span>
            </div>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-2">Answer:</h4>
          <div className="bg-[#1e1e32] p-3 rounded-lg">
            <p className="text-gray-300">{formData.answer || "Your answer will appear here."}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#151524] p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-[#00a3ff] mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
              <line x1="12" y1="8" x2="12" y2="12"></line>
            </svg>
          </div>
          <div className="text-sm text-gray-300">
            <p>This is a preview of how your quest will appear to users. To make changes, click the "Edit" button.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
