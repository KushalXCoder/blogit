import { connectDb } from "@/lib/drivers/db";
import { BlogPlatform } from "@/lib/types/blog.types";
import { DevToFormState, HashnodeFormState } from "@/lib/types/form.types";
import { IntegrationDataType } from "@/lib/types/global.types";
import { User } from "@/models/user.model";

type PublishInput = {
    userId: string;
    devtoForm: DevToFormState;
    hashnodeForm: HashnodeFormState;
};

type PublishResult = {
    platform: BlogPlatform;
    success: boolean;
    message: string;
};

type PlatformPublisher = (input: PublishInput) => Promise<PublishResult>;

export const publishToDevto = async (userId: string, devtoForm: DevToFormState): Promise<PublishResult> => {
    if (!devtoForm.title.trim() || !devtoForm.body_markdown.trim()) {
        throw new Error("Dev.to title and content are required");
    }
    
    await connectDb();

    const user = await User.findById(userId);
    if(!user) {
        throw new Error("User doesn't exist.");
    }

    const userDevtoAcc = user.connections.find((c: IntegrationDataType) => c.platform === "devto");
    if(!userDevtoAcc || !userDevtoAcc.apiKey) {
        throw new Error("You haven't connected your Dev.to account. Please connect your account first.");
    }

    const userDevtoKey = userDevtoAcc.apiKey;

    const res = await fetch("https://dev.to/api/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": userDevtoKey,
        },
        body: JSON.stringify({ article: devtoForm }),
    });

    const data = await res.json();
    if(!res.ok) {
        throw new Error(data.error || "Failed to publish on Dev.to");
    }

    return {
        platform: "devto",
        success: true,
        message: "Ready to publish on Dev.to",
    };
};

export const publishToHashnode = async (userId: string, hashnodeForm: HashnodeFormState): Promise<PublishResult> => {
    if (!hashnodeForm.title.trim() || !hashnodeForm.markdown.trim()) {
        throw new Error("Hashnode title and content are required");
    }

    // TODO: Replace with real Hashnode API integration.
    return {
        platform: "hashnode",
        success: true,
        message: "Ready to publish on Hashnode",
    };
};

export const platformPublishers: Record<BlogPlatform, PlatformPublisher> = {
    devto: ({ userId, devtoForm }) => publishToDevto(userId, devtoForm),
    hashnode: ({ userId, hashnodeForm }) => publishToHashnode(userId, hashnodeForm),
};