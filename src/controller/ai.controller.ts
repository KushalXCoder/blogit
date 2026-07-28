import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/services/ai.service";

export const generateAiResponse = async (req: NextRequest) => {
  try {
    const { message, title, content } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { message: "Please provide a valid prompt or question." },
        { status: 400 }
      );
    }

    const aiResponse = await generateGeminiContent({
      message: message.trim(),
      blogTitle: title,
      blogContent: content,
    });

    return NextResponse.json({ response: aiResponse }, { status: 200 });
  } catch (error) {
    console.error("Error in AI Assistant Controller:", error);
    const rawMessage = error instanceof Error ? error.message : "Failed to process AI request.";
    const isNetworkError = rawMessage.includes("ENOTFOUND") || rawMessage.includes("fetch failed");

    const message = isNetworkError
      ? "Network Error: Unable to resolve generativelanguage.googleapis.com. Please check your internet connection, VPN, or network settings."
      : rawMessage;

    return NextResponse.json({ message }, { status: 500 });
  }
};
