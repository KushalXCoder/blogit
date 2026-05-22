import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const checkWaitlist = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("waitlist-token")?.value;

    if(!token) {
        return false;
    }

    try {
        jwt.verify(token, JWT_SECRET as string);
    } catch (error) {
        return false;
    }

    return true;
}