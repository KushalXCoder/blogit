import { NextRequest } from "next/server";
import { saveDraft } from "@/controller/blog.controller";

export const POST = async (req: NextRequest) => {
    return saveDraft(req);
}