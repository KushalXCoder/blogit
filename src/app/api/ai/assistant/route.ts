import { generateAiResponse } from "@/controller/ai.controller";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  return generateAiResponse(req);
};
