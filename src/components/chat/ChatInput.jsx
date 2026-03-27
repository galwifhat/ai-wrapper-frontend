// src/components/chat/ChatInput.jsx
import { useState, useRef } from "react";
import { Send, Loader2 } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  const handleSend = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
    ref.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <div className="px-6 py-4 border-t bg-background">
      <div className="flex items-end gap-3 px-4 py-3 rounded-2xl border bg-muted/30">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Message… (Enter to send, Shift+Enter for new line)"
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
          style={{ lineHeight: "1.5", minHeight: "24px", maxHeight: "120px" }}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 transition-all disabled:opacity-50 hover:bg-primary/90 active:scale-95"
          aria-label="Send message"
        >
          {disabled ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
        </button>
      </div>

      <p className="text-center text-xs mt-2 text-muted-foreground">
        AI responses may be inaccurate. Verify important information.
      </p>
    </div>
  );
}
