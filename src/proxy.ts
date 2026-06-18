import { NextRequest, NextResponse } from "next/server";
import { checkTokenEdge } from "./lib/helper/checkTokenEdge";

// Proxy to allow access to authenticated users only
export const proxy = async (req: NextRequest) => {
    // Call the checkToken function to verify the cookie
    const token = req.cookies.get("blogit-token")?.value;

    // Redirect to login
    if(!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Use the checkTokenEdge function to verify the token, as it is designed for edge functions
    const decoded = await checkTokenEdge(token);
    if(!decoded) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Allow the requested page
    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
}