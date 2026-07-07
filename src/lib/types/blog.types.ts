export type BlogData = {
    title: string;
    coverImage: string;
    content: string;
    words: number;
};

export type UserBlogData = BlogData & {
    _id: string;
    user: string;
    tags: string[];
    status: "draft" | "published";
    createdAt: string;
    updatedAt: string;
}