import { NextRequest, NextResponse } from 'next/server';
import { checkToken } from '@/lib/helper/checkToken';

export const GET = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("blogit-token")?.value;
        if(!token) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const decoded = await checkToken(token);
        if(!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        return NextResponse.json({ message: "Authenticated", data: decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}