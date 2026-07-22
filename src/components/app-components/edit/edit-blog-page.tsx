"use client";

import { BackNavigation } from "../back-nav";
import { BlogContent } from "../blog/blog-content";
import { useEffect, useState } from "react";
import { blogStore } from "@/store/blog.store";
import Loading from "../blog/loading";
import { UpdateBlog } from "./update-blog";
import { UserBlogData } from "@/lib/types/blog.types";
import { PublishBlog } from "../publish/publish-blog";

type EditBlogPageProps = {
    blogId: string;
    blogData: UserBlogData;
};

export const EditBlogPage = ({
    blogId,
    blogData
} : EditBlogPageProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [publishing, setPublishing] = useState<boolean>(false);
    const { setDetails } = blogStore();

    useEffect(() => {
        setDetails({
            id: blogId,
            title: blogData.title,
            coverImage: blogData.coverImage || "",
            content: blogData.content,
            words: blogData.words,
        })
        setLoading(false);
    }, [blogId, blogData]);

    if(loading) return <Loading />;

    return (
        <div className="min-h-screen flex flex-col border-dashed border-x bg-white pt-2 pb-5">
            <div className="flex justify-between items-center pt-3 pb-4 px-10">
                <BackNavigation />
                <div className="flex gap-3">
                    <UpdateBlog />
                    <PublishBlog loading={publishing} setLoading={setPublishing} />
                </div>
            </div>
            <BlogContent />
        </div>
    )
}