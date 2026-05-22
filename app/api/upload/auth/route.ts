// This routes creates the auth credientials for imagekit upload and checks if the user is authenticated before providing the credentials

import { checkToken } from "@/lib/helper/checkToken";
import { NextRequest, NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

const PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY ?? "";
const PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY ?? "";

export const GET = async () => {
    try {
        // Check if user is authenticated
        const data = await checkToken();
        if(!data) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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