import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    words: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);