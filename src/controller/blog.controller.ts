import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "@/lib/helper/checkToken";
import { Blog } from "@/models/blog.model";
import { connectDb } from "@/lib/drivers/db";

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