import React from "react"
import { Link } from "react-router-dom"


function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20 text-center">
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6">Your AI Fashion Copilot</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
          Build your taste. Curate your vibe. Learn with every look.
        </p>
        <Link to="/chat">
          <button className="bg-black hover:bg-gray-800 text-white rounded-none px-10 py-6 text-lg">Try It Now</button>
        </Link>
      </section>

      {/* Moodboard Grid */}
      <section className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-200">
              <img
                src="/placeholder.svg"
                alt="Fashion inspiration"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default LandingPage
