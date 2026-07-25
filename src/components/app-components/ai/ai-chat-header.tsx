"use client";

import React from "react";

export const AiChatHeader = () => {
  return (
    <div className="px-5 py-4 border-b border-border/80">
      <h2 className="text-sm font-semibold tracking-tight">AI Assistant</h2>
      <p className="text-xs text-muted-foreground mt-0.5">
        Powered by Gemini — ask about your post
      </p>
    </div>
  );
};
