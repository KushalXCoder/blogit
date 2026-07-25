import { LucideIcon } from "lucide-react";

export type ChatRole = "user" | "assistant" | "system";

export type ChatItem = {
  id: string;
  role: ChatRole;
  content: string;
};

export type AiSuggestion = {
  label: string;
  prompt: string;
};

export type AiQuickCard = {
  title: string;
  description: string;
  prompt: string;
  icon: LucideIcon;
};
