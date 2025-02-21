interface MessageContent {
    content: string | unknown[]
  }
  
  interface Message {
    type: "user" | "assistant"
    content: MessageContent
  }
  
  export function buildOpenAIMessages(messages: Message[]): { role: "user" | "assistant"; content: string }[] {
    return messages.flatMap((msg) => {
      if (msg.type === "assistant" && Array.isArray(msg.content.content)) {
        return []
      }
  
      return {
        role: msg.type === "user" ? "user" : "assistant",
        content: typeof msg.content.content === "string" ? msg.content.content : JSON.stringify(msg.content.content),
      }
    })
  }
  
  