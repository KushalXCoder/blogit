import { connectDb } from "@/lib/drivers/db";
import { BlogPlatform } from "@/lib/types/blog.types";
import { DevToFormState } from "@/lib/types/platform.types";
import { IntegrationDataType } from "@/lib/types/global.types";
import { Blog } from "@/models/blog.model";
import { DevtoPublishConfig } from "@/models/platform.model";
import { PublishConfig } from "@/models/publish-config.model";
import { User } from "@/models/user.model";
import { decryptToken } from "@/lib/helper/encryption";

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

    // Check for existing saved Dev.to articleId
    const existingConfig = await DevtoPublishConfig.findOne({
        user: userId,
        blog: blogId,
        platform: "devto",
    });

    const userDevtoKey = decryptToken(userDevtoAcc.apiKey);
    const targetArticleId = devtoForm.articleId || existingConfig?.settings?.articleId;

    // Parse tags for Dev.to API
    const parsedTags = devtoForm.tagStream
        ? devtoForm.tagStream.split(",").map((t) => t.trim()).filter(Boolean)
        : devtoForm.tags || [];

    const articlePayload = {
        title: devtoForm.title,
        body_markdown: devtoForm.body_markdown,
        published: devtoForm.published,
        tags: parsedTags,
        main_image: devtoForm.main_image || undefined,
        canonical_url: devtoForm.canonical_url || undefined,
        description: devtoForm.description || undefined,
        series: devtoForm.series || undefined,
        organization_id: devtoForm.organization_id ? Number(devtoForm.organization_id) : undefined,
    };

    let res: Response;
    let isUpdate = false;

    if (targetArticleId) {
        // Update existing article via PUT
        res = await fetch(`https://dev.to/api/articles/${targetArticleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "api-key": userDevtoKey,
            },
            body: JSON.stringify({ article: articlePayload }),
        });

        if (res.ok) {
            isUpdate = true;
        } else if (res.status === 404) {
            // Fallback to POST if target article was deleted on Dev.to
            res = await fetch("https://dev.to/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": userDevtoKey,
                },
                body: JSON.stringify({ article: articlePayload }),
            });
        }
    } else {
        // Create new article via POST
        res = await fetch("https://dev.to/api/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": userDevtoKey,
            },
            body: JSON.stringify({ article: articlePayload }),
        });
    }

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || "Failed to publish on Dev.to");
    }

    const createdArticleId = data.id || targetArticleId;
    const devtoSettings = {
        ...devtoForm,
        list: devtoForm.tagStream,
        articleId: createdArticleId,
    };

    // Save platform config with articleId for future updates
    await DevtoPublishConfig.findOneAndUpdate(
        {
            user: userId,
            blog: blogId,
            platform: "devto",
        },
        {
            platform: "devto",
            settings: devtoSettings,
        },
        {
            upsert: true,
            new: true,
        }
    );

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
        message: isUpdate ? "Successfully updated article on Dev.to" : "Successfully published to Dev.to",
    };
};

export const getSavedPublishConfigs = async (blogId: string, userId: string): Promise<SelectedPlatformsData> => {
    await connectDb();

    const configs = await PublishConfig.find({ blog: blogId, user: userId });
    const result: SelectedPlatformsData = {};

    for (const config of configs) {
        const platformKey = (config.platform || config.__t) as BlogPlatform;
        if (platformKey && config.settings) {
            result[platformKey] = config.settings;
        }
    }
    
    return result;
};

import { publishToGithub } from "./github.service";
import { SelectedPlatformsData } from "@/lib/types/publish.types";

export const platformPublishers: Record<BlogPlatform, PlatformPublisher> = {
    devto: ({ blogId, userId, formsData }) => publishToDevto(blogId, userId, formsData.devto!),
    github: ({ blogId, userId, formsData }) => publishToGithub(blogId, userId, formsData.github!),
};