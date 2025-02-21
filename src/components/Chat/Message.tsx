import type React from "react";
import { useState, useEffect } from "react";
// import Preview from "./Preview";
// import TextMessage from "./TextMessage";

interface MessageContent {
  type: "text" | "image" | "mixed_content";
  content: string | { type: string; content: string }[];
  isHTML: boolean;
}

interface MessageProps {
  message: {
    type: "user" | "assistant";
    content: MessageContent;
    onAnimationComplete?: () => void;
  };
  showAvatar: boolean;
  isDark: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isDark }) => {


  const renderContent = () => {
    if (Array.isArray(message.content.content)) {
      return message.content.content.map((part, index) => {
        if (part.type === "text") {
          return <p key={index}>{part.content}</p>;
        } else if (part.type === "image") {
          return <img key={index} src={part.content} alt="content" />;
        }
        return null;
      });
    } else if (message.content.isHTML) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: message.content.content as string,
          }}
        />
      );
    } else {
      return <p>{message.content.content}</p>;
    }
  };

  const [,] = useState<{
    [key: number]: boolean;
  }>({});
  // const [imagesLoadingCount, setImagesLoadingCount] = useState(0);
  // const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

  // const isArrayContent = Array.isArray(message.content.content);
  // const hasImageContent = message.content.type === "mixed_content";

  // let contentArray: { type: string; content: string }[] = [];

  // if (isArrayContent) {
  //   contentArray = message.content.content as {
  //     type: string;
  //     content: string;
  //   }[];
  // } else if (hasImageContent) {
  //   contentArray = [
  //     { type: "text", content: message.content.content as string },
  //   ];
  // }

  useEffect(() => {
    // if (contentArray.length) {
    //   let totalImages = 0;
    //   contentArray.forEach((part) => {
    //     if (part.type === "image") {
    //       totalImages++;
    //     }
    //   });
    //   setImagesLoadingCount(totalImages);
    //   setImagesLoadedCount(0);
    // }
  }, [message]); 

  // const allImagesLoaded =
  //   imagesLoadingCount === 0 || imagesLoadedCount === imagesLoadingCount;

  // const handleImageLoad = () => {
  //   setImagesLoadedCount((prev) => prev + 1);
  // };

  const isUser = message.type === "user";
  

  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
      onAnimationEnd={message.onAnimationComplete}
    >
     <div
        className={`max-w-xs p-2 rounded-lg ${
          isUser
            ? "bg-black text-white"
            : isDark
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Message;
