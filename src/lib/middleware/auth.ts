import { NextRequest } from "next/server";
import { checkToken } from "../helper/checkToken";
import { TokenData } from "../types/global.types";

type AuthResult =
    | {
        authenticated: true;
        data: TokenData;
    }
    | {
        authenticated: false;
    };

export const isUserAuthenticated = async (
    req: NextRequest
): Promise<AuthResult> => {

    const token = req.cookies.get("blogit-token")?.value;

    if (!token) {
        return { authenticated: false };
    }

    const decoded = await checkToken(token);

    if (!decoded) {
        return { authenticated: false };
    }

    return {
        authenticated: true,
        data: decoded,
    };
};