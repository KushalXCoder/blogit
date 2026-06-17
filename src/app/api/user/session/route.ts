// Return the user's session data if they are logged in, otherwise return null

import { checkToken } from "@/src/lib/helper/checkToken"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const data = await checkToken();
        if(!data) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json({ message: "User authorized", data }, { status: 200 });
    } catch (error) {
        console.error("Error checking token:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}