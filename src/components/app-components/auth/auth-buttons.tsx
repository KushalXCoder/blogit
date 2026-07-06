import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AuthButtons = async () => {
    return (
        <div className="flex items-center gap-4">
            <Button
                variant="outline"
                asChild
                className="px-6 py-2 rounded-full text-sm font-medium h-auto cursor-pointer"
                >
                <Link href="/auth/signup">Sign Up</Link>
            </Button>
                <Button
                    variant="default"
                    asChild
                    className="px-6 py-2 rounded-full text-sm font-medium h-auto cursor-pointer"
                >
                <Link href="/auth/login">Login</Link>
            </Button>
        </div>
    )
}