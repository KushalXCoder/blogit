"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { publishBlog } from "@/services/blog.service";
import { BlogPlatform } from "@/lib/types/blog.types";
import { SelectedPlatformsData } from "@/lib/types/publish.types";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type PublishButtonProps = {
    blogId: string;
    selectedPlatforms: BlogPlatform[];
    selectedPlatformsData: SelectedPlatformsData;
    published?: string[];
}

export const PublishButton = ({
    blogId,
    selectedPlatforms,
    selectedPlatformsData,
    published = []
}: PublishButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handlePublish = async () => {
        for (const platform of selectedPlatforms) {
            const formData = selectedPlatformsData[platform];
            if (!formData || !formData.title || formData.title.trim() === "") {
                toast.error(`Title cannot be empty for ${platform}`);
                return;
            }
        }

        const devtoForm = selectedPlatformsData.devto;
        if (devtoForm && devtoForm.tagStream) {
            devtoForm.tags = devtoForm.tagStream
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== "")
                .slice(0, 4);
        }

        try {
            setLoading(true);
            const publishingData = await publishBlog(blogId, selectedPlatforms, selectedPlatformsData);
            console.log("Publishing data:", publishingData);
            toast.success("Blog published successfully");
        } catch (error) {
            console.error("Error publishing blog:", error);
            toast.error(error instanceof Error ? error.message : "Failed to publish blog");
        } finally {
            setLoading(false);
        }
    };

    // Simple, clear label
    const hasUpdates = selectedPlatforms.some(p => published.includes(p));
    const hasNew = selectedPlatforms.some(p => !published.includes(p));

    let label = "Publish";
    if (hasUpdates && hasNew) label = "Publish & Update";
    else if (hasUpdates) label = "Update";

    return (
        <Button
            onClick={handlePublish}
            disabled={loading || selectedPlatforms.length === 0}
            size="sm"
        >
            {loading && <Loader2 className="size-3.5 animate-spin mr-1.5" />}
            {loading ? "Publishing…" : label}
        </Button>
    );
};