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
  MessageResponse,
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

import { fetchAiAssistantResponse } from "@/services/client/ai.client";

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
      const responseText = await fetchAiAssistantResponse(text.trim(), title, content);

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: responseText },
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
    <div className="h-full max-h-full flex flex-col bg-white dark:bg-card overflow-hidden">
      {/* Header */}
      <div className="shrink-0">
        <AiChatHeader />
      </div>

      {/* Suggestion Bar */}
      <div className="px-5 py-3 border-b border-border/50 shrink-0">
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
        <ConversationContent className={cn("gap-5 p-5 pb-8", messages.length === 0 && "h-full justify-center items-center")}>
          {messages.length === 0 && !loading && (
            <AiChatEmptyState onSelectPrompt={send} />
          )}

          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent className={cn(m.role === "assistant" && "bg-transparent p-0 shadow-none border-0")}>
                {m.role === "assistant" ? (
                  <MessageResponse content={m.content} />
                ) : (
                  <span className="whitespace-pre-wrap text-xs">{m.content}</span>
                )}
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
      <div className="p-4 border-t border-border/80 shrink-0 bg-white dark:bg-card z-10">
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