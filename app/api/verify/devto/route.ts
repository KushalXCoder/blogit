import { getIntegrationData } from "@/lib/integrationData";
import { signToken } from "@/lib/signToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { devtoKey } = await req.json();

        if(!devtoKey) {
            return NextResponse.json({ message: "Key is missing" }, { status: 400 });
        }

        const res = await fetch('https://dev.to/api/users/me', {
            headers: {
                'api-key': devtoKey,
            },
        });

        const data = await res.json();
        
        if(!res.ok) {
            return NextResponse.json({ message: "Invalid Key" }, { status: 400 });
        }

        // Get the existing user integration data, update it, and sign it
        const integrationData = await getIntegrationData();
        const updatedIntegrationData = {
            ...integrationData,
            devtoVerification: true,
        };
        const token = signToken(updatedIntegrationData, "365d");

        const response = NextResponse.json({ message: "Verification successful", data }, { status: 200 });

        response.cookies.set("integration-token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        });

        return response;

    } catch (error) {
        console.error("Dev.to verification error:", {
            message: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json({ message: "An error occurred during verification" }, { status: 500 });
    }
};