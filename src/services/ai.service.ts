import { ApiResponse } from "@/lib/types/api.types";

export type BlogAiMessage = {
  role: "user" | "model";
  parts: Array<{ text: string }>;
};

export type GenerateAiOptions = {
  message: string;
  blogTitle?: string;
  blogContent?: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
};

/**
 * Service to interact with Google Gemini API for technical blog assistance & SEO optimization.
 */
export async function generateGeminiContent(options: GenerateAiOptions): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables (.env.local).");
  }

  const { message, blogTitle, blogContent, history = [] } = options;

  const systemInstruction = `You are Blog-It AI Assistant, a world-class developer advocate and technical editor.
Your goal is to help software developers write, optimize, format, and review technical articles for platforms like Dev.to, Medium, and GitHub.
Provide clear, actionable, high-quality responses formatted in Markdown.

Current Article Context:
- Title: "${blogTitle || "Untitled"}"
- Content Snippet: ${blogContent ? `"${blogContent.slice(0, 2500)}..."` : "None provided"}`;

  // Format chat history for Gemini API
  const contents: BlogAiMessage[] = [
    {
      role: "user",
      parts: [{ text: `${systemInstruction}\n\nUser Question/Instruction:\n${message}` }],
    },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contents }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Gemini API Error Response:", data);
    throw new Error(data.error?.message || "Failed to generate response from Gemini API.");
  }

  const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText) {
    throw new Error("Empty response received from Gemini API.");
  }

  return responseText;
}
