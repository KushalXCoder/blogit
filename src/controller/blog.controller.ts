import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "@/lib/helper/checkToken";
import { Blog } from "@/models/blog.model";
import { connectDb } from "@/lib/drivers/db";
import { isUserAuthenticated } from "@/lib/middleware/auth";

// Controller to save a draft
export const saveDraft = async (req: NextRequest) => {
    try {
        // Check if the user is authenticated
        const token = req.cookies.get("blogit-token")?.value;
        if(!token) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        // Check if the token is valid
        const decoded = await checkToken(token);
        if(!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        // Check if the draft is empty
        const { title, coverImage, content, words } = await req.json();
        if(!title && !coverImage && !content) {
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
        const { userId } = await req.json();
        if(!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        await connectDb();
        
        const blogs = await Blog.find({ user: userId });
        if(!blogs || blogs.length === 0) {
            return NextResponse.json({ message: "No blogs found" }, { status: 404 });
        }

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
        if(!user.authenticated) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const decoded = user.data;

        // Check the request body for the blog ID
        const { blogId } = await req.json();
        if(!blogId) {
            return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
        }

        // Connect to database
        await connectDb();

        const blog = await Blog.findOne({ _id: blogId });
        if(!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        // Check if the user is the owner of the blog
        if(blog.user.toString() !== decoded._id) {
            return NextResponse.json({ message: "Not authorized to view this blog" }, { status: 403 });
        }

        return NextResponse.json({ message: "Blog fetched successfully", data: blog }, { status: 200 });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}