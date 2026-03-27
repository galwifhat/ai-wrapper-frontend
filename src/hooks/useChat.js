// src/hooks/useChat.js
import { useState, useCallback, useRef, useEffect } from "react";
import { useAIStream } from "./useAIStream";

const SYSTEM_PROMPT = {
  role: "system",
  content:
    "You are a helpful, concise AI assistant. Respond in a friendly and informative way.",
};

let _nextId = 1;
function createConversation() {
  return {
    id: _nextId++,
    title: "New Chat",
    messages: [],
    createdAt: new Date().toISOString(),
  };
}

export function useChat() {
  const [conversations, setConversations] = useState([createConversation()]);
  const [activeId, setActiveId] = useState(1);

  const { output, loading, streamChat } = useAIStream();

  // Track which conversation a streaming response belongs to
  const pendingConvId = useRef(null);
  // Snapshot the output so we can commit it when loading flips to false
  const lastOutput = useRef("");

  // Keep lastOutput in sync while streaming
  useEffect(() => {
    if (loading) lastOutput.current = output;
  }, [loading, output]);

  // When streaming ends, commit the final message
  useEffect(() => {
    if (!loading && pendingConvId.current !== null && lastOutput.current) {
      const convId = pendingConvId.current;
      const text = lastOutput.current;
      pendingConvId.current = null;
      lastOutput.current = "";

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: [...c.messages, { role: "assistant", content: text }],
              }
            : c,
        ),
      );
    }
  }, [loading]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const sendMessage = useCallback(
    async (text) => {
      const userMsg = { role: "user", content: text };

      // Optimistically add user message + auto-title first message
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? {
                ...c,
                title:
                  c.messages.length === 0
                    ? text.slice(0, 42) + (text.length > 42 ? "…" : "")
                    : c.title,
                messages: [...c.messages, userMsg],
              }
            : c,
        ),
      );

      pendingConvId.current = activeId;

      const conv = conversations.find((c) => c.id === activeId);
      const history = [...(conv?.messages ?? []), userMsg];
      await streamChat([SYSTEM_PROMPT, ...history]);
    },
    [activeId, conversations, streamChat],
  );

  const newConversation = useCallback(() => {
    const conv = createConversation();
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
  }, []);

  const selectConversation = useCallback((id) => setActiveId(id), []);

  const deleteConversation = useCallback(
    (id) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (next.length === 0) {
          const fresh = createConversation();
          setActiveId(fresh.id);
          return [fresh];
        }
        if (id === activeId) {
          setActiveId(next[0].id);
        }
        return next;
      });
    },
    [activeId],
  );

  return {
    conversations,
    activeConversation,
    activeId,
    // While streaming, expose the live partial text; null otherwise
    streamingOutput: loading ? output : null,
    isStreaming: loading,
    sendMessage,
    newConversation,
    selectConversation,
    deleteConversation,
  };
}
