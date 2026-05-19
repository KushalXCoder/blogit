import { checkToken } from "@/lib/checkToken";

export const Avatar = async () => {
    const token = await checkToken();
    const username = token?.username || "User";
    return (
        <div className="size-8 bg-primary/80 hover:bg-primary text-white rounded-full border flex justify-center items-center text-sm">
            {username.charAt(0).toUpperCase()}
        </div>
    )
}