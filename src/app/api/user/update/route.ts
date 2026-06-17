import { connectDb } from "@/src/lib/drivers/db";
import { checkToken } from "@/src/lib/helper/checkToken";
import { deepChecker } from "@/src/lib/helper/deepChecker";
import { UserData } from "@/src/lib/types/user.types";
import { User } from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/src/lib/helper/signToken";

type UserUpdatePayload = {
    updates: Partial<UserData>;
}

const allowedFields : (keyof UserData)[] = ["username", "email", "image", "connections"];

export const POST = async (req: NextRequest) => {
    try {
        // Check if the user is authenticated
        const userData = await checkToken();
        if(!userData) {
            console.log("Unauthorized access attempt to update user details", userData);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if the updates are provided
        const { updates } : UserUpdatePayload = await req.json();
        if(!updates) {
            return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
        }

        // Connect to the database
        await connectDb();

        // Check if the user exists
        const user = await User.findOne({ email: userData.email });
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
        const token = signToken({
            email: user.email,
            username: user.username,
            image: user.image,
            connections: user.connections,
        }, "7d");

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