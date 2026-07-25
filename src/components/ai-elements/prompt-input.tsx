"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptInputProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const PromptInput = React.forwardRef<HTMLFormElement, PromptInputProps>(
  ({ className, children, ...props }, ref) => (
    <form
      ref={ref}
      className={cn(
        "relative flex items-end gap-2 border border-border rounded-lg bg-white dark:bg-card p-2 shadow-xs focus-within:ring-1 focus-within:ring-ring transition-shadow",
        className
      )}
      {...props}
    >
      {children}
    </form>
  )
);
PromptInput.displayName = "PromptInput";

interface PromptInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const PromptInputTextarea = React.forwardRef<HTMLTextAreaElement, PromptInputTextareaProps>(
  ({ className, ...props }, ref) => (
    <Textarea
      ref={ref}
      className={cn(
        "min-h-[40px] max-h-28 resize-none border-0 focus-visible:ring-0 text-sm text-foreground placeholder:text-muted-foreground bg-transparent p-2 no-scrollbar shadow-none",
        className
      )}
      {...props}
    />
  )
);
PromptInputTextarea.displayName = "PromptInputTextarea";

interface PromptInputSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const PromptInputSubmit = React.forwardRef<HTMLButtonElement, PromptInputSubmitProps>(
  ({ className, loading, disabled, ...props }, ref) => (
    <Button
      ref={ref}
      type="submit"
      size="icon"
      disabled={disabled || loading}
      className={cn("size-8 shrink-0 rounded-md", className)}
      {...props}
    >
      <CornerDownLeft className="size-4" />
    </Button>
  )
);
PromptInputSubmit.displayName = "PromptInputSubmit";
