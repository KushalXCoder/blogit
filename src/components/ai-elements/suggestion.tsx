"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuggestionListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SuggestionList = React.forwardRef<HTMLDivElement, SuggestionListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-1.5 overflow-x-auto no-scrollbar", className)}
      {...props}
    >
      {children}
    </div>
  )
);
SuggestionList.displayName = "SuggestionList";

interface SuggestionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Suggestion = React.forwardRef<HTMLButtonElement, SuggestionProps>(
  ({ label, className, disabled, ...props }, ref) => (
    <Button
      ref={ref}
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled}
      className={cn(
        "shrink-0 text-xs h-7 px-3 rounded-full font-normal",
        className
      )}
      {...props}
    >
      {label}
    </Button>
  )
);
Suggestion.displayName = "Suggestion";
