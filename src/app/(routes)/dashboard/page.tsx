import { cookies } from "next/headers";
import { checkToken } from "@/lib/helper/checkToken";
import { getAllBlogs } from "@/services/blog.service";
import { UserBlogData } from "@/lib/types/blog.types";
import { UserBlogs } from "@/components/app-components/dashboard/user-blogs";
import { BackgroundPattern } from "@/components/app-components/background-pattern";
import { Button } from "@/components/ui/button";
import { getNextBlogsServer } from "@/services/server-blog.service";
import { FileText } from "lucide-react";
import Link from "next/link";

const Dashboard = async () => {
    const token = (await cookies()).get("blogit-token")?.value;
    const user = await checkToken(token);

    // Fetch all blogs for the user if the user is authenticated
    let blogs: UserBlogData[] | undefined = [];
    if (user) {
        try {
            blogs = await getNextBlogsServer(user._id, "first");
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
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="flex flex-col items-center text-center gap-3 bg-card border border-border/80 p-10 rounded-xl shadow-xs max-w-md w-full mx-4">
                            <div className="p-3 bg-accent rounded-full text-muted-foreground">
                                <FileText className="size-8 stroke-[1.5]" />
                            </div>
                            <h1 className="text-xl font-bold text-foreground">No blogs created yet</h1>
                            <p className="text-muted-foreground text-sm">
                                Create your first post using the rich markdown editor and publish to multiple platforms.
                            </p>
                            <Link href="/create" className="w-full mt-2">
                                <Button variant="default" className="w-full">
                                    Create new blog
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;