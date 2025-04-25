"use client"

import Image from "next/image"

export default function QuestFormStep2({ formData, handleChange, handleImageUpload }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Quest Details</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="timeToComplete" className="block text-sm font-medium text-gray-300 mb-1">
              Time to Complete (minutes)*
            </label>
            <input
              type="number"
              id="timeToComplete"
              name="timeToComplete"
              value={formData.timeToComplete}
              onChange={handleChange}
              min="1"
              max="120"
              className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff]"
              required
            />
          </div>

          <div>
            <label htmlFor="reward" className="block text-sm font-medium text-gray-300 mb-1">
              Reward Amount (SOL)*
            </label>
            <input
              type="number"
              id="reward"
              name="reward"
              value={formData.reward}
              onChange={handleChange}
              min="0.001"
              step="0.001"
              className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Quest Image*</label>

          <div className="border-2 border-dashed border-[#252540] rounded-lg p-4 text-center">
            {formData.imagePreview ? (
              <div className="relative">
                <Image
                  src={formData.imagePreview || "/placeholder.svg"}
                  alt="Quest preview"
                  width={300}
                  height={200}
                  className="mx-auto h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                  onClick={() => {
                    URL.revokeObjectURL(formData.imagePreview)
                    handleChange({ target: { name: "image", value: null } })
                    handleChange({ target: { name: "imagePreview", value: null } })
                  }}
                >
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto text-gray-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p className="text-sm text-gray-400">Drag and drop an image, or click to browse</p>
                <p className="text-xs text-gray-500">Recommended size: 800x600px. Max size: 2MB</p>
              </div>
            )}

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${formData.imagePreview ? "hidden" : ""}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[#1e1e32] rounded-lg">
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
            <p className="font-medium text-white mb-1">Reward Information</p>
            <p>
              The reward amount will be deducted from your wallet when the quest is created and held in escrow until
              someone completes the quest successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
