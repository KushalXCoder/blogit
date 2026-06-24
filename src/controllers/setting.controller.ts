// Controller for settings related API calls

import { upload } from "@imagekit/next";
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError } from "@imagekit/next";
import { ApiResponse } from "../lib/types/api.types";
import { UserData } from "../lib/types/user.types";

export const verifyDevtoKey = async (devtoKey: string) => {
    const res = await fetch('/api/verify/devto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ devtoKey }),
    });

    const data : ApiResponse<UserData> = await res.json();
    if(!res.ok) {
        throw new Error(data.message || "Verification failed");
    }

    return data.data;
}

const authenticator = async () => {
    const res = await fetch("/api/upload/auth");

    let data;
    try {
        data = await res.json();
    } catch (error : any) {
        throw new Error("Unexpected server response");
    }

    if(!res.ok){
        throw new Error(data.message || "Authentication failed");
    }

    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
};

// Update Image
export const uploadImage = async (file: File) => {
    try {
        const { signature, expire, token, publicKey } = await authenticator();

        const uploadResponse = await upload({
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: file.name,
        });
    
        if(!uploadResponse || !uploadResponse.url) {
            throw new Error("Image upload failed");
        }
    
        return uploadResponse;
    } catch (error) {
        if (error instanceof ImageKitAbortError) {
            console.error("Upload aborted:", error.reason);
        } else if (error instanceof ImageKitInvalidRequestError) {
            console.error("Invalid request:", error.message);
        } else if (error instanceof ImageKitUploadNetworkError) {
            console.error("Network error:", error.message);
        } else if (error instanceof ImageKitServerError) {
            console.error("Server error:", error.message);
        } else {
            // Handle any other errors that may occur.
            console.error("Upload error:", error);
        }

        throw error;
    }
}