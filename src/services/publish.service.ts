import { connectDb } from "@/lib/drivers/db";
import { BlogPlatform } from "@/lib/types/blog.types";
import { DevToFormState } from "@/lib/types/platform.types";
import { IntegrationDataType } from "@/lib/types/global.types";
import { Blog } from "@/models/blog.model";
import { DevtoPublishConfig } from "@/models/platform.model";
import { PublishConfig } from "@/models/publish-config.model";
import { User } from "@/models/user.model";
import { SelectedPlatformsData } from "@/lib/types/publish.types";

type PublishInput = {
    blogId: string;
    userId: string;
    formsData: SelectedPlatformsData;
};

type PublishResult = {
    platform: BlogPlatform;
    success: boolean;
    message: string;
};

type PlatformPublisher = (input: PublishInput) => Promise<PublishResult>;

export const publishToDevto = async (blogId: string, userId: string, devtoForm: DevToFormState): Promise<PublishResult> => {
    if (!devtoForm.title.trim() || !devtoForm.body_markdown.trim()) {
        throw new Error("Dev.to title and content are required");
    }
    
    await connectDb();

    const user = await User.findById(userId);
    if(!user) {
        throw new Error("User doesn't exist.");
    }

    const blog = await Blog.findById(blogId);
    if(!blog) {
        throw new Error("Blog doen't exist");
    }
    
    const userDevtoAcc = user.connections.find((c: IntegrationDataType) => c.platform === "devto");
    if(!userDevtoAcc || !userDevtoAcc.apiKey) {
        throw new Error("You haven't connected your Dev.to account. Please connect your account first.");
    }

    const devtoSettings = { list: devtoForm.tagStream, ...devtoForm };

    // Save platform config for this blog
    await DevtoPublishConfig.findOneAndUpdate({
        user: userId,
        blog: blogId,
    }, {
        settings: devtoSettings,
    }, {
        upsert: true,
        new: true,
    });


    const userDevtoKey = userDevtoAcc.apiKey;

    // Post blog to devto
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

    // Modify the blog details after publishing it
    const status = devtoForm.published ? "published" : "draft";
    
    if (!blog.published.includes("devto")) {
        blog.published.push("devto");
    }
    blog.status = status;

    await blog.save();

    return {
        platform: "devto",
        success: true,
        message: "Ready to publish on Dev.to",
    };
};

export const getSavedPublishConfigs = async (blogId: string, userId: string): Promise<SelectedPlatformsData> => {
    await connectDb();

    const configs = await PublishConfig.find({ blog: blogId, user: userId });
    const result: SelectedPlatformsData = {};

    for (const config of configs) {
        if (config.platform && config.settings) {
            result[config.platform as BlogPlatform] = config.settings;
        }
    }
    
    return result;
};

export const platformPublishers: Record<BlogPlatform, PlatformPublisher> = {
    devto: ({ blogId, userId, formsData }) => publishToDevto(blogId, userId, formsData.devto!),
};