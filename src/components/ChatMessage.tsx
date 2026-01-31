import { Message } from "@/lib/chat"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant"

  return (
    <div
      className={cn(
        "flex gap-3 mb-4 animate-in fade-in-50 slide-in-from-bottom-2",
        isAssistant ? "flex-row" : "flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0",
          isAssistant
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {isAssistant ? "AI" : "You"}
      </div>

      <div
        className={cn(
          "max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl rounded-lg px-4 py-3 break-words",
          isAssistant
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        {isAssistant ? (
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  )
}
