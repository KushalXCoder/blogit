"use client";

import React from "react";
import { ConversationEmptyState } from "@/components/ai-elements/conversation";
import { Sparkles } from "lucide-react";
import { AI_QUICK_CARDS } from "@/lib/constants/ai.constants";

type AiChatEmptyStateProps = {
  onSelectPrompt: (prompt: string) => void;
};

export const AiChatEmptyState = ({ onSelectPrompt }: AiChatEmptyStateProps) => {
  return (
    <ConversationEmptyState className="w-full flex flex-col items-center justify-center my-auto p-0">
      <div className="flex flex-col items-center text-center gap-1.5 mb-6">
        <div className="p-2.5 rounded-full bg-secondary/80 border border-border/60 mb-1">
          <Sparkles className="size-4 text-foreground stroke-[1.75]" />
        </div>
        <h3 className="font-semibold text-sm text-foreground tracking-tight">How can I help with your post?</h3>
        <p className="text-xs text-muted-foreground max-w-[260px] leading-relaxed">
          Select a quick prompt below or type your custom query.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 w-full max-w-xs text-left">
        {AI_QUICK_CARDS.map((card, i) => {
          const IconComponent = card.icon;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectPrompt(card.prompt)}
              className="flex items-center gap-3 p-2.5 rounded-lg border border-border/70 bg-white dark:bg-card hover:bg-accent/60 hover:border-border transition-colors group text-left cursor-pointer shadow-xs"
            >
              <div className="p-1.5 rounded-md bg-secondary text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                <IconComponent className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-none">
                  {card.title}
                </p>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-1">
                  {card.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </ConversationEmptyState>
  );
};
