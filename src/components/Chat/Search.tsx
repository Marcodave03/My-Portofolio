
"use client"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { ArrowRight } from "lucide-react"
import { useChatLimit } from "./Chatlimitter"
import Message from "./Message"
import { buildOpenAIMessages } from "./utils"
import Thinking from "./Thinking" // Import Thinking component

// API URL configuration with fallback to localhost
///const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface SearchProps {
  isDark?: boolean
}

type MessageType = "user" | "assistant"

interface MessageContent {
  content: string | { type: string; content: string }[]
  isHTML: boolean
  type: "text" | "image" | "mixed_content"
}



interface MessageSearch {
  type: MessageType
  content: MessageContent
  onAnimationComplete?: () => void
}

const Search = forwardRef<{ handleSubmit: (msg: string) => void }, SearchProps>(({ isDark = false }, ref) => {
  // State
  const [messages, setMessages] = useState<MessageSearch[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isChatActive, setIsChatActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [, setUserScrolled] = useState(false)
  const [isThinking, setIsThinking] = useState(false)

  // New limit-related state
  const [, setShowBanner] = useState(false)
  const { isLimited, incrementCount } = useChatLimit(50)

  // Refs
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  // Expose handleSubmit to parent
  useImperativeHandle(ref, () => ({
    handleSubmit: (msg: string) => handleSubmit(msg),
  }))

  // Quick action buttons
  const quickActions = [
    { label: "About me", prompt: "Do an introduction about yourself." },
    { label: "Skills", prompt: "What are your technical skills?" },
    { label: "Projects", prompt: "Tell me about your projects." },
    { label: "Education", prompt: "What is your educational background?" },
    { label: "Contact", prompt: "How can someone get in touch with you?" },
  ]

  // Detect user scrolling
  useEffect(() => {
    const container = chatContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (!isAnimating) setUserScrolled(true)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [isAnimating])

  // Word-by-word auto-scroll for assistant messages
  // const handleWordShown = useCallback(
  //   (element: HTMLElement | null) => {
  //     if (!chatContainerRef.current || !element || userScrolled) return
  //     const container = chatContainerRef.current
  //     const containerRect = container.getBoundingClientRect()
  //     const elementRect = element.getBoundingClientRect()

  //     if (elementRect.bottom > containerRect.bottom) {
  //       container.scrollBy({ top: elementRect.bottom - containerRect.bottom + 24, behavior: "smooth" })
  //     }
  //   },
  //   [userScrolled],
  // )

  // Add message to chat
  const addMessage = async (message: MessageSearch) => {
    setUserScrolled(false)

    return new Promise<void>((resolve) => {
      setMessages((prev) => [
        ...prev,
        {
          ...message,
          onAnimationComplete: () => {
            resolve()
            setIsAnimating(false)
          },
        },
      ])
    })
  }

  // Handle user message submission
  const handleSubmit = async (msg: string) => {
    const userMessage = msg || inputValue.trim()
    if (!userMessage) return

    if (!incrementCount()) {
      setShowBanner(true)
      return
    }

    setIsChatActive(true)
    setIsAnimating(true)
    setUserScrolled(false)
    setIsThinking(true)

    const newUserMessage: MessageSearch = {
      type: "user",
      content: { content: userMessage, isHTML: false, type: "text" }, // Ensure "type" is specified
    };    
    
    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")

    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 0)

    try {
      const openAIMessages = buildOpenAIMessages([...messages, newUserMessage])
      const response = await fetch(`/api/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: openAIMessages }),
      })

      if (!response.ok) throw new Error("Failed to get answer from API")

      const modelResponse = await response.json()
      setIsThinking(false)

      await addMessage({
        type: "assistant",
        content: { content: modelResponse.content, isHTML: false, type: modelResponse.type || "text" },
      })
    } catch (error) {
      console.error("Error in conversation:", error)
      setIsThinking(false)
      await addMessage({
        type: "assistant",
        content: { content: "I encountered an issue. Please try again later.", isHTML: false, type: "text" },
      });      
    }
  }

  return (
    <section
      className="h-screen flex flex-col items-center justify-center px-4 relative z-[50] bg-slate-500"
    >
      <div className="max-w-3xl mx-auto w-full">
        {isLimited && (
          <p className={`text-sm mb-2 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            You've reached your daily chat limit. Please email me instead - ferdinandnat@gmail.com
          </p>
        )}

        <h1
          className={`text-3xl font-normal text-center mb-4 mt-2 ${isChatActive ? "hidden" : ""} ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Hi, I'm Ferdinand. Ask me anything!
        </h1>

        <div ref={chatContainerRef} className="overflow-y-auto max-h-[60vh] mb-4">
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              showAvatar={index === 0 || messages[index - 1].type !== message.type}
              onAnimationComplete={message.onAnimationComplete}
              // onWordShown={handleWordShown}
              isDark={isDark}
            />
          ))}
          {isThinking && <Thinking isDark={isDark} />}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit(inputValue)}
            placeholder="Type your message..."
            className={`flex-grow p-2 rounded-l-md ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
          />
          <button
            onClick={() => handleSubmit(inputValue)}
            className={`p-2 rounded-r-md ${isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`}
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {!isChatActive && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleSubmit(action.prompt)}
                className={`px-3 py-1 rounded-full text-sm ${
                  isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
})

export default Search



