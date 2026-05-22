import { connectDb } from "@/lib/drivers/db";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/helper/signToken";

export const POST = async (req: NextRequest) => {
    try {
        const { username, email, password } = await req.json();
        console.log("Received signup data:", username, email, password);

        if(!username || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Connect to the database
        await connectDb();

        // Check if a user exists with the same username or email
        const exisitingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if(exisitingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating the user in the database
        await User.create({ username, email, password: hashedPassword });

        // Create a token
        const token = signToken({ 
            username, 
            email,
            connection: {
                devto: false,
                hashnode: false
            }
        });

        // Set the token in an HTTP-only cookie
        const res = NextResponse.json({ message: "User created successfully" }, { status: 201 });
        res.cookies.set("blogit-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return res;

    } catch (error) {
        return NextResponse.json({ message: "Failed to create user", error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
    }
}