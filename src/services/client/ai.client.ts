/**
 * Frontend client service to call /api/ai/assistant route.
 */
export async function fetchAiAssistantResponse(
  message: string,
  title?: string,
  content?: string
): Promise<string> {
  const res = await fetch("/api/ai/assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, title, content }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to generate AI response.");
  }

  return data.response;
}
