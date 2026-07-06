"use client";

import { userLogout } from "@/services/auth.service";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { redirectTo } from "@/app/actions";
import { userStore } from "@/store/user.store";

export const LogoutButton = () => {
    const { reset } = userStore();
    
    const handleLogout = async () => {
        try {
            // Delete the cookie
            const res = await userLogout();
            if(!res) {
                toast.error("Failed to logout user");
                return;
            }

            // Empty the user store
            reset();

            await redirectTo("/");
            toast.success("Logout successful!");
        } catch (error) {
            if (error instanceof Error && (error.message === "NEXT_REDIRECT" || error.message.includes("NEXT_REDIRECT"))) return;
            console.error("Error logging out:", error);
            toast.error(error instanceof Error ? error.message : "Failed to logout user");
        }
    }

    return (
        <Button
            variant="outline"
            onClick={handleLogout}
            className=""
        >
            Logout
        </Button>
    )
}