"use client"

export default function QuestFormStep1({ formData, handleChange }) {
  const categories = [
    { id: "quiz", name: "Quiz" },
    { id: "riddle", name: "Riddle" },
    { id: "task", name: "Task" },
    { id: "challenge", name: "Challenge" },
  ]

  const levels = [
    { id: "lvl1", name: "Level 1 (Easy)" },
    { id: "lvl2", name: "Level 2 (Medium)" },
    { id: "lvl3", name: "Level 3 (Hard)" },
    { id: "lvl4", name: "Level 4 (Expert)" },
    { id: "lvl5", name: "Level 5 (Master)" },
  ]

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Quest Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a catchy title for your quest"
            className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff]"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your quest in detail"
            className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff] min-h-[120px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Category*
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff]"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-1">
              Difficulty Level*
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff]"
              required
            >
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
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
            <p className="font-medium text-white mb-1">Quest Creation Tips</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Choose a clear and engaging title</li>
              <li>Provide detailed instructions in the description</li>
              <li>Select the appropriate category and difficulty level</li>
              <li>Higher difficulty levels should offer greater rewards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
