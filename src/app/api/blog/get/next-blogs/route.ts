import { getNextBlogs } from "@/controller/blog.controller";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    return getNextBlogs(req);
}