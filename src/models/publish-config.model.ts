import mongoose, { Schema } from "mongoose";

// Base Schema for configurations
const baseConfigSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    }
}, {
    discriminatorKey: "platform", // Key to identify the type of platform
    timestamps: true
});

// Ensure unique config document per user, blog, and platform
baseConfigSchema.index({
    blog: 1,
    platform: 1,
    user: 1,
}, { unique: true });

export const PublishConfig = mongoose.models.PublishConfig || mongoose.model("PublishConfig", baseConfigSchema);