// All the auth related frontend API calls to interact with the backend

import { LoginData, SignUpData } from "@/src/lib/types/auth.types";

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