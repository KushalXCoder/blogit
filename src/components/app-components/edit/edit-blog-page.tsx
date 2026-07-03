"use client";

import { BackNavigation } from "../back-nav";
import { BlogContent } from "../blog/blog-content";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getBlog } from "@/services/blog.service";
import { BlogStore } from "@/store/blog.store";
import Loading from "../blog/loading";
import { UpdateBlog } from "./update-blog";

type EditBlogPageProps = {
    blogId: string;
};

export const EditBlogPage = ({
    blogId
} : EditBlogPageProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const { setDetails } = BlogStore();

    const getBlogData = async (blogId: string) => {
        try {
            const res = await getBlog(blogId);
            if(res) {
                setDetails({
                    title: res.title,
                    coverImage: res.coverImage,
                    content: res.content,
                    words: res.words,
                });
            }
            console.log("Blog data fetched successfully:", res);
        } catch (error) {
            console.error("Error fetching blog data:", error);
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBlogData(blogId);    
    }, [blogId]);

    if(loading) return <Loading />;

    return (
        <div className="min-h-screen flex flex-col border-dashed border-x bg-white pt-2 pb-5">
            <div className="flex justify-between items-center pt-3 pb-4 px-10">
                <BackNavigation />
                <UpdateBlog blogId={blogId} />
            </div>
            <BlogContent />
        </div>
    )
}