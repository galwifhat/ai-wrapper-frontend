// src/components/chat/MessageBubble.jsx
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessageBubble({ role, content, streaming = false }) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isUser ? "bg-primary order-2" : "bg-secondary order-1",
        )}
      >
        {isUser ? (
          <User size={14} className="text-primary-foreground" />
        ) : (
          <Bot size={14} className="text-secondary-foreground" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[70%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words",
          isUser
            ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm order-1"
            : "bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm order-2",
        )}
      >
        {content}
        {streaming && (
          <span className="inline-block w-1.5 h-4 ml-0.5 rounded-sm align-middle animate-pulse bg-current" />
        )}
      </div>
    </div>
  );
}
