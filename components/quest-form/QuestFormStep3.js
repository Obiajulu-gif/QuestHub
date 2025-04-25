"use client"

export default function QuestFormStep3({ formData, handleChange }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Quest Challenge</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-1">
            Question/Challenge*
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter your question or challenge"
            className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff] min-h-[100px]"
            required
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-300 mb-1">
            Correct Answer*
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Enter the correct answer"
            className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff]"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            The answer is case-insensitive. Users will need to provide this exact answer to complete the quest.
          </p>
        </div>

        <div>
          <label htmlFor="hint" className="block text-sm font-medium text-gray-300 mb-1">
            Hint (Optional)
          </label>
          <input
            type="text"
            id="hint"
            name="hint"
            value={formData.hint}
            onChange={handleChange}
            placeholder="Provide a hint to help users"
            className="w-full bg-[#0a0a14] border border-[#252540] rounded-lg p-3 focus:outline-none focus:border-[#00a3ff]"
          />
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
            <p className="font-medium text-white mb-1">Challenge Tips</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Make sure your question is clear and unambiguous</li>
              <li>The answer should be specific and verifiable</li>
              <li>Providing a hint is recommended for more difficult challenges</li>
              <li>Consider the difficulty level when creating your challenge</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
