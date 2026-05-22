import { checkPassword } from "@/lib/helper/checkPassoword";
import { connectDb } from "@/lib/drivers/db";
import { signToken } from "@/lib/helper/signToken";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: NextResponse) => {
    try {
        // Extract email and password from the request body
        const { email, password } = await req.json();
        if(!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        // Connect to the database
        await connectDb();

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check the password using the bcrypt compare function
        const isPasswordValid = await checkPassword(password, user.password);
        if(!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // Create a token
        const token = signToken({
            username: user.username,
            email: user.email,
            connection: user.connection
        });

        // Set the token in an HTTP-only cookie
        const res = NextResponse.json({ message: "Login successful" }, { status: 200 });
        res.cookies.set("blogit-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return res;
    } catch (error) {
        return NextResponse.json({ message: "Invalid request body", error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
    }
}