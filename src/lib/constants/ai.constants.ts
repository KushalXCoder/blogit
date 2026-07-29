import { FileText, Search, Share2, CheckCircle2 } from "lucide-react";
import { AiSuggestion, AiQuickCard } from "../types/ai.types";

export const AI_SUGGESTIONS: AiSuggestion[] = [
  { label: "Suggest titles", prompt: "Suggest 5 catchy title options for this blog post." },
  { label: "SEO description", prompt: "Generate a 150-character SEO description for Google." },
  { label: "Twitter thread", prompt: "Convert this blog post into a 5-tweet X/Twitter thread." },
  { label: "Audit readability", prompt: "Perform an SEO & readability audit on this post." },
];

export const AI_QUICK_CARDS: AiQuickCard[] = [
  {
    title: "Catchy Titles",
    description: "Generate 5 headline options tailored for engagement.",
    prompt: "Suggest 5 catchy title options for this blog post.",
    icon: FileText,
  },
  {
    title: "SEO Meta Description",
    description: "Draft a concise 150-character snippet for search engines.",
    prompt: "Generate a 150-character SEO description for Google.",
    icon: Search,
  },
  {
    title: "X / Twitter Thread",
    description: "Convert key points into a multi-tweet social thread.",
    prompt: "Convert this blog post into a 5-tweet X/Twitter thread.",
    icon: Share2,
  },
  {
    title: "Readability & SEO Audit",
    description: "Analyze structure, clarity, and keyword optimization.",
    prompt: "Perform an SEO & readability audit on this post.",
    icon: CheckCircle2,
  },
];
