import { NextRequest, NextResponse } from "next/server";
import { generateGeminiContent } from "@/services/ai.service";

export async function POST(req: NextRequest) {
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
    console.error("Error in AI Assistant Route:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process AI request.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
