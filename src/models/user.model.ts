import mongoose from "mongoose";

// A simple user schema containing username, email, and password fields.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    connections: [{
        platform: {
            type: String,
            required: true,
            enum: ["devto", "hashnode", "medium"]
        },
        connected: {
            type: Boolean,
            default: false
        },
        apiKey: {
            type: String,
            default: ""
        }
    }]
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);