// src/pages/ChatPage.jsx
import { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import Sidebar from "@/components/chat/Sidebar";
import MessageBubble from "@/components/chat/MessageBubble";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  const {
    conversations,
    activeConversation,
    activeId,
    streamingOutput,
    isStreaming,
    sendMessage,
    newConversation,
    selectConversation,
    deleteConversation,
  } = useChat();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages?.length, streamingOutput]);

  const messages = activeConversation?.messages ?? [];
  const isEmpty = messages.length === 0 && !isStreaming;

  return (
    <div className="flex h-full bg-background">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onNew={newConversation}
        onSelect={selectConversation}
        onDelete={deleteConversation}
      />

      <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b bg-background shrink-0">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Bot size={16} className="text-secondary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {activeConversation?.title ?? "New Chat"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isStreaming ? (
                <span className="text-primary">Typing…</span>
              ) : (
                "OpenRouter · AI"
              )}
            </p>
          </div>
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {isEmpty && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Bot size={30} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                How can I help?
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Ask anything. Start a conversation below.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {isStreaming && streamingOutput && (
            <MessageBubble
              role="assistant"
              content={streamingOutput}
              streaming
            />
          )}

          <div ref={bottomRef} />
        </div>

        <ChatInput onSend={sendMessage} disabled={isStreaming} />
      </main>
    </div>
  );
}
