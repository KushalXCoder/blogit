import { ViewBlogPage } from "@/components/app-components/view/view-blog";

type ViewPageProps = {
    params: Promise<{ blogId: string }>;
}

const Page = async ({
    params
}: ViewPageProps) => {
    const { blogId } = await params;
    return (
        <div className="container max-w-7xl mx-auto bg-accent/20">
            <ViewBlogPage blogId={blogId} />
        </div>
    )
}

export default Page;