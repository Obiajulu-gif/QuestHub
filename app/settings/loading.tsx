import { Layout } from "@/components/Layout"

export default function SettingsLoading() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-gray-700 rounded-md mb-6 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="h-6 w-36 bg-gray-700 rounded-md mb-6 animate-pulse"></div>

              <div className="space-y-4">
                <div>
                  <div className="h-4 w-24 bg-gray-700 rounded-md mb-2 animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                <div>
                  <div className="h-4 w-24 bg-gray-700 rounded-md mb-2 animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                <div>
                  <div className="h-4 w-24 bg-gray-700 rounded-md mb-2 animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                <div className="h-10 w-32 bg-gray-700 rounded-md animate-pulse mt-4"></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 w-48 bg-gray-700 rounded-md mb-6 animate-pulse"></div>

              <div className="space-y-4">
                <div>
                  <div className="h-4 w-24 bg-gray-700 rounded-md mb-2 animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                <div>
                  <div className="h-4 w-24 bg-gray-700 rounded-md mb-2 animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                <div className="h-10 w-32 bg-gray-700 rounded-md animate-pulse mt-4"></div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 w-36 bg-gray-700 rounded-md mb-6 animate-pulse"></div>

              <div className="flex flex-col items-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-gray-700 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-10 w-full bg-gray-700 rounded-md animate-pulse mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
