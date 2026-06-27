import { EditBlogPage } from "@/components/app-components/edit/edit-blog-page";

type EditPageProps = {
    params: Promise<{ blogId: string }>;
}

const Page = async ({
    params
} : EditPageProps) => {
    const { blogId } = await params;
    return (
        <div className="container max-w-7xl mx-auto bg-accent/20">
            <EditBlogPage blogId={blogId} />
        </div>
    )
}

export default Page;