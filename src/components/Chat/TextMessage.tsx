import type React from "react";
import { useEffect } from "react";
import AnimatedWord from "./AnimatedWord";

interface TextMessageProps {
  text: string;
  onAnimationComplete?: () => void;
  onWordShown?: (index: number) => void;
  isDark?: boolean;
  waitForAllImagesLoaded?: boolean;
  allImagesLoaded?: boolean;
}

const TextMessage: React.FC<TextMessageProps> = ({
  text,
  onAnimationComplete,
  onWordShown,
  isDark,
  waitForAllImagesLoaded = false,
  allImagesLoaded = true,
}) => {
  const animationDelay = 0.035;

  const preprocessText = (rawText: string) => {
    return rawText
      .replace(/\r\n|\r/g, "\n")
      .replace(/:\s*(\d+\.)/g, ":\n$1")
      .replace(/\.\s+(\d+\.)/g, ".\n$1")
      .trim();
  };

  const processTextWithFormatting = (rawText: string) => {
    const parts = [];
    let currentIndex = 0;

    const patterns = {
      bold: /\*\*([^*]+)\*\*/g,
      link: /\[([^\]]+)\]$$([^)]+)$$/g,
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

      if (earliestMatch.index > currentIndex) {
        parts.push({
          type: "text",
          content: rawText.slice(currentIndex, earliestMatch.index),
        });
      }

      if (matchType === "bold") {
        parts.push({
          type: "bold",
          content: earliestMatch[1].trim(),
        });
      } else if (matchType === "link") {
        let linkUrl = earliestMatch[2] || "";
        linkUrl = linkUrl.replace(/\s+/g, "");
        if (linkUrl.startsWith("//")) {
          linkUrl = "https:" + linkUrl;
        }
        parts.push({
          type: "link",
          text: earliestMatch[1].trim(),
          url: linkUrl,
        });
      }

      currentIndex = earliestMatch.index + earliestMatch[0].length;
    }

    if (currentIndex < rawText.length) {
      parts.push({
        type: "text",
        content: rawText.slice(currentIndex),
      });
    }

    return parts;
  };

  const paragraphs = preprocessText(text)
    .split("\n")
    .filter((para) => para.trim());

  const totalWords = paragraphs.reduce((count, para) => {
    return count + para.split(" ").filter(Boolean).length;
  }, 0);

  useEffect(() => {
    if (waitForAllImagesLoaded && !allImagesLoaded) {
      return;
    }
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, totalWords * animationDelay * 1000 + 400);

    return () => clearTimeout(timer);
  }, [
    totalWords,
    onAnimationComplete,
    waitForAllImagesLoaded,
    allImagesLoaded,
  ]);

  let wordCounter = 0;

  return (
    <div className={`text-base ${isDark ? "text-white" : "text-gray-900"}`}>
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
            if (part.type === "bold") {
              wordCounter++;
              return part.content ? ( // Ensure content is not undefined
                <AnimatedWord
                  key={`bold-${paraIndex}-${partIndex}`}
                  word={part.content}
                  delay={wordCounter * animationDelay}
                  isBold
                  onWordShown={onWordShown}
                  wordIndex={wordCounter}
                  isDark={isDark}
                />
              ) : null;
            } else if (part.type === "link") {
              wordCounter++;
              return part.text ? (
                <AnimatedWord
                  key={`link-${paraIndex}-${partIndex}`}
                  word={part.text}
                  delay={wordCounter * animationDelay}
                  linkUrl={part.url}
                  onWordShown={onWordShown}
                  wordIndex={wordCounter}
                  isDark={isDark}
                />
              ) : null;
            } else {
              return part.content
                ?.split(/\s+/)
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

export default TextMessage;
