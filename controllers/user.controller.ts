// All the user related frontend API calls to interact with the backend

import { WaitlistData } from "@/lib/types/global.types";

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