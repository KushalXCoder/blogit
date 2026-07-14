"use client";

import { Button } from "@/components/ui/button";
import { DevToFormState, HashnodeFormState } from "@/lib/types/form.types";
import { Platform } from "./components/platform-card";
import { toast } from "sonner";
import { publishBlog } from "@/services/blog.service";

type PublishButtonProps = {
    blogId: string;
    selectedPlatforms: Platform[];
    devtoForm: DevToFormState;
    hashnodeForm: HashnodeFormState;
}

export const PublishButton = ({
    blogId,
    selectedPlatforms,
    devtoForm,
    hashnodeForm
} : PublishButtonProps) => {
    const handlePublish = async () => {
        // Check for title in the selected platforms
        if(selectedPlatforms.includes("devto") && devtoForm.title.trim() === ""
        || selectedPlatforms.includes("hashnode") && hashnodeForm.title.trim() === "") {
            toast.error("Title cannot be empty");
        }

        // Convert string of tags for devto to an array of tags, limited to 4 tags
        if(devtoForm.tagStream) {
            const devtoTagsArray = devtoForm.tagStream.split(",")
              .map(tag => tag.trim())
              .filter(tag => tag !== "")
              .slice(0, 4); // Limit to 4 tags

            devtoForm.tags = devtoTagsArray;
        }

        try {
            const publishingData = await publishBlog(blogId, selectedPlatforms, devtoForm, hashnodeForm);
            console.log("Publishing data:", publishingData);
            toast.success("Blog published successfully");
        } catch (error) {
            console.error("Error publishing blog:", error);
            toast.error(error instanceof Error ? error.message : "Failed to publish blog");
        }
    };
    return (
        <Button onClick={handlePublish}>
            Publish
        </Button>
    )
}