// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { ArrowRight } from "lucide-react";
// import Preview from '../Preview/Preview';
// import { useChatLimit } from '../ChatLimiter/ChatLimiter';


// // API URL configuration with fallback to localhost
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';


// // Thinking component for loading state
// const Thinking = ({ isDark }) => {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
//         <img
//           src="/9edcdf8d-d69d-402d-9c0b-e43646659ea6.jpg"
//           loading="eager"
//           alt="Ferdinand"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div
//         className={`flex items-center mt-2 ${
//           isDark ? "text-gray-400" : "text-gray-500"
//         }`}
//       >
//         <span className="text-base">Thinking</span>
//         <span className="inline-flex w-5 ml-1">
//           <span className="animate-bounce">.</span>
//           <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
//             .
//           </span>
//           <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
//             .
//           </span>
//         </span>
//       </div>
//     </div>
//   );
// };



// // AnimatedWord component for text animation
// type AnimatedWordProps = {
//   word: string;
//   delay: number;
//   isBold?: boolean;
//   linkUrl?: string;
//   onWordShown?: (element: HTMLSpanElement | HTMLAnchorElement) => void;
//   wordIndex?: number;
//   isDark?: boolean;
// };
// const AnimatedWord: React.FC<AnimatedWordProps> = ({
//   word,
//   delay,
//   isBold,
//   linkUrl,
//   onWordShown,
//   wordIndex,
//   isDark,
// }) => {
//   const wordRef = useRef(null);

//   useEffect(() => {
//     // Once it's time for this word to appear, call onWordShown
//     const timer = setTimeout(() => {
//       if (onWordShown && wordRef.current) {
//         onWordShown(wordRef.current);
//       }
//     }, delay * 1000);

//     return () => clearTimeout(timer);
//   }, [delay, onWordShown]);

//   const style = {
//     display: "inline-block",
//     opacity: 0,
//     animation: `fadeIn 0.15s ease-in-out forwards ${delay}s`,
//     marginRight: "0.25em", // spacing between words
//   };

//   const className = isBold ? "font-semibold" : "";

//   if (linkUrl) {
//     return (
//       <a
//         href={linkUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={style}
//         className={`underline ${
//           isDark
//             ? "text-blue-400 hover:text-blue-300"
//             : "text-blue-600 hover:text-blue-800"
//         }`}
//         ref={wordRef}
//         data-word={word}
//       >
//         {word}
//       </a>
//     );
//   }

//   return (
//     <span style={style} className={className} ref={wordRef} data-word={word}>
//       {word}
//     </span>
//   );
// };



// //TextMessage
// interface TextMessageProps {
//   text: string;
//   onAnimationComplete?: () => void;
//   onWordShown?: (index: number) => void;
//   isDark?: boolean;
//   waitForAllImagesLoaded?: boolean;
//   allImagesLoaded?: boolean;
// }
// const TextMessage: React.FC<TextMessageProps > = ({
//   text,
//   onAnimationComplete,
//   onWordShown,
//   isDark,
//   waitForAllImagesLoaded = false,
//   allImagesLoaded = true,
// }) => {
//   const animationDelay = 0.035;
//   const messageRef = useRef(null);

//   const preprocessText = (rawText:string) => {
//     return rawText
//       .replace(/\r\n|\r/g, "\n")
//       .replace(/:\s*(\d+\.)/g, ":\n$1")
//       .replace(/\.\s+(\d+\.)/g, ".\n$1")
//       .trim();
//   };

//   const processTextWithFormatting = (rawText:string) => {
//     const parts = [];
//     let currentIndex = 0;

//     const patterns = {
//       bold: /\*\*([^*]+)\*\*/g,
//       link: /\[([^\]]+)\]\(([^)]+)\)/g,
//     };

//     while (true) {
//       let earliestMatch = null;
//       let matchType = null;

//       for (const [type, pattern] of Object.entries(patterns)) {
//         pattern.lastIndex = currentIndex;
//         const match = pattern.exec(rawText);
//         if (match && (!earliestMatch || match.index < earliestMatch.index)) {
//           earliestMatch = match;
//           matchType = type;
//         }
//       }

//       if (!earliestMatch) break;

//       if (earliestMatch.index > currentIndex) {
//         parts.push({
//           type: "text",
//           content: rawText.slice(currentIndex, earliestMatch.index),
//         });
//       }

//       if (matchType === "bold") {
//         parts.push({
//           type: "bold",
//           content: earliestMatch[1].trim(),
//         });
//       } else if (matchType === "link") {
//         let linkUrl = earliestMatch[2] || "";
//         linkUrl = linkUrl.replace(/\s+/g, "");
//         if (linkUrl.startsWith("//")) {
//           linkUrl = "https:" + linkUrl;
//         }
//         parts.push({
//           type: "link",
//           text: earliestMatch[1].trim(),
//           url: linkUrl,
//         });
//       }

//       currentIndex = earliestMatch.index + earliestMatch[0].length;
//     }

//     if (currentIndex < rawText.length) {
//       parts.push({
//         type: "text",
//         content: rawText.slice(currentIndex),
//       });
//     }

//     return parts;
//   };

//   const paragraphs = preprocessText(text)
//     .split("\n")
//     .filter((para) => para.trim());

//   const totalWords = paragraphs.reduce((count, para) => {
//     return count + para.split(" ").filter(Boolean).length;
//   }, 0);

//   useEffect(() => {
//     if (waitForAllImagesLoaded && !allImagesLoaded) {
//       return;
//     }
//     const timer = setTimeout(() => {
//       onAnimationComplete?.();
//     }, totalWords * animationDelay * 1000 + 400);

//     return () => clearTimeout(timer);
//   }, [
//     totalWords,
//     animationDelay,
//     onAnimationComplete,
//     waitForAllImagesLoaded,
//     allImagesLoaded,
//   ]);

//   let wordCounter = 0;

//   return (
//     <div className={`text-base ${isDark ? "text-white" : "text-gray-900"}`} ref={messageRef}>
//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; }
//             to { opacity: 1; }
//           }
//         `}
//       </style>
//       {paragraphs.map((paragraph, paraIndex) => (
//         <p key={paraIndex} className="mb-2">
//           {processTextWithFormatting(paragraph).map((part, partIndex) => {
//             if (part.type === "bold") {
//               wordCounter++;
//               return (
//                 <AnimatedWord
//                   key={`bold-${paraIndex}-${partIndex}`}
//                   word={part.content}
//                   delay={wordCounter * animationDelay}
//                   isBold
//                   onWordShown={onWordShown}
//                   wordIndex={wordCounter}
//                   isDark={isDark}
//                 />
//               );
//             } else if (part.type === "link") {
//               wordCounter++;
//               return (
//                 <AnimatedWord
//                   key={`link-${paraIndex}-${partIndex}`}
//                   word={part.text}
//                   delay={wordCounter * animationDelay}
//                   linkUrl={part.url}
//                   onWordShown={onWordShown}
//                   wordIndex={wordCounter}
//                   isDark={isDark}
//                 />
//               );
//             } else {
//               return part.content
//                 .split(/\s+/)
//                 .filter(Boolean)
//                 .map((word, wIndex) => {
//                   wordCounter++;
//                   return (
//                     <AnimatedWord
//                       key={`text-${paraIndex}-${partIndex}-${wIndex}`}
//                       word={word}
//                       delay={wordCounter * animationDelay}
//                       onWordShown={onWordShown}
//                       wordIndex={wordCounter}
//                       isDark={isDark}
//                     />
//                   );
//                 });
//             }
//           })}
//         </p>
//       ))}
//     </div>
//   );
// };




// // Message component
// interface MessageProps {
//   message: {
//     type: "user" | "assistant";
//     content: {
//       type: "text" | "image" | "mixed_content";
//       content: string | { type: string; content: string }[];
//     };
//   };
//   showAvatar: boolean;
//   onAnimationComplete?: () => void;
//   onWordShown?: () => void;
//   isDark: boolean;
// }
// const Message: React.FC<MessageProps> = ({
//   message,
//   showAvatar,
//   onAnimationComplete,
//   onWordShown,
//   isDark,
// }) => {
//   // For image previews
//   const [previewStates, setPreviewStates] = useState<{ [key: number]: boolean }>({});
//   const [imagesLoadingCount, setImagesLoadingCount] = useState(0);
//   const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

//   const isArrayContent = Array.isArray(message.content.content);
//   const hasImageContent = message.content.type === "mixed_content";

//   // Construct array of parts if needed
//   let contentArray: (string | { type: string; content: string })[] = [];
//   if (isArrayContent) {
//     contentArray = message.content.content;
//   } else if (hasImageContent && !isArrayContent) {
//     contentArray = [message.content.content];
//   }

//   // Count how many images we have
//   useEffect(() => {
//     if (contentArray.length) {
//       let totalImages = 0;
//       contentArray.forEach((part) => {
//         if ((part as { type: string }).type === "image") {
//           totalImages++;
//         }
//       });
//       setImagesLoadingCount(totalImages);
//       setImagesLoadedCount(0);
//     }
//   }, [contentArray]);

//   const allImagesLoaded =
//     imagesLoadingCount === 0 || imagesLoadedCount === imagesLoadingCount;

//   const handleImageLoad = () => {
//     setImagesLoadedCount((prev) => prev + 1);
//   };

//   if (message.type === "user") {
//     // User message bubble
//     return (
//       <div
//         className={`rounded-2xl py-2 px-3 inline-block max-w-[90%] text-base md:text-base ${
//           isDark ? "bg-[#252525] text-white" : "bg-gray-100 text-gray-900"
//         }`}
//       >
//         {message.content.content}
//       </div>
//     );
//   }

//   // Assistant (or system) message
//   return (
//     <div className="flex items-start gap-3 group">
//       {showAvatar && (
//         <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
//           <img
//             src="/9edcdf8d-d69d-402d-9c0b-e43646659ea6.jpg"
//             loading="eager"
//             alt="Ferdinand"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}
//       {!showAvatar && <div className="w-8" />}
//       <div className="flex-1 leading-relaxed min-w-0 pt-1 text-base md:text-base">
//         {isArrayContent || hasImageContent ? (
//           <div className="space-y-4">
//             {contentArray.map((part, index) => {
//               if (!part.type || (part as { type: string }).type === "text") {
//                 // Text chunk
//                 return (
//                   <TextMessage
//                     key={`text-${index}`}
//                     text={typeof part === "string" ? part : (part as { content: string }).content}
//                     onAnimationComplete={
//                       index === contentArray.length - 1
//                         ? onAnimationComplete
//                         : undefined
//                     }
//                     onWordShown={onWordShown}
//                     isDark={isDark}
//                     waitForAllImagesLoaded={true}
//                     allImagesLoaded={
//                       allImagesLoaded && index === contentArray.length - 1
//                     }
//                   />
//                 );
//               } else if ((part as { type: string }).type === "image") {
//                 // Image chunk
//                 const imageSrc = `${API_URL}${(part as { content: string }).content}`;
//                 return (
//                   <div className="my-4" key={`img-${index}`}>
//                     <img
//                       src={imageSrc}
//                       alt="Content visualization"
//                       className={`max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity border-[1px] ${
//                         isDark ? "border-gray-200" : "border-gray-200"
//                       }`}
//                       style={{ maxHeight: "240px" }}
//                       onClick={() =>
//                         setPreviewStates((prev) => ({
//                           ...prev,
//                           [index]: true,
//                         }))
//                       }
//                       onLoad={() => {
//                         handleImageLoad();
//                         // If only images or if last chunk, maybe call onAnimationComplete
//                         if (index === contentArray.length - 1) {
//                           if (imagesLoadedCount + 1 === imagesLoadingCount) {
//                             onAnimationComplete?.();
//                           }
//                         }
//                       }}
//                       onError={(e) => {
//                         console.error("Image failed to load:", e.target.src);
//                         handleImageLoad();
//                         e.target.onerror = null;
//                         if (index === contentArray.length - 1) {
//                           if (imagesLoadedCount + 1 === imagesLoadingCount) {
//                             onAnimationComplete?.();
//                           }
//                         }
//                       }}
//                     />
//                     {previewStates[index] && (
//                       <Preview
//                         src={imageSrc}
//                         isOpen={previewStates[index]}
//                         onClose={() =>
//                           setPreviewStates((prev) => ({
//                             ...prev,
//                             [index]: false,
//                           }))
//                         }
//                         name={(part as { content: string }).content.split("/").pop()!}
//                       />
//                     )}
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>
//         ) : (
//           // A simple text message
//           <TextMessage
//             text={message.content.content}
//             onAnimationComplete={onAnimationComplete}
//             onWordShown={onWordShown}
//             isDark={isDark}
//             waitForAllImagesLoaded={false}
//             allImagesLoaded
//           />
//         )}
//       </div>
//     </div>
//   );
// };
// export default Message;








// // Helper function to format messages for the LLM
// interface MessageContent {
//   content: string | unknown[]; // Bisa berupa string atau array
// }

// interface Messages {
//   type: "user" | "assistant";
//   content: MessageContent;
// }

// function buildOpenAIMessages(messages: Messages[]): { role: "user" | "assistant"; content: string }[] {
//   return messages.flatMap((msg) => {
//     // If it’s an assistant message with array-of-images or mixed content, skip it
//     if (msg.type === "assistant" && Array.isArray(msg.content.content)) {
//       return [];
//     }

//     return {
//       role: msg.type === "user" ? "user" : "assistant",
//       content:
//         typeof msg.content.content === "string"
//           ? msg.content.content
//           : JSON.stringify(msg.content.content),
//     };
//   });
// }








// // Main Search component
// interface SearchProps {
//   isDark?: boolean;
// }

// type MessageType = "user" | "assistant";

// interface MessageContent {
//   content: string | unknown[];
//   isHTML: boolean;
//   type?: string;
// }

// interface MessageSearch {
//   type: MessageType;
//   content: MessageContent;
//   onAnimationComplete?: () => void;
// }

// const Search = forwardRef(({ isDark = false, ...props }: SearchProps, ref) => {
//   // State
//   const [messages, setMessages] = useState<any[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [userScrolled, setUserScrolled] = useState(false);
//   const [, setIsThinking] = useState(false);

//   // New limit-related state
//   const [, setShowBanner] = useState(false);
//   const { isLimited, incrementCount, } = useChatLimit(50);

//   // Refs
//   const chatEndRef = useRef<HTMLDivElement | null>(null);
//   const chatContainerRef = useRef<HTMLDivElement | null>(null);

//   // Expose handleSubmit to parent
//   useImperativeHandle(ref, () => ({
//     handleSubmit: (msg: string) => handleSubmit(msg),
//   }));

//   // Quick action buttons
//   const quickActions = [
//     { label: "About me", prompt: "Do an introduction about yourself." },
//     { label: "Skills", prompt: "What are your technical skills?" },
//     { label: "Projects", prompt: "Tell me about your projects." },
//     { label: "Education", prompt: "What is your educational background?" },
//     { label: "Contact", prompt: "How can someone get in touch with you?" },
//   ];

//   // Detect user scrolling
//   useEffect(() => {
//     const container = chatContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       if (!isAnimating) setUserScrolled(true);
//     };

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, [isAnimating]);

//   //Word-by-word auto-scroll for assistant messages
//   const handleWordShown = useCallback(
//     (element: HTMLElement | null) => {
//       if (!chatContainerRef.current || !element || userScrolled) return;
//       const container = chatContainerRef.current;
//       const containerRect = container.getBoundingClientRect();
//       const elementRect = element.getBoundingClientRect();

//       if (elementRect.bottom > containerRect.bottom) {
//         container.scrollBy({ top: elementRect.bottom - containerRect.bottom + 24, behavior: "smooth" });
//       }
//     },
//     [userScrolled]
//   );

//   // Add message to chat
//   const addMessage = async (message: MessageSearch) => {
//     setUserScrolled(false);

//     return new Promise<void>((resolve) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           ...message,
//           onAnimationComplete: () => {
//             resolve();
//             setIsAnimating(false);
//           },
//         },
//       ]);
//     });
//   };

//   // Handle user message submission
//   const handleSubmit = async (msg: string) => {
//     const userMessage = msg || inputValue.trim();
//     if (!userMessage) return;

//     if (!incrementCount()) {
//       setShowBanner(true);
//       return;
//     }

//     setIsChatActive(true);
//     setIsAnimating(true);
//     setUserScrolled(false);
//     setIsThinking(true);

//     const newUserMessage = { type: "user", content: { content: userMessage, isHTML: false } };
//     setMessages((prev) => [...prev, newUserMessage]);
//     setInputValue("");

//     setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 0);

//     try {
//       const openAIMessages = buildOpenAIMessages([...messages, newUserMessage]);
//       const response = await fetch(`/api/qa`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: openAIMessages }),
//       });

//       if (!response.ok) throw new Error("Failed to get answer from API");

//       const modelResponse = await response.json();
//       setIsThinking(false);

//       await addMessage({
//         type: "assistant",
//         content: { content: modelResponse.content, isHTML: false, type: modelResponse.type || "text" },
//       });
//     } catch (error) {
//       console.error("Error in conversation:", error);
//       setIsThinking(false);
//       await addMessage({
//         type: "assistant",
//         content: { content: "I encountered an issue. Please try again later.", isHTML: false },
//       });
//     }
//   };

//   // Handle quick action selection
//   // const handleQuickAction = async (action: { label: string; prompt: string }) => {
//   //   if (!incrementCount()) {
//   //     setShowBanner(true);
//   //     return;
//   //   }

//   //   setIsAnimating(true);
//   //   setIsChatActive(true);
//   //   setUserScrolled(false);
//   //   setIsThinking(true);

//   //   const userMsg = { type: "user", content: { content: action.label, isHTML: false } };
//   //   setMessages((prev) => [...prev, userMsg]);

//   //   setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 0);

//   //   try {
//   //     const openAIMessages = buildOpenAIMessages([...messages, userMsg]);
//   //     const finalPayload = [...openAIMessages, { role: "user", content: action.prompt }];

//   //     const response = await fetch(`/api/qa`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ messages: finalPayload }),
//   //     });

//   //     if (!response.ok) throw new Error("Failed to get answer from API");

//   //     const modelResponse = await response.json();
//   //     setIsThinking(false);

//   //     await addMessage({
//   //       type: "assistant",
//   //       content: { content: modelResponse.content, isHTML: false, type: modelResponse.type },
//   //       label: action.label,
//   //     });
//   //   } catch (error) {
//   //     console.error("Error in quick action:", error);
//   //     setIsThinking(false);
//   //     await addMessage({
//   //       type: "assistant",
//   //       content: { content: "I encountered an issue. Please try again later.", isHTML: false },
//   //     });
//   //   }
//   // };

//   return (
//     <section className={`h-screen flex flex-col items-center justify-center px-4 ${isDark ? "bg-black" : "bg-white"}`} {...props}>
//       <div className="max-w-3xl mx-auto w-full">
//         {isLimited && (
//           <p className={`text-sm mb-2 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
//             You've reached your daily chat limit. Please email me instead - ferdinandnat@gmail.com
//           </p>
//         )}

//         <h1 className={`text-3xl font-normal text-center mb-4 mt-2 ${isChatActive ? "hidden" : ""} ${isDark ? "text-white" : "text-gray-900"}`}>
//           Hi, I'm Ferdinand. Ask me anything!
//         </h1>

//         {/* Add Chat UI Components here */}
//       </div>
//     </section>
//   );
// });

// export default Search;