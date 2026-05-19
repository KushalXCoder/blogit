import { checkToken } from "@/lib/checkToken";
import { signToken } from "@/lib/signToken";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/drivers/db";
import { User } from "@/models/user.model";

export const POST = async (req: NextRequest) => {
    try {
        const { devtoKey } = await req.json();

        if(!devtoKey) {
            return NextResponse.json({ message: "Key is missing" }, { status: 400 });
        }

        const res = await fetch('https://dev.to/api/users/me', {
            headers: {
                'api-key': devtoKey,
            },
        });

        const data = await res.json();
        
        if(!res.ok) {
            return NextResponse.json({ message: "Invalid Key" }, { status: 400 });
        }

        await connectDb();

        // Get the existing user integration data, update it, and sign it
        const userData = await checkToken();
        if(!userData) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: userData.email });
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.connection = {
            ...user.connection,
            devto: true,
        };

        await user.save();

        const token = signToken({
            email: user.email,
            username: user.username,
            connection: user.connection,
        });
        const response = NextResponse.json({ message: "Verification successful", data }, { status: 200 });

        response.cookies.set("blogit-token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return response;

    } catch (error) {
        console.error("Dev.to verification error:", {
            message: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json({ message: "An error occurred during verification" }, { status: 500 });
    }
};