import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    content: {
        type: String,
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