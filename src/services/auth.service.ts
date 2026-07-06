// All the auth related frontend API calls to interact with the backend

import { ApiResponse } from "@/lib/types/api.types";
import { LoginData, SignUpData } from "@/lib/types/auth.types";

// Sigin function
export const signin = async (data: SignUpData) => {
    console.log("Signing in with data:", data);
    
    try {
        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const responseData = await res.json();
        
        if(!res.ok) {
            console.log(res);
            throw new Error(responseData.message || "Failed to sign in");
        }

        return responseData;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}

// Login function
export const login = async (data: LoginData) => {
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const responseData = await res.json();
        
        if(!res.ok) {
            throw new Error(responseData.message || "Failed to login");
        }

        return responseData;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

// Logout function
export const userLogout = async () => {
    const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const logoutData : ApiResponse<Boolean> = await res.json();
    if(!res.ok) {
        throw new Error(logoutData.message || "Failed to logout user");
    }

    return logoutData.data;
}