import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    receiveUpdates: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export const Waitlist = mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);