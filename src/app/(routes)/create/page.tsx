import { BlogContent } from "@/components/app-components/blog/blog-content";
import { BlogNav } from "@/components/app-components/blog/blog-nav";

const Page = () => {
    return (
        <div className="container max-w-7xl mx-auto bg-accent/20">
            <div className="min-h-screen flex flex-col border-dashed border-x bg-white pt-2 pb-5">
                <BlogNav />
                <BlogContent />
            </div>
        </div>
    )
}

export default Page;