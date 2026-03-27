import { useState, useCallback } from "react";

export function useAIStream() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const streamChat = useCallback(async (messages) => {
    setLoading(true);
    setOutput("");

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/ai/stream`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      },
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      setOutput((prev) => prev + chunk);
    }

    setLoading(false);
  }, []);

  return { output, loading, streamChat };
}
