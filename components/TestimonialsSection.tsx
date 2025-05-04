import Image from "next/image"

// Sample testimonials data - in a real app, this would come from an API or database
const testimonials = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Blockchain Developer",
    avatar: "/avatars/avatar-1.png",
    content:
      "QuestHub has completely transformed how I learn about blockchain technology. The quests are challenging yet rewarding, and I've earned some amazing badges along the way!",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Crypto Enthusiast",
    avatar: "/avatars/avatar-2.png",
    content:
      "I've tried many learning platforms, but QuestHub stands out with its gamified approach. The community is incredibly supportive, and the rewards keep me motivated.",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Web3 Researcher",
    avatar: "/avatars/avatar-3.png",
    content:
      "As someone researching Web3 technologies, QuestHub provides practical challenges that have deepened my understanding. The badge system is addictive in the best way!",
    rating: 4,
  },
]

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Questers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our community members about their experiences on QuestHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute top-6 right-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>

              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
