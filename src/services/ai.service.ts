import { GoogleGenAI } from "@google/genai";

export type GenerateAiOptions = {
  message: string;
  blogTitle?: string;
  blogContent?: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
};

/**
 * Service to interact with Google Gen AI SDK (@google/genai) for technical blog assistance & SEO optimization.
 * Uses the gemma-4-31b model.
 */
export async function generateGeminiContent(options: GenerateAiOptions): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables (.env.local).");
  }

  const { message, blogTitle, blogContent } = options;

  const systemInstruction = `You are Blog-It AI Assistant, a concise technical editor for software developers.

Behavior Rules:
- Match the user's message length and intent.
- For short greetings (e.g., "Hi", "Hello", "Hey"), reply warmly in 1-2 concise sentences without dumping long feature lists.
- For technical requests, titles, or outlines, provide clear, high-quality, actionable responses in clean Markdown.
- Do NOT use LaTeX math syntax or symbols like $\\rightarrow$. Use plain text.

Current Article Context:
- Title: "${blogTitle || "Untitled"}"
- Content Snippet: ${blogContent ? `"${blogContent.slice(0, 1500)}..."` : "None provided"}`;

  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
  const prompt = `${systemInstruction}\n\nUser Question/Instruction:\n${message}`;

  let response;
  try {
    response = await ai.models.generateContent({
      model: "gemma-4-31b-it",
      contents: prompt,
    });
  } catch (err) {
    console.warn("Primary model failed, falling back to gemini-2.0-flash:", err);
    response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
  }

  const responseText = response.text;

  if (!responseText) {
    throw new Error("Empty response received from AI model.");
  }

  return responseText;
}
