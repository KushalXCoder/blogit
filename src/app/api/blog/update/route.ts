import { updateBlog } from "@/controller/blog.controller";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
    return updateBlog(req);
}