import Link from "next/link"
import { Button } from "@/components/ui/Button"

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/cta-background.png')] bg-repeat opacity-20"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Begin Your Quest Journey?</h2>
          <p className="text-lg text-indigo-200 mb-8">
            Join thousands of questers already exploring, learning, and earning rewards on QuestHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="primary">
                Create Free Account
              </Button>
            </Link>
            <Link href="/quests">
              <Button size="lg" variant="transparent">
                Explore Quests
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-indigo-200">No credit card required. Start your quest journey today!</p>
        </div>
      </div>
    </section>
  )
}

export default CTASection
