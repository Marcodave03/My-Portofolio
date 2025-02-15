import type React from "react";
import { useState, useEffect } from "react";
import Preview from "./Preview";
import TextMessage from "./TextMessage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface MessageContent {
  type: "text" | "image" | "mixed_content";
  content: string | { type: string; content: string }[];
}

interface MessageProps {
  message: {
    type: "user" | "assistant";
    content: MessageContent;
  };
  showAvatar: boolean;
  onAnimationComplete?: () => void;
  isDark: boolean;
}

const Message: React.FC<MessageProps> = ({
  message,
  showAvatar,
  onAnimationComplete,
  isDark,
}) => {
  const [previewStates, setPreviewStates] = useState<{ [key: number]: boolean }>({});
  const [imagesLoadingCount, setImagesLoadingCount] = useState(0);
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

  const isArrayContent = Array.isArray(message.content.content);
  const hasImageContent = message.content.type === "mixed_content";

  let contentArray: { type: string; content: string }[] = [];

  if (isArrayContent) {
    contentArray = message.content.content as { type: string; content: string }[];
  } else if (hasImageContent) {
    contentArray = [{ type: "text", content: message.content.content as string }];
  }

  useEffect(() => {
    if (contentArray.length) {
      let totalImages = 0;
      contentArray.forEach((part) => {
        if (part.type === "image") {
          totalImages++;
        }
      });
      setImagesLoadingCount(totalImages);
      setImagesLoadedCount(0);
    }
  }, [message.content.content]);

  const allImagesLoaded = imagesLoadingCount === 0 || imagesLoadedCount === imagesLoadingCount;

  const handleImageLoad = () => {
    setImagesLoadedCount((prev) => prev + 1);
  };

  if (message.type === "user") {
    return (
      <div
        className={`rounded-2xl py-2 px-3 inline-block max-w-[90%] text-base md:text-base ${
          isDark ? "bg-[#252525] text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {typeof message.content.content === "string" ? message.content.content : ""}
      </div>
    );
  }

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
              if (part.type === "text") {
                return (
                  <TextMessage
                    key={`text-${index}`}
                    text={part.content}
                    onAnimationComplete={index === contentArray.length - 1 ? onAnimationComplete : undefined}
                    // onWordShown={onWordShown}
                    isDark={isDark}
                    waitForAllImagesLoaded={true}
                    allImagesLoaded={allImagesLoaded && index === contentArray.length - 1}
                  />
                );
              } else if (part.type === "image") {
                const imageSrc = `${API_URL}${part.content}`;
                return (
                  <div className="my-4" key={`img-${index}`}>
                    <img
                      src={imageSrc || "/placeholder.svg"}
                      alt="Content visualization"
                      className={`max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity border-[1px] ${
                        isDark ? "border-gray-200" : "border-gray-200"
                      }`}
                      style={{ maxHeight: "240px" }}
                      onClick={() =>
                        setPreviewStates((prev) => ({
                          ...prev,
                          [index]: true,
                        }))
                      }
                      onLoad={() => {
                        handleImageLoad();
                        if (index === contentArray.length - 1) {
                          if (imagesLoadedCount + 1 === imagesLoadingCount) {
                            onAnimationComplete?.();
                          }
                        }
                      }}
                      onError={(e) => {
                        console.error("Image failed to load:", e.currentTarget.src);
                        handleImageLoad();
                        e.currentTarget.onerror = null;
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
                        name={part.content.split("/").pop()!}
                      />
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <TextMessage
            text={message.content.content as string}
            onAnimationComplete={onAnimationComplete}
            // onWordShown={onWordShown}
            isDark={isDark}
            waitForAllImagesLoaded={false}
            allImagesLoaded
          />
        )}
      </div>
    </div>
  );
};

export default Message;
