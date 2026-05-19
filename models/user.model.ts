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
    connection: {
        devto: {
            type: Boolean,
            default: false,
        },
        hashnode: {
            type: Boolean,
            default: false,
        },
    }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);