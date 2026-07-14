import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "@/lib/helper/checkToken";
import { Blog } from "@/models/blog.model";
import { User } from "@/models/user.model";
import { connectDb } from "@/lib/drivers/db";
import { isUserAuthenticated } from "@/lib/middleware/auth";
import { BlogData, BlogPlatform } from "@/lib/types/blog.types";

const updateBlogFields = ["title", "coverImage", "content", "words"] as const;

// Controller to save a draft
export const saveDraft = async (req: NextRequest) => {
    try {
        // Check if the user is authenticated
        const token = req.cookies.get("blogit-token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        // Check if the token is valid
        const decoded = await checkToken(token);
        if (!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        // Check if the draft is empty
        const { title, coverImage, content, words } = await req.json();
        if (!title && !coverImage && !content) {
            return NextResponse.json({ message: "Cannot save empty draft" }, { status: 400 });
        }

        await connectDb();

        // Save the draft to the database
        await Blog.create({
            user: decoded._id,
            title,
            coverImage,
            content,
            words,
            status: "draft",
        });

        return NextResponse.json({ message: "Draft saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error saving draft:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Controller to get all blogs for the user
export const getAllBlogs = async (req: NextRequest) => {
    try {
        const user = await isUserAuthenticated(req);
        if (!user.authenticated) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const decoded = user.data;

        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        if (decoded._id !== userId) {
            return NextResponse.json({ message: "Not authorized to access this data" }, { status: 403 });
        }

        await connectDb();

        const blogs = await Blog.find({ user: userId }).select("-content");
        return NextResponse.json({ message: "Blogs fetched successfully", data: blogs }, { status: 200 });

    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Controller to get a single blog by its ID
export const getBlog = async (req: NextRequest) => {
    try {
        // Check if the user is authenticated
        const user = await isUserAuthenticated(req);
        if (!user.authenticated) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const decoded = user.data;

        // Check the request body for the blog ID
        const { blogId } = await req.json();
        if (!blogId) {
            return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
        }

        // Connect to database
        await connectDb();

        const blog = await Blog.findOne({ _id: blogId });
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        // Check if the user is the owner of the blog
        if (blog.user.toString() !== decoded._id) {
            return NextResponse.json({ message: "Not authorized to view this blog" }, { status: 403 });
        }

        return NextResponse.json({ message: "Blog fetched successfully", data: blog }, { status: 200 });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export const updateBlog = async (req: NextRequest) => {
    try {
        const user = await isUserAuthenticated(req);
        if (!user.authenticated) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const decoded = user.data;

        const { blogId, title, coverImage, content, words } = await req.json();
        if (
            title === undefined ||
            coverImage === undefined ||
            content === undefined ||
            words === undefined
        ) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectDb();

        const blog = await Blog.findById(blogId).populate("user", "username");
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        if (blog.user.username !== decoded.username) {
            return NextResponse.json({ message: "Not authorized to update this blog" }, { status: 403 });
        }

        blog.title = title;
        blog.coverImage = coverImage;
        blog.content = content;
        blog.words = words;

        await blog.save();
        return NextResponse.json({ message: "Blog updated successfully", data: true }, { status: 200 });

    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Controller to delete a blog by its ID
export const deleteBlog = async (req: NextRequest) => {
    try {
        const user = await isUserAuthenticated(req);
        if(!user.authenticated) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const decoded = user.data;
        
        const { blogId } = await req.json();
        if(!blogId) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        await connectDb();
        
        const blog = await Blog.findById(blogId).populate("user", "email");
        if(!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        if(blog.user.email !== decoded.email) {
            return NextResponse.json({ message: "Not authorized to delete this blog" }, { status: 403 });
        }

        const deleteRes = await Blog.findByIdAndDelete(blogId);
        if(!deleteRes) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully", data: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Controller to fetch next blogs based on last blog id from the pagination
export const getNextBlogs = async (req: NextRequest) => {
    try {
        const user = await isUserAuthenticated(req);
        if(!user.authenticated) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const decoded = user.data;

        const { userId, lastBlogId } = await req.json();
        if(!userId && !lastBlogId) {
            return NextResponse.json({ message: "User ID and last blog ID are required" }, { status: 400 });
        }

        if(decoded._id !== userId) {
            return NextResponse.json({ message: "Not authorized to access this data" }, { status: 403 });
        }

        await connectDb();

        const isFirstPage = !lastBlogId || lastBlogId === "first";
        const query = {
            user: userId,
            ...(isFirstPage ? {} : { _id: { $gt: lastBlogId } })
        };

        const blogs = await Blog.find(query)
            .select("-content")
            .sort({ _id: 1 })
            .limit(10);

        return NextResponse.json({ message: "Blogs fetched successfully", data: blogs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching next blogs:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Controller to save blog to db
export const saveBlog = async (req: NextRequest) => {
    try {
        const user = await isUserAuthenticated(req);
        if(!user.authenticated) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
        }

        const { title, content, coverImage, words } = await req.json();
        if(!title || !content || !words) {
            return NextResponse.json({ message: "Missing blog details" }, { status: 400 });
        }

        await connectDb();

        const blog = await Blog.create({
            user: user.data._id,
            title,
            content,
            coverImage,
            words,
        });

        return NextResponse.json({ message: "Blog saved successfully", data: blog._id }, { status: 200 });
    } catch (error) {
        console.error("Internal server error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}