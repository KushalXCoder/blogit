import { Schema } from "mongoose";
import { PublishConfig } from "./publish-config.model";

// Dev.to Settings Discriminator Schema
export const devtoSchema = new Schema({
    settings: {
        title: { type: String, default: "" },
        body_markdown: { type: String, default: "" },
        published: { type: Boolean, default: true },
        tags: { type: [String], default: [] },
        tagStream: { type: String, default: "" },
        list: { type: String, default: "" },
        main_image: { type: String, default: "" },
        description: { type: String, default: "" },
        canonical_url: { type: String, default: "" },
        series: { type: String, default: "" },
        organization_id: { type: String, default: "" },
    }
});

// Register discriminators safely for hot-reloading environments like Next.js
export const DevtoPublishConfig = PublishConfig.discriminators?.devto || PublishConfig.discriminator("devto", devtoSchema);