import { NextRequest } from "next/server";
import { saveBlog } from "@/controller/blog.controller";

export const POST = async (req: NextRequest) => {
    return saveBlog(req);
}