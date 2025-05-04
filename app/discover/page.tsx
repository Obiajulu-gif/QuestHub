"use client"
import { Layout } from "@/components/Layout"
import Link from "next/link"

export default function DiscoverPage() {
  return (
    <Layout>
      <div className="min-h-screen px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <div className="bg-[#151524] rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold mb-6">Discover Users</h1>
          <p className="text-gray-400 mb-8">Find and connect with other QuestHub members.</p>

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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">User discovery coming soon</h3>
            <p className="text-gray-400">Check back later to discover and connect with other users</p>
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
