"use client";

import { SaveDraft } from "./save-draft";
import { PublishBlog } from "./publish-blog";
import { BackNavigation } from "../back-nav";
import { useState } from "react";

export const BlogNav = () => {
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <div className="sticky top-0 bg-white z-10 w-full flex justify-between items-center px-10 py-3">
            <BackNavigation />
            <div className="flex gap-2">
                <SaveDraft loading={loading} setLoading={setLoading} />
                <PublishBlog loading={loading} setLoading={setLoading} />
            </div>
        </div>
    )
}