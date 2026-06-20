"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenData } from "../types/global.types";

const JWT_SECRET = process.env.JWT_SECRET;

// Function to check if the token exists in the cookies
export const checkToken = async (token?: string) : Promise<TokenData | null> => {
    if(!token) {
        const cookieStore = await cookies();
        const userToken = cookieStore.get("blogit-token")?.value;

        if(!userToken) {
            return null;
        }

        token = userToken;
    }

    let decoded;

    try {
        decoded = jwt.verify(token, JWT_SECRET as string);
    } catch {
        return null;
    }

    return decoded as TokenData;
}