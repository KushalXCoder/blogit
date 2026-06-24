"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeftIcon } from "@hugeicons/core-free-icons";
import { SaveDraft } from "./save-draft";
import { PublishBlog } from "./publish-blog";

export const BlogNav = () => {
    // Go to the previous page in the browser history
    const handleBack = () => {
        window.history.back();
    };
    return (
        <div className="w-full flex justify-between items-center px-10 pb-3">
            <div
                className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={handleBack}
            >
                <HugeiconsIcon icon={ArrowLeftIcon} className="size-5" />
                <span className="">Back</span>
            </div>
            <div className="flex gap-2">
                <SaveDraft />
                <PublishBlog />
            </div>
        </div>
    )
}