// All the user related frontend API calls to interact with the backend

import { ApiResponse } from "@/src/lib/types/api.types";
import { WaitlistData } from "@/src/lib/types/global.types";
import { UserData } from "@/src/lib/types/user.types";

export const addUserToWaitlist = async (data: WaitlistData) => {
    try {
        // Call the waitlist API
        const res = await fetch("/api/waitlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Deconstruct the response data
        const responseData = await res.json();

        // Check if the response is ok
        if(!res.ok) {
            throw new Error(responseData.message || "Failed to join waitlist");
        }

        return responseData;
    } catch (error) {
        // Catch and throw the error to the frontend
        console.log("Error adding user to waitlist:", error);
        throw error;
    }
}

export const updateUser = async (updates: Partial<UserData>) => {
    const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates }),
    });

    const data : ApiResponse<null> = await res.json();
    if(!res.ok || data.error) {
        throw new Error(data.error || data.message || "Failed to update user details");
    }

    return data;
}

export const getUserData = async () => {
    const res = await fetch("/api/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const data : ApiResponse<UserData> = await res.json();
    if(!res.ok) {
        throw new Error(data.message || "Failed to fetch user data");
    }

    return data.data;
}