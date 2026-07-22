import { isUserAuthenticated } from "@/lib/middleware/auth";
import { BlogPlatform } from "@/lib/types/blog.types";
import { SelectedPlatformsData } from "@/lib/types/publish.types";
import { platformPublishers } from "@/services/publish.service";
import { NextRequest, NextResponse } from "next/server";

// Controller to publish blog to selected platforms
export const publishBlog = async (req: NextRequest) => {
    try {
        // Check if user is authenticated
        const auth = await isUserAuthenticated(req);
        if(!auth.authenticated) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Get userId
        const userId = auth.data._id;

        // Get the selected platforms and form data from the request body
        const { blogId, selectedPlatforms, selectedPlatformsData } = await req.json();
        const platforms: BlogPlatform[] = selectedPlatforms;
        const formsData: SelectedPlatformsData = selectedPlatformsData || {};

        if(!blogId || !Array.isArray(platforms) || platforms.length === 0) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        
        // Publish to the selected platforms using the respective publisher functions
        const publishTasks = platforms
            .filter((platform): platform is BlogPlatform => platform in platformPublishers)
            .map((platform) => platformPublishers[platform]({ blogId, userId, formsData }));

        if (publishTasks.length === 0) {
            return NextResponse.json({ message: "No valid platforms selected" }, { status: 400 });
        }

        // Parallely publish to platforms using Promise
        const settled = await Promise.allSettled(publishTasks);
        const data = settled.map((result) => {
            if (result.status === "fulfilled") {
                return result.value;
            }
            return {
                success: false,
                message: result.reason instanceof Error ? result.reason.message : "Failed to publish",
            };
        });

        const hasFailure = data.some((result) => !result.success);
        return NextResponse.json(
            {
                message: hasFailure ? "Published with partial failures" : "Published successfully",
                data,
            },
            { status: hasFailure ? 207 : 200 }
        );

    } catch (error) {
        console.error("Error publishing blog:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}