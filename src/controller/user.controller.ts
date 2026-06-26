import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/drivers/db";
import { deepChecker } from "@/lib/helper/deepChecker";
import { UserData } from "@/lib/types/user.types";
import { User } from "@/models/user.model";
import { signToken } from "@/lib/helper/signToken";
import { getTokenData } from "@/lib/helper/getTokenData";
import { isUserAuthenticated } from "@/lib/middleware/auth";

type UserUpdatePayload = {
    updates: Partial<UserData>;
}

const allowedFields : (keyof UserData)[] = ["username", "email", "image", "connections"];

// Controller function to update user details
export const updateUser = async (req: NextRequest) => {
    try {
        const auth = await isUserAuthenticated(req);
        if(!auth.authenticated) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = auth.data;

        // Check if the updates are provided
        const { updates } : UserUpdatePayload = await req.json();
        if(!updates) {
            return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
        }

        // Connect to the database
        await connectDb();

        // Check if the user exists
        const user = await User.findOne({ email: decoded.email });
        if(!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        // Update the user details
        for(const key of allowedFields) {
            // Deep check for objects, shallow check for primitives
            if(typeof user[key] === "object" && typeof updates[key] === "object") {
                if(deepChecker(user[key], updates[key])) continue;
                else {
                    user[key] = updates[key];
                }
            } else if(updates[key] && user[key] !== updates[key]) {
                user[key] = updates[key];
            }
        }

        await user.save();

        // Create a token and sign it with jwt
        const tokenData = getTokenData(user);
        const token = signToken(tokenData);

        // Attach the token to the response as a cookie
        const res = NextResponse.json({ message: 'User details updated successfully' }, { status: 200 });
        res.cookies.set("blogit-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return res;
    } catch (error) {
        console.error("Error updating user details:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Controller function to verify devto key
export const verifyDevtoKey = async (req: NextRequest) => {
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

        await res.json();
        if(!res.ok) {
            return NextResponse.json({ message: "Invalid Key" }, { status: 400 });
        }

        await connectDb();

        const auth = await isUserAuthenticated(req);
        if(!auth.authenticated) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = auth.data;

        const user = await User.findOne({ email: decoded.email });
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.connections = {
            ...user.connections,
            devto: true,
        };

        await user.save();

        const tokenData = getTokenData(user);
        const token = signToken(tokenData);

        const response = NextResponse.json({
            message: "Verification successful",
            data: tokenData,
        }, { status: 200 });

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
}