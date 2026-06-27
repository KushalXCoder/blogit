import { NextRequest } from "next/server";
import { getBlog } from "@/controller/blog.controller";

export const POST = (req: NextRequest) => {
    return getBlog(req);
}