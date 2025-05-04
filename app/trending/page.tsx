"use client"
import { Layout } from "@/components/Layout"
import Link from "next/link"

export default function TrendingPage() {
  return (
    <Layout>
      <div className="min-h-screen px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <div className="bg-[#151524] rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold mb-6">Trending on QuestHub</h1>
          <p className="text-gray-400 mb-8">Discover what's popular in the QuestHub community right now.</p>

          {/* Placeholder content */}
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#252540] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00a3ff]"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Trending content coming soon</h3>
            <p className="text-gray-400">Check back later for trending topics and activities</p>
            <div className="mt-6">
              <Link
                href="/activity"
                className="bg-[#00a3ff] hover:bg-[#0090e0] text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 inline-block"
              >
                Back to Activity Feed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
