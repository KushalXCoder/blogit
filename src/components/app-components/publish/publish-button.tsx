"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { publishBlog } from "@/services/blog.service";
import { BlogPlatform } from "@/lib/types/blog.types";
import { DevToFormState, HashnodeFormState } from "@/lib/types/platform.types";

import { SelectedPlatformsData } from "@/lib/types/publish.types";

type PublishButtonProps = {
    blogId: string;
    selectedPlatforms: BlogPlatform[];
    selectedPlatformsData: SelectedPlatformsData;
}

export const PublishButton = ({
    blogId,
    selectedPlatforms,
    selectedPlatformsData
} : PublishButtonProps) => {
    const handlePublish = async () => {
        // Dynamic title check across all selected platforms
        for (const platform of selectedPlatforms) {
            const formData = selectedPlatformsData[platform];
            if (!formData || !formData.title || formData.title.trim() === "") {
                toast.error(`Title cannot be empty for ${platform}`);
                return;
            }
        }

        // Platform-specific preprocessing (e.g. devto tagStream)
        const devtoForm = selectedPlatformsData.devto;
        if (devtoForm && devtoForm.tagStream) {
            devtoForm.tags = devtoForm.tagStream
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== "")
                .slice(0, 4);
        }

        try {
            const publishingData = await publishBlog(blogId, selectedPlatforms, selectedPlatformsData);
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