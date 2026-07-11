// This component renders the Update Blog button and handles its logic.

"use client";

import { Button } from "@/components/ui/button"
import { updateBlog } from "@/services/blog.service";
import { blogStore } from "@/store/blog.store";
import { useCreateBlockNote } from "@blocknote/react";
import { toast } from "sonner";

// type UpdateBlogProps = {
//     blogId: string;
// };

export const UpdateBlog = () => {
    const { id, title, coverImage, content, words } = blogStore();

    const handleUpdate = async () => {
        try {
            const updateRes = await updateBlog({ blogId: id, title, coverImage, content, words });
            if(!updateRes) {
                toast.error("Failed to update blog");
                return;
            }
            toast.success("Blog updated successfully");
        } catch (error) {
            console.error("Error updating blog:", error);
            toast(error instanceof Error ? error.message : "An unexpected error occurred");
        }
    }

    return (
        <Button
            variant="outline"
            className="px-5"
            onClick={handleUpdate}
        >
            Save
        </Button>
    )
}