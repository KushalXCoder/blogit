import { NextRequest } from "next/server";
import { getAllBlogs } from "@/controller/blog.controller";

export const POST = async (req: NextRequest) => {
    return getAllBlogs(req);
}