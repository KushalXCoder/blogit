import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "./lib/helper/checkToken";

// Proxy to allow access to authenticated users only
export const proxy = async (req: NextRequest) => {
    // Call the checkToken function to verify the cookie
    const token = await checkToken();

    // Redirect to login
    if(!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Allow the requested page
    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard',
}