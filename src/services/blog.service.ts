// All the blog related controllers will be here

import { ApiResponse } from "@/lib/types/api.types";
import { BlogData, UserBlogData } from "@/lib/types/blog.types";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/api";

type UpdateBlogData = BlogData & {
    blogId: string;
};

export const saveDraft = async ({
    title,
    coverImage,
    content,
    words
} : BlogData) => {
    const res = await fetch("/api/blog/save-draft", {
        method: "POST",
        body: JSON.stringify({ title, coverImage, content, words }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    if(!res.ok) {
        console.log(res);
        throw new Error(data.message || "Failed to save draft");
    }

    return data;
}

// Service to get all blogs for the user
export const getAllBlogs = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/blog/get-all-blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    });

    const blogsRes : ApiResponse<UserBlogData[]> = await res.json();
    if(!res.ok) {
        throw new Error("Failed to fetch blogs");
    }

    return blogsRes.data;
}

// Service to get a single blog by its ID
export const getBlog = async (blogId: string) => {
    const res = await fetch(`${BASE_URL}/blog/get-blog`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId }),
    });

    const blogRes : ApiResponse<UserBlogData> = await res.json();
    if(!res.ok) {
        throw new Error("Failed to fetch blog");
    }

    return blogRes.data;
}

export const updateBlog = async ({
    blogId,
    title,
    coverImage,
    content,
    words
} : UpdateBlogData) => {
    const res = await fetch("/api/blog/update", {
        method: "PUT",
        body: JSON.stringify({ blogId, title, coverImage, content, words }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const updateRes : ApiResponse<Boolean> = await res.json();
    if(!res.ok) {
        throw new Error(updateRes.message || "Failed to update blog");
    }

    return updateRes.data;
}