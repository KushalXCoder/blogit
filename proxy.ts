import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "./lib/checkToken";

// Proxy to allow access to authenticated users only
export const proxy = async (req: NextRequest) => {
    // Call the checkToken function to verify the cookie
    const token = await checkToken();

    // Redirect to login
    if(!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Allow the requested page
    return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
    matcher: '/docs',
}