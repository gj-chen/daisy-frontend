import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Send, Heart } from "lucide-react"

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "daisy",
      text: "Hi there! I'm Daisy, your AI fashion copilot. Tell me about your style preferences or what you're looking for today.",
    },
  ])

  const [moodboardImages, setMoodboardImages] = useState([
    { id: "1", url: "/placeholder.svg", isPinned: false },
    { id: "2", url: "/placeholder.svg", isPinned: true },
  ])

  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newUserMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")

    setTimeout(() => {
      const daisyReplies = [
        "This would look great on you.",
        "You might like this silhouette.",
        "This vibe fits your taste.",
        "Here’s a look I’d recommend.",
      ]

      const randomResponse = daisyReplies[Math.floor(Math.random() * daisyReplies.length)]

      const newDaisyMessage = {
        id: Date.now().toString(),
        sender: "daisy",
        text: randomResponse,
        image: "/placeholder.svg",
      }

      setMessages((prev) => [...prev, newDaisyMessage])
      setMoodboardImages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          url: "/placeholder.svg",
          isPinned: false,
        },
      ])
    }, 1000)
  }

  const togglePinImage = (id) => {
    setMoodboardImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isPinned: !img.isPinned } : img
      )
    )
  }

  const sortedImages = [...moodboardImages].sort((a, b) => b.isPinned - a.isPinned)

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight">
          DAISY
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Panel */}
        <div className="w-full md:w-1/2 flex flex-col border-r border-gray-100">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 max-w-[80%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-black text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.image && (
                    <div className="mt-2 overflow-hidden rounded-lg">
                      <img src={msg.image} alt="mood" className="w-full h-auto rounded-md" />
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.sender === "user" ? "You" : "Daisy"} • just now
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask Daisy about fashion..."
                className="flex-1 rounded-full bg-gray-100 px-4 py-2 outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-black text-white rounded-full p-2 hover:bg-gray-800"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Moodboard Panel */}
        <div className="hidden md:block md:w-1/2 overflow-y-auto p-4">
          <h2 className="font-serif text-2xl font-bold mb-4">Your Moodboard</h2>
          <div className="grid grid-cols-2 gap-4">
            {sortedImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                  <img src={image.url} alt="Fashion" className="object-cover w-full h-full" />
                </div>
                <button
                  onClick={() => togglePinImage(image.id)}
                  className={`absolute top-2 right-2 p-1 rounded-full ${
                    image.isPinned ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
