import { deleteBlog } from "@/controller/blog.controller";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest) => {
    return deleteBlog(req);
}