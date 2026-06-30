"use client";

import { Editor } from "@/components/app-components/blog/editor/dynamic-editor";
import { BlogFooter } from "./blog-footer";
import { BlogStore } from "@/store/blog.store";
import { CoverImage } from "./cover-image";

export const BlogContent = () => {
    const { title, setDetails } = BlogStore();
    return (
        <div className="flex-1 flex flex-col">
            <CoverImage />
            <div className="flex-1 flex flex-col gap-2 pt-5">
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setDetails({ title: e.target.value })}
                    className="px-10 text-3xl font-semibold bg-transparent border-none focus:outline-none"
                />
                <Editor />
                <BlogFooter />
            </div>
        </div>
    )
}