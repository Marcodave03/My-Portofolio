import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ArrowRight } from "lucide-react";
import { useChatLimit } from "./Chatlimitter";
import Message from "./Message";
import Thinking from "./Thinking";
import { fetchOpenAIResponse } from "./api/openaiServices"; // Import the service
// import { initialContext } from "./api/chatContext";

interface SearchProps {
  isDark?: boolean;
}

type MessageType = "user" | "assistant";

interface MessageContent {
  content: string | { type: string; content: string }[];
  isHTML: boolean;
  type: "text" | "image" | "mixed_content";
}

interface MessageSearch {
  type: MessageType;
  content: MessageContent;
  onAnimationComplete?: () => void;
}

const Search = forwardRef<{ handleSubmit: (msg: string) => void }, SearchProps>(
  ({ isDark = false }, ref) => {
    // State
    const [messages, setMessages] = useState<MessageSearch[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isChatActive, setIsChatActive] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [, setUserScrolled] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    // New limit-related state
    const [, setShowBanner] = useState(false);
    const { isLimited, incrementCount } = useChatLimit(50);

    // Refs
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // Expose handleSubmit to parent
    useImperativeHandle(ref, () => ({
      handleSubmit: (msg: string) => handleSubmit(msg),
    }));

    // Quick action buttons
    const quickActions = [
      { label: "About me", prompt: "Do an introduction about yourself." },
      { label: "Skills", prompt: "What are your technical skills?" },
      { label: "Projects", prompt: "Tell me about your projects." },
      { label: "Education", prompt: "What is your educational background?" },
      { label: "Contact", prompt: "How can someone get in touch with you?" },
    ];

    const initialContext = [
      { role: "system", content: "You are chatting with Marco Davincent." },
      { role: "system", content: "Do not answer questions that were not asked." },
      { role: "system", content: "Use this information to provide better responses, but do not explicitly list these details unless necessary." },
      { role: "system", content: "Keep responses concise (max 3 sentences) and relevant to the user's question." },
      { role: "system", content: "Also use I,me,myself instead of Marco as if you are Marco." },
      { role: "system", content: "Do not add something like marco skill or techstack that not mentioned, you can only add explanation if needed" },
      { role: "system", content: "Answer in list if needed" },
      { role: "system", content: "If there is no answer or no context just say your cant talk about it and you can contact me through instagram" },
      {
        role: "system",
        content: `Marco's Profile:
          - Role : Software engineer specializing in Web/App development and AI.
          - Main Framework :  Experience in NextJS, Springboot, NodeJS, and Laravel.
          - Tech Stack : Go to About Page for more details.
          - Design : Experience in Figma, Adobe Photoshop, and Canva`
          
      },
      {
        role: "system",
        content: `Social Media:
          - Instagram : Follow me https://www.instagram.com/marcodave_/
          - Github :  Follow me https://github.com/Marcodave03/
          - Linkedin : Follow me https://www.linkedin.com/in/marcodavincent/
          - Twitter : Follow me https://x.com/MarcoDave10/`
          
      },
      {
        role: "system",
        content: `Projects:
          - Streamverse: A project built on the Hedera network that enables decentralized streaming.
          - NusaTravel: Competition project for travel website using Typescript.
          - Careerspot : Fullstack job finding website using React and NodeJS.
          - NuatTime: A promotional campaign for a reflexology business using digital marketing strategies.
          - Preform: Interview app powered by OpenAI
          - BXPlore: Swift application project for finding way, built in Ios Foundaion Apple Developer Academy`
          
      },
      {
        role: "system",
        content: `Personal Information:
          - Girlfriend: I'm Single and forever be single :(
          - Travel : I love to travel and explore new places, mostly beach and island.
          - Hobbies : I love chess, react out me at chess.com
          - Music : I love to listen to music, mostly pop`
      },
      {
        role: "system",
        content: `Experience:
          - FIF : FIFGROUP member of ASTRA 2025 Backend Developer
          - BCA : BCA Group Strategic Information Techonology 2024 as Frontned Developer
          - Freelance : Nuat Time Reflexology Freelance 2024, create company profile
          - Apple Developer Academy: iOS Foundation Program, Apple Developer Academy 2023 creating innovating apps`
      }
    ];





    // Detect user scrolling
    useEffect(() => {
      const container = chatContainerRef.current;
      if (!container) return;

      const handleScroll = () => {
        if (!isAnimating) setUserScrolled(true);
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }, [isAnimating]);

    // Add message to chat
    const addMessage = async (message: MessageSearch) => {
      setUserScrolled(false);

      return new Promise<void>((resolve) => {
        setMessages((prev) => [
          ...prev,
          {
            ...message,
            onAnimationComplete: () => {
              resolve();
              setIsAnimating(false);
            },
          },
        ]);
      });
    };

    // Handle user message submission
    const handleSubmit = async (msg: string) => {
      const userMessage = msg || inputValue.trim();
      if (!userMessage) return;

      if (!incrementCount()) {
        setShowBanner(true);
        return;
      }

      setIsChatActive(true);
      setIsAnimating(true);
      setUserScrolled(false);
      setIsThinking(true);

      const newUserMessage: MessageSearch = {
        type: "user",
        content: { content: userMessage, isHTML: false, type: "text" }, // Ensure "type" is specified
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setInputValue("");

      setTimeout(
        () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        0
      );

      try {
        const conversationHistory = [
          ...initialContext, // Add predefined system messages
          ...messages.map((m) => ({
            role: m.type === "user" ? "user" : "assistant",
            content: typeof m.content.content === "string" ? m.content.content : "",
          })),
          { role: "user", content: userMessage },
        ];

        const openAIResponse = await fetchOpenAIResponse(JSON.stringify(conversationHistory));
        setIsThinking(false);
        await addMessage({
          type: "assistant",
          content: { content: openAIResponse, isHTML: false, type: "text" },
        });
      } catch (error) {
        console.error("Error in conversation:", error);
        setIsThinking(false);
        await addMessage({
          type: "assistant",
          content: {
            content: "I encountered an issue. Please try again later.",
            isHTML: false,
            type: "text",
          },
        });
      }
    };

    return (
      <div className="h-screen flex flex-col items-center justify-center px-4 relative z-[20]">
        <div className="max-w-3xl mx-auto w-full">
          {isLimited && (
            <p
              className={`text-sm mb-2 text-center ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              You've reached your daily chat limit. Please email me instead -
              ferdinandnat@gmail.com
            </p>
          )}

          <h1
            className={`text-5xl font-normal text-center mb-4 mt-2 ${
              isChatActive ? "hidden" : ""
            } ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Hello there 👋 Let&apos;s Talk ! 🙂
          </h1>

          <div
            ref={chatContainerRef}
            className="overflow-y-auto max-h-[60vh] lg:max-h-[70vh] mb-4 scrollbar-hide"
          >
            {messages.map((message, index) => (
              <Message
                key={index}
                message={message}
                showAvatar={
                  index === 0 || messages[index - 1].type !== message.type
                }
                //onAnimationComplete={message.onAnimationComplete}
                isDark={isDark}
              />
            ))}
            {isThinking && <Thinking isDark={isDark} />}
            <div ref={chatEndRef} />
          </div>

          <div className="flex items-center rounded-xl border-[1.5px] border-black">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(inputValue); 
              }}
              placeholder="Type your message..."
              className="flex-grow p-2 bg-transparent border-none outline-none"
            />
            <button onClick={() => handleSubmit(inputValue)} className="p-4">
              <ArrowRight size={20} />
            </button>
          </div>

          {!isChatActive && (
            <div className="mt-4 flex flex-wrap justify-start gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSubmit(action.prompt)}
                  className="px-3 py-1 rounded-full text-sm border-[1px] border-black"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Search;
