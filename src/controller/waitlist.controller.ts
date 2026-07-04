import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/drivers/db";
import { Waitlist } from "@/models/waitlist.model";
import { signToken } from "@/lib/helper/signToken";

export const addUserToWaitlist = async (req: NextRequest) => {
    try {
        const { name, email, receiveUpdates } = await req.json();
        if(!name || !email || receiveUpdates === undefined) {
            return NextResponse.json({ message: "Fields are required" }, { status: 400 });
        }
    
        // Connect to database
        await connectDb();
    
        // Check if user already exists in the waitlist
        const user = await Waitlist.findOne({
            $or: [{ name }, { email }],
        });

        if(user) {
            return NextResponse.json({ message: "User already in waitlist" }, { status: 400 });
        }
    
        // Add user to the waitlist
        await Waitlist.create({ name, email, receiveUpdates });
    
        const res = NextResponse.json({ message: "User added to waitlist" }, { status: 201 });
        
        // Create a token
        const data = { name, email, receiveUpdates };
        const token = signToken(data, "365d");
    
        // Set cookie and attach with the response
        res.cookies.set("waitlist-token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 365 * 24 * 60 * 60, // 365 days
        });
    
        return res;
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while adding user to waitlist" }, { status: 500 });
    }
}