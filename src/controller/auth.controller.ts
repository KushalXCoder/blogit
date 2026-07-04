import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/drivers/db";
import { User } from "@/models/user.model";
import { checkPassword } from "@/lib/helper/checkPassoword";
import { getTokenData } from "@/lib/helper/getTokenData";
import { signToken } from "@/lib/helper/signToken";
import { getUploadAuthParams } from "@imagekit/next/server";
import { isUserAuthenticated } from "@/lib/middleware/auth";
import bcrypt from "bcrypt";

const PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY ?? "";
const PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY ?? "";

// Logic for handling user login and signup
export const loginController = async (req: NextRequest) => {
    try {
        // Extract email and password from the request body
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        // Connect to the database
        await connectDb();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check the password using the bcrypt compare function
        const isPasswordValid = await checkPassword(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // Create a token
        const tokenData = getTokenData(user);
        const token = signToken(tokenData);

        // Set the token in an HTTP-only cookie
        const res = NextResponse.json({ message: "Login successful" }, { status: 200 });
        res.cookies.set("blogit-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return res;
    } catch (error) {
        return NextResponse.json({ message: "Invalid request body", error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
    }
}

// Logic for handling user signup
export const signinController = async (req: NextRequest) => {
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
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Create a token
        const tokenData = getTokenData(newUser);
        const token = signToken(tokenData);

        // Set the token in an HTTP-only cookie
        const res = NextResponse.json({ message: "User created successfully" }, { status: 201 });
        res.cookies.set("blogit-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });

        return res;

    } catch (error) {
        return NextResponse.json({ message: "Failed to create user", error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
    }
}

// Logic for handling imagekit credentials generation
export const getImageKitCredentials = async (req: NextRequest) => {
    try {
        // Check if user is authenticated
        const user = await isUserAuthenticated(req);
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Get the required variables for Imagekit upload
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: PRIVATE_KEY,
            publicKey: PUBLIC_KEY,
        });

        return NextResponse.json({ message: "Credentials generated successfully", token, expire, signature, publicKey: PUBLIC_KEY }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}