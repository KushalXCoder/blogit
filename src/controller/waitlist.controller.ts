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

        // Use let, because we will assign the response later based on the condition
        let res;
    
        if(user) {
            res = NextResponse.json({ message: "User already in waitlist" }, { status: 400 });
        }
    
        // Add user to the waitlist
        await Waitlist.create({ name, email, receiveUpdates });
    
        res = NextResponse.json({ message: "User added to waitlist" }, { status: 201 });
        
        // Create a token
        const data = { name, email, receiveUpdates };
        const token = signToken(data, "365d");
    
        // Set cookie and attach with the response
        res.cookies.set("waitlist-token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 365 * 60 * 60 * 24 * 30, // 365 days
        });
    
        return res;
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while adding user to waitlist" }, { status: 500 });
    }
}