import { connectDb } from "@/lib/drivers/db";
import { Blog } from "@/models/blog.model";
import { UserBlogData } from "@/lib/types/blog.types";

/**
 * Server-only database service functions for Next.js App Router Server Components.
 * Never import this file in Client Components ("use client").
 */

export const getNextBlogsServer = async (userId: string, lastBlogId: string): Promise<UserBlogData[]> => {
    await connectDb();
    const query: Record<string, unknown> = { user: userId };
    if (lastBlogId && lastBlogId !== "first") {
        query._id = { $lt: lastBlogId };
    }
    const blogs = await Blog.find(query)
        .sort({ _id: -1 })
        .limit(10)
        .select("-content")
        .lean();
    return JSON.parse(JSON.stringify(blogs)) as UserBlogData[];
};

export const getAllBlogsServer = async (userId: string): Promise<UserBlogData[]> => {
    await connectDb();
    const blogs = await Blog.find({ user: userId }).select("-content").lean();
    return JSON.parse(JSON.stringify(blogs)) as UserBlogData[];
};

export const getBlogServer = async (blogId: string): Promise<UserBlogData> => {
    await connectDb();
    const blog = await Blog.findById(blogId).lean();
    if (!blog) {
        throw new Error("Failed to fetch blog");
    }
    return JSON.parse(JSON.stringify(blog)) as UserBlogData;
};
