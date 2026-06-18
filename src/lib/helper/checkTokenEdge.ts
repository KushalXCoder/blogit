// This function uses jose to verify the JWT token on the edge, as required in the proxy.ts file.

import * as jose from "jose";
import { TokenData } from "../types/global.types";

const JWT_SECRET = process.env.JWT_SECRET;

// Function to check if the token exists in the cookies
export const checkTokenEdge = async (token: string) : Promise<TokenData | null> => {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);
        return payload as TokenData;
    } catch {
        return null;
    }
}