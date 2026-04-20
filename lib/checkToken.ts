"use server";

import { cookies } from "next/headers";

// Function to check if the token exists in the cookies
export const checkToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("indoc-token")?.value;

    // Return the token if it exists, otherwise return null
    return token ? JSON.parse(token) : null;
}