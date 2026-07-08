import { cookies } from "next/headers";
import { checkToken } from "@/lib/helper/checkToken";
import { getAllBlogs } from "@/services/blog.service";
import { UserBlogData } from "@/lib/types/blog.types";
import { UserBlogs } from "@/components/app-components/dashboard/user-blogs";
import { BackgroundPattern } from "@/components/app-components/background-pattern";
import { Button } from "@/components/ui/button";
import { getNextBlogs } from "@/services/blog.service";

const Dashboard = async () => {
    const token = (await cookies()).get("blogit-token")?.value;
    const user = await checkToken(token);

    // Fetch all blogs for the user if the user is authenticated
    let blogs: UserBlogData[] | undefined = [];
    if (user) {
        try {
            // blogs = await getAllBlogs(user._id, token);
            blogs = await getNextBlogs(user._id, "first", token);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    }

    return (
        <div className="flex-1 w-full bg-background relative">
            <BackgroundPattern />
            <div className="relative h-full py-8">
                {blogs && blogs.length > 0 && user ? (
                    <UserBlogs blogs={blogs} userId={user._id} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col gap-1 bg-accent/50 p-10 rounded-lg">
                            <h1 className="text-2xl font-bold text-gray-800">Opps!</h1>
                            <p className="text-gray-500 text-lg">
                                Get started by creating your first blog!
                            </p>
                            <Button variant="default" className="mt-3 py-3">
                                Start your journey
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;