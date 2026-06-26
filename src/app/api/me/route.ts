import { NextRequest, NextResponse } from 'next/server';
import { isUserAuthenticated } from '@/lib/middleware/auth';

export const GET = async (req: NextRequest) => {
    try {
        const user = await isUserAuthenticated(req);
        if(!user.authenticated) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = user.data;
        return NextResponse.json({ message: "Authenticated", data: decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}