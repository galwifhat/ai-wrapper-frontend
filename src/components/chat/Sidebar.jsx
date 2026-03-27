// src/components/chat/Sidebar.jsx
import { Plus, MessageSquare, Trash2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar({
  conversations,
  activeId,
  onNew,
  onSelect,
  onDelete,
}) {
  return (
    <aside className="w-64 flex flex-col h-full border-r bg-sidebar">
      {/* Brand */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles size={16} className="text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">AI Toolkit</span>
        </div>

        {/* New Chat button */}
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium text-sm"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4">
        <p className="text-xs px-2 mb-2 font-medium uppercase tracking-wider text-muted-foreground">
          History
        </p>

        {conversations.map((conv) => {
          const isActive = conv.id === activeId;
          return (
            <div
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={cn(
                "group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50 text-muted-foreground",
              )}
            >
              <MessageSquare size={14} className="shrink-0" />
              <span className="text-sm flex-1 truncate">{conv.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 rounded p-1 hover:text-destructive"
              >
                <Trash2 size={12} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">Powered by OpenRouter</p>
      </div>
    </aside>
  );
}
