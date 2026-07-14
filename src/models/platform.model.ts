import { Schema } from "mongoose";
import { PublishConfig } from "./publish-config.model";

// Dev.to Settings Discriminator Schema
export const devtoSchema = new Schema({
    settings: {
        title: { type: String, default: "" },
        body_markdown: { type: String, default: "" },
        published: { type: Boolean, default: true },
        tags: { type: String, default: "" },
        main_image: { type: String, default: "" },
        description: { type: String, default: "" },
        canonical_url: { type: String, default: "" },
        series: { type: String, default: "" },
        organization_id: { type: String, default: "" },
    }
});

// Hashnode Settings Discriminator Schema
export const hashnodeSchema = new Schema({
    settings: {
        title: { type: String, default: "" },
        markdown: { type: String, default: "" },
        publication_id: { type: String, default: "" },
        slug: { type: String, default: "" },
        subtitle: { type: String, default: "" },
        cover_image: { type: String, default: "" },
        tags: { type: String, default: "" },
        series: { type: String, default: "" },
        seo_title: { type: String, default: "" },
        seo_description: { type: String, default: "" },
        canonical_url: { type: String, default: "" },
        disable_comments: { type: Boolean, default: false },
        hide_from_feed: { type: Boolean, default: false },
        draft: { type: Boolean, default: false },
    }
});

// Register discriminators safely for hot-reloading environments like Next.js
export const DevtoPublishConfig = PublishConfig.discriminators?.devto || PublishConfig.discriminator("devto", devtoSchema);
export const HashnodePublishConfig = PublishConfig.discriminators?.hashnode || PublishConfig.discriminator("hashnode", hashnodeSchema);