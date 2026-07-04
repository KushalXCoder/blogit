import { EditBlogPage } from "@/components/app-components/edit/edit-blog-page";
import { UserBlogData } from "@/lib/types/blog.types";
import { getBlog } from "@/services/blog.service";
import { cookies } from "next/headers";

type EditPageProps = {
    params: Promise<{ blogId: string }>;
}

const Page = async ({
    params
} : EditPageProps) => {
    const { blogId } = await params;
    let blogData : UserBlogData | undefined;

    try {
        const token = (await cookies()).get("blogit-token")?.value;
        blogData = await getBlog(blogId, token);
        console.log("Blog data fetched successfully:", blogData);
    } catch (error) {
        console.error("Error fetching blog data:", error);
    }


    if(!blogData) {
        return (
            <div className="container max-w-7xl mx-auto bg-accent/20 flex justify-center items-center">
                <h1>Blog data not found</h1>
            </div>
        )
    }

    return (
        <div className="container max-w-7xl mx-auto bg-accent/20">
            <EditBlogPage blogId={blogId} blogData={blogData} />
        </div>
    )
}

export default Page;