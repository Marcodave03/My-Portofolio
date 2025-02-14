import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle,
  } from 'react';
  import { ArrowRight } from 'lucide-react';
  // import Preview from '../Preview/Preview';
  // import { useChatLimit } from '../ChatLimiter/ChatLimiter';
  
  // API URL configuration with fallback to localhost
  //const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  
  // Thinking component for loading state
  const Thinking = ({ isDark }) => {
    return (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="/9edcdf8d-d69d-402d-9c0b-e43646659ea6.jpg"
            loading="eager"
            alt="Ferdinand"
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`flex items-center mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="text-base">Thinking</span>
          <span className="inline-flex w-5 ml-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
          </span>
        </div>
      </div>
    );
  };
  
  // AnimatedWord component for text animation
  const AnimatedWord = ({
    word,
    delay,
    isBold,
    linkUrl,
    onWordShown,
    wordIndex,
    isDark,
  }) => {
    const wordRef = useRef(null);
  
    useEffect(() => {
      // Once it's time for this word to appear, call onWordShown
      const timer = setTimeout(() => {
        if (onWordShown && wordRef.current) {
          onWordShown(wordRef.current);
        }
      }, delay * 1000);
  
      return () => clearTimeout(timer);
    }, [delay, onWordShown]);
  
    const style = {
      display: 'inline-block',
      opacity: 0,
      animation: `fadeIn 0.15s ease-in-out forwards ${delay}s`,
      marginRight: '0.25em', // spacing between words
    };
  
    const className = isBold ? 'font-semibold' : '';
  
    if (linkUrl) {
      return (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
          className={`underline ${
            isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
          }`}
          ref={wordRef}
          data-word={word}
        >
          {word}
        </a>
      );
    }
  
    return (
      <span style={style} className={className} ref={wordRef} data-word={word}>
        {word}
      </span>
    );
  };
  
  // TextMessage component
  const TextMessage = ({
    text,
    onAnimationComplete,
    onWordShown,
    isDark,
    waitForAllImagesLoaded = false,
    allImagesLoaded = true,
  }) => {
    const animationDelay = 0.035;
    const messageRef = useRef(null);
  
    // Basic text preprocessing
    const preprocessText = (rawText) => {
      return rawText
        .replace(/\r\n|\r/g, '\n')
        .replace(/:\s*(\d+\.)/g, ':\n$1')
        .replace(/\.\s+(\d+\.)/g, '.\n$1')
        .trim();
    };
  
    // Identify bold text or links (simple Markdown-like approach)
    const processTextWithFormatting = (rawText) => {
      const parts = [];
      let currentIndex = 0;
  
      const patterns = {
        bold: /\*\*([^*]+)\*\*/g,
        link: /\[([^\]]+)\]\(([^)]+)\)/g,
      };
  
      while (true) {
        let earliestMatch = null;
        let matchType = null;
  
        for (const [type, pattern] of Object.entries(patterns)) {
          pattern.lastIndex = currentIndex;
          const match = pattern.exec(rawText);
          if (match && (!earliestMatch || match.index < earliestMatch.index)) {
            earliestMatch = match;
            matchType = type;
          }
        }
  
        if (!earliestMatch) break;
  
        // Grab everything before the earliest match as plain text
        if (earliestMatch.index > currentIndex) {
          parts.push({
            type: 'text',
            content: rawText.slice(currentIndex, earliestMatch.index),
          });
        }
  
        if (matchType === 'bold') {
          parts.push({
            type: 'bold',
            content: earliestMatch[1].trim(),
          });
        } else if (matchType === 'link') {
          let linkUrl = earliestMatch[2] || '';
          linkUrl = linkUrl.replace(/\s+/g, '');
          if (linkUrl.startsWith('//')) {
            linkUrl = 'https:' + linkUrl;
          }
          parts.push({
            type: 'link',
            text: earliestMatch[1].trim(),
            url: linkUrl,
          });
        }
  
        currentIndex = earliestMatch.index + earliestMatch[0].length;
      }
  
      // Grab any remaining text after the last match
      if (currentIndex < rawText.length) {
        parts.push({
          type: 'text',
          content: rawText.slice(currentIndex),
        });
      }
  
      return parts;
    };
  
    const paragraphs = preprocessText(text)
      .split('\n')
      .filter((para) => para.trim());
  
    // Count total words for the text animation
    const totalWords = paragraphs.reduce((count, para) => {
      return count + para.split(' ').filter(Boolean).length;
    }, 0);
  
    // Once text animation finishes, call onAnimationComplete
    useEffect(() => {
      if (waitForAllImagesLoaded && !allImagesLoaded) {
        // Wait for images to load if required
        return;
      }
      const timer = setTimeout(() => {
        onAnimationComplete?.();
      }, totalWords * animationDelay * 1000 + 400);
  
      return () => clearTimeout(timer);
    }, [
      totalWords,
      animationDelay,
      onAnimationComplete,
      waitForAllImagesLoaded,
      allImagesLoaded,
    ]);
  
    let wordCounter = 0;
  
    return (
      <div className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`} ref={messageRef}>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}
        </style>
        {paragraphs.map((paragraph, paraIndex) => (
          <p key={paraIndex} className="mb-2">
            {processTextWithFormatting(paragraph).map((part, partIndex) => {
              if (part.type === 'bold') {
                wordCounter++;
                return (
                  <AnimatedWord
                    key={`bold-${paraIndex}-${partIndex}`}
                    word={part.content}
                    delay={wordCounter * animationDelay}
                    isBold
                    onWordShown={onWordShown}
                    wordIndex={wordCounter}
                    isDark={isDark}
                  />
                );
              } else if (part.type === 'link') {
                wordCounter++;
                return (
                  <AnimatedWord
                    key={`link-${paraIndex}-${partIndex}`}
                    word={part.text}
                    delay={wordCounter * animationDelay}
                    linkUrl={part.url}
                    onWordShown={onWordShown}
                    wordIndex={wordCounter}
                    isDark={isDark}
                  />
                );
              } else {
                // Plain text
                return part.content
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((word, wIndex) => {
                    wordCounter++;
                    return (
                      <AnimatedWord
                        key={`text-${paraIndex}-${partIndex}-${wIndex}`}
                        word={word}
                        delay={wordCounter * animationDelay}
                        onWordShown={onWordShown}
                        wordIndex={wordCounter}
                        isDark={isDark}
                      />
                    );
                  });
              }
            })}
          </p>
        ))}
      </div>
    );
  };
  
  // Message component
  const Message = ({
    message,
    showAvatar,
    onAnimationComplete,
    onWordShown,
    isDark,
  }) => {
    // For image previews
    const [previewStates, setPreviewStates] = useState({});
    const [imagesLoadingCount, setImagesLoadingCount] = useState(0);
    const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  
    const isArrayContent = Array.isArray(message.content.content);
    const hasImageContent = message.content.type === 'mixed_content';
  
    // Construct array of parts if needed
    let contentArray = [];
    if (isArrayContent) {
      contentArray = message.content.content;
    } else if (hasImageContent && !isArrayContent) {
      contentArray = [message.content.content];
    }
  
    // Count how many images we have
    useEffect(() => {
      if (contentArray.length) {
        let totalImages = 0;
        contentArray.forEach((part) => {
          if (part.type === 'image') {
            totalImages++;
          }
        });
        setImagesLoadingCount(totalImages);
        setImagesLoadedCount(0);
      }
    }, [contentArray]);
  
    const allImagesLoaded =
      imagesLoadingCount === 0 || imagesLoadedCount === imagesLoadingCount;
  
    const handleImageLoad = () => {
      setImagesLoadedCount((prev) => prev + 1);
    };
  
    if (message.type === 'user') {
      // User message bubble
      return (
        <div
          className={`rounded-2xl py-2 px-3 inline-block max-w-[90%] text-base md:text-base ${
            isDark ? 'bg-[#252525] text-white' : 'bg-gray-100 text-gray-900'
          }`}
        >
          {message.content.content}
        </div>
      );
    }
  
    // Assistant (or system) message
    return (
      <div className="flex items-start gap-3 group">
        {showAvatar && (
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="/9edcdf8d-d69d-402d-9c0b-e43646659ea6.jpg"
              loading="eager"
              alt="Ferdinand"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {!showAvatar && <div className="w-8" />}
        <div className="flex-1 leading-relaxed min-w-0 pt-1 text-base md:text-base">
          {isArrayContent || hasImageContent ? (
            <div className="space-y-4">
              {contentArray.map((part, index) => {
                if (!part.type || part.type === 'text') {
                  // Text chunk
                  return (
                    <TextMessage
                      key={`text-${index}`}
                      text={typeof part === 'string' ? part : part.content}
                      onAnimationComplete={
                        index === contentArray.length - 1 ? onAnimationComplete : undefined
                      }
                      onWordShown={onWordShown}
                      isDark={isDark}
                      waitForAllImagesLoaded={true}
                      allImagesLoaded={allImagesLoaded && index === contentArray.length - 1}
                    />
                  );
                } else if (part.type === 'image') {
                  // Image chunk
                  const imageSrc = `${API_URL}${part.content}`;
                  return (
                    <div className="my-4" key={`img-${index}`}>
                      <img
                        src={imageSrc}
                        alt="Content visualization"
                        className={`max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity border-[1px] ${
                          isDark ? 'border-gray-200' : 'border-gray-200'
                        }`}
                        style={{ maxHeight: '240px' }}
                        onClick={() =>
                          setPreviewStates((prev) => ({
                            ...prev,
                            [index]: true,
                          }))
                        }
                        onLoad={() => {
                          handleImageLoad();
                          // If only images or if last chunk, maybe call onAnimationComplete
                          if (index === contentArray.length - 1) {
                            if (imagesLoadedCount + 1 === imagesLoadingCount) {
                              onAnimationComplete?.();
                            }
                          }
                        }}
                        onError={(e) => {
                          console.error('Image failed to load:', e.target.src);
                          handleImageLoad();
                          e.target.onerror = null;
                          if (index === contentArray.length - 1) {
                            if (imagesLoadedCount + 1 === imagesLoadingCount) {
                              onAnimationComplete?.();
                            }
                          }
                        }}
                      />
                      {previewStates[index] && (
                        <Preview
                          src={imageSrc}
                          isOpen={previewStates[index]}
                          onClose={() =>
                            setPreviewStates((prev) => ({
                              ...prev,
                              [index]: false,
                            }))
                          }
                          name={part.content.split('/').pop()}
                        />
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            // A simple text message
            <TextMessage
              text={message.content.content}
              onAnimationComplete={onAnimationComplete}
              onWordShown={onWordShown}
              isDark={isDark}
              waitForAllImagesLoaded={false}
              allImagesLoaded
            />
          )}
        </div>
      </div>
    );
  };
  
  // Helper function to format messages for the LLM
  function buildOpenAIMessages(messages) {
    return messages.flatMap((msg) => {
      // If it’s an assistant message with array-of-images or mixed content, skip it
      if (
        msg.type === 'assistant' &&
        Array.isArray(msg.content.content)
      ) {
        return [];
      }
  
      return {
        role: msg.type === 'user' ? 'user' : 'assistant',
        content:
          typeof msg.content.content === 'string'
            ? msg.content.content
            : JSON.stringify(msg.content.content),
      };
    });
  }
  
  // Main Search component
  const Search = forwardRef(({ isDark, ...props }, ref) => {
    // State
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isChatActive, setIsChatActive] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [userScrolled, setUserScrolled] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
  
    // New limit-related state
    const [showBanner, setShowBanner] = useState(false);
    const { isLimited, chatCount, incrementCount, maxChats } = useChatLimit(50);
  
    // Refs
    const chatEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);
  
    // Expose handleSubmit to parent
    useImperativeHandle(ref, () => ({
      handleSubmit: (msg) => handleSubmit(msg),
    }));
  
    // Quick action buttons
    const quickActions = [
      {
        label: 'About me',
        prompt: 'Do an introduction about yourself. Say when you were born. Say what you aspire to be. Say you are looking for an internship.',
      },
      {
        label: 'Skills',
        prompt: 'What are your technical skills and expertise in programming and machine learning?',
      },
      {
        label: 'Projects',
        prompt: 'Tell me about your projects, showcase only the names, and ask me which I’d like to hear more about.',
      },
      {
        label: 'Education',
        prompt: 'What is your educational background?',
      },
      {
        label: 'Contact',
        prompt: 'How can someone get in touch with you?',
      },
    ];
  
    // Detect user scrolling
    useEffect(() => {
      const container = chatContainerRef.current;
      if (!container) return;
  
      const handleScroll = () => {
        if (!isAnimating) {
          setUserScrolled(true);
        }
      };
  
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }, [isAnimating]);
  
    // Word-by-word auto-scroll for assistant messages
    const handleWordShown = useCallback(
      (element) => {
        if (!chatContainerRef.current || !element || userScrolled) return;
        const container = chatContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
  
        if (elementRect.bottom > containerRect.bottom) {
          const scrollAmount = elementRect.bottom - containerRect.bottom + 24;
          container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
      },
      [userScrolled]
    );
  
    // Add message to chat
    const addMessage = async (message) => {
      setUserScrolled(false);
  
      return new Promise((resolve) => {
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
  
    // Decide if we show avatar
    const shouldShowAvatar = (index, messagesArr) => {
      const msg = messagesArr[index];
      if (msg.type === 'user') return false;
      if (msg.type === 'assistant' && index === 0) return true;
      if (index > 0) {
        const prevMessage = messagesArr[index - 1];
        return prevMessage.type === 'user';
      }
      return false;
    };
  
    // Quick action handler
    const handleQuickAction = async (action) => {
      if (!incrementCount()) {
        setShowBanner(true);
        return;
      }
  
      setIsAnimating(true);
      setIsChatActive(true);
      setUserScrolled(false);
      setIsThinking(true);
  
      const userMsg = {
        type: 'user',
        content: { content: action.label, isHTML: false },
      };
      setMessages((prev) => [...prev, userMsg]);
  
      // Scroll to user’s message
      setTimeout(() => {
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
  
      try {
        const openAIMessages = buildOpenAIMessages([...messages, userMsg]);
        const finalPayload = [
          ...openAIMessages,
          { role: 'user', content: action.prompt },
        ];
  
        const response = await fetch(`${API_URL}/api/qa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: finalPayload }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to get answer from API');
        }
  
        const modelResponse = await response.json();
        setIsThinking(false);
  
        await addMessage({
          type: 'assistant',
          content: {
            content: modelResponse.content,
            isHTML: false,
            type: modelResponse.type,
          },
          label: action.label,
        });
      } catch (error) {
        console.error('Error in quick action:', error);
        setIsThinking(false);
        await addMessage({
          type: 'assistant',
          content: {
            content:
              'I apologize, but I encountered an issue. Please try again or email me directly.',
            isHTML: false,
          },
          label: 'ErrorResponse',
        });
      }
    };
  
    // Handle user message submission
    const handleSubmit = async (msg) => {
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
  
      const newUserMessage = {
        type: 'user',
        content: { content: userMessage, isHTML: false },
      };
      setMessages((prev) => [...prev, newUserMessage]);
      setInputValue('');
  
      setTimeout(() => {
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
  
      try {
        const openAIMessages = buildOpenAIMessages([...messages, newUserMessage]);
        const response = await fetch(`${API_URL}/api/qa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: openAIMessages }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to get answer from API');
        }
  
        const modelResponse = await response.json();
        setIsThinking(false);
  
        await addMessage({
          type: 'assistant',
          content: {
            content: modelResponse.content,
            isHTML: false,
            type: modelResponse.type || 'text',
          },
        });
      } catch (error) {
        console.error('Error in conversation:', error);
        setIsThinking(false);
        await addMessage({
          type: 'assistant',
          content: {
            content: 'I apologize, but I encountered an issue. Please try again later.',
            isHTML: false,
          },
        });
      }
    };
  
    // Handle "Enter" key press
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };
  
    return (
      <section
        className={`h-screen flex flex-col items-center justify-center px-4 md:px-5 ${
          isDark ? 'bg-black' : 'bg-white'
        }`}
      >
        <div className="max-w-3xl mx-auto w-full">
          {/* Show at the top (above "Hi, I'm Ferdinand") if isLimited */}
          {isLimited && (
            <p
              className={`
              text-sm mb-2 text-center
              ${isDark ? 'text-gray-400' : 'text-gray-500'}
            `}
            >
              You've reached your daily chat limit. Please email me instead - ferdinandnat@gmail.com 
            </p>
          )}
  
          {/* Title */}
          <h1
            className={`
            text-3xl md:text-4xl font-normal text-center mb-4 mt-2 md:mb-4 md:mt-2 transition-all duration-300
            ${isChatActive ? 'hidden' : ''}
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}
          >
            Hi, I'm Ferdinand. Ask me anything!
          </h1>
  
          <div className="relative">
            {/* Chat container */}
            <div
              ref={chatContainerRef}
              className={`
              mb-8 transition-all duration-300 ease-out overflow-y-auto
              ${isChatActive ? 'opacity-100 h-[40vh]' : 'opacity-0 h-0'}
            `}
            >
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <Message
                      message={message}
                      showAvatar={shouldShowAvatar(index, messages)}
                      onAnimationComplete={message.onAnimationComplete}
                      onWordShown={handleWordShown}
                      isDark={isDark}
                    />
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <Thinking isDark={isDark} />
                  </div>
                )}
                {/* Anchor for scroll functionality */}
                <div ref={chatEndRef} />
              </div>
            </div>
  
            {/* Input container */}
            <div
              className={`
              relative rounded-xl mb-4 flex items-center border
              ${isDark ? 'bg-black border-[#252525]' : 'bg-white border-gray-200'}
            `}
            >
              <input
                ref={inputRef}
                type="text"
                className={`
                w-full p-2 md:p-3 bg-transparent outline-none placeholder-gray-500 text-base md:text-base
                ${isDark ? 'text-white placeholder-[#A1A1A1]' : 'text-gray-700'}
              `}
                placeholder="Ask Ferdinand..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isThinking || isLimited}
              />
              <button
                onClick={() => handleSubmit()}
                className={`
                p-2 transition-colors
                ${isDark ? 'text-white hover:text-[#A1A1A1]' : 'text-gray-700 hover:text-gray-900'}
              `}
                disabled={isThinking || isLimited}
              >
                <ArrowRight size={20} />
              </button>
            </div>
  
            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className={`
                  px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-sm
                  transition-all duration-300 border
                  ${
                    isDark
                      ? 'bg-black border-[#252525] text-white hover:bg-[#252525]'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                  }
                `}
                  disabled={isThinking || isLimited}
                >
                  {action.label}
                </button>
              ))}
            </div>
  
            {/* Footer text */}
            <p
              className={`text-sm mt-2 text-center ${
                isDark ? 'text-[#A1A1A1]' : 'text-gray-500'
              }`}
            >
              I can make mistakes. Please be more understanding.
            </p>
          </div>
        </div>
      </section>
    );
  });
  
  Search.displayName = 'Search';
  
  export default Search;