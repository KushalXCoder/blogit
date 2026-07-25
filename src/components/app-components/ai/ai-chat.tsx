"use client";

import React, { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageActions,
  MessageCopyAction,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { SuggestionList, Suggestion } from "@/components/ai-elements/suggestion";
import { AiChatHeader } from "./ai-chat-header";
import { AiChatEmptyState } from "./ai-chat-empty-state";
import { blogStore } from "@/store/blog.store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatItem } from "@/lib/types/ai.types";
import { AI_SUGGESTIONS } from "@/lib/constants/ai.constants";

export const AiChat = () => {
  const { title, content } = blogStore();
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatItem = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), title, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to generate response.");

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.response },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(msg);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: `Error: ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-card">
      {/* Header */}
      <AiChatHeader />

      {/* Suggestion Bar */}
      <div className="px-5 py-3 border-b border-border/50">
        <SuggestionList>
          {AI_SUGGESTIONS.map((s, i) => (
            <Suggestion
              key={i}
              label={s.label}
              disabled={loading}
              onClick={() => send(s.prompt)}
            />
          ))}
        </SuggestionList>
      </div>

      {/* Conversation Window */}
      <Conversation className="flex-1 min-h-0">
        <ConversationContent className={cn("gap-5 p-5", messages.length === 0 && "h-full justify-center items-center")}>
          {messages.length === 0 && !loading && (
            <AiChatEmptyState onSelectPrompt={send} />
          )}

          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent className="whitespace-pre-wrap text-xs leading-relaxed">
                {m.content}
              </MessageContent>
              {m.role === "assistant" && (
                <MessageActions>
                  <MessageCopyAction content={m.content} />
                </MessageActions>
              )}
            </Message>
          ))}

          {loading && (
            <Message from="assistant">
              <MessageContent className="flex items-center gap-2 text-muted-foreground text-xs">
                <Loader2 className="size-3.5 animate-spin" />
                Generating…
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Prompt Input */}
      <div className="p-4 border-t border-border/80">
        <PromptInput onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your blog…"
          />
          <PromptInputSubmit loading={loading} disabled={!input.trim()} />
        </PromptInput>
      </div>
    </div>
  );
};