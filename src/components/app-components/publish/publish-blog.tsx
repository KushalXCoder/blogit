import { Button } from "@/components/ui/button";
import { saveBlog } from "@/services/blog.service";
import { blogStore } from "@/store/blog.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "../loader";

type PublishBlogProps = {
    loading: boolean;
    setLoading: (val: boolean) => void;
}

export const PublishBlog = ({
    loading,
    setLoading
} : PublishBlogProps) => {
    const { id, title, content, coverImage, words } = blogStore();
    const router = useRouter();

    const handlePublish = async () => {
        const blogDetails = { title, content, coverImage, words };
        setLoading(true);

        // If no blogId, then first save the blog to the db
        if(!id) {
            try {
                const blogId = await saveBlog(blogDetails);
                router.push(`/dashboard/publish/${blogId}`);
            } catch (error) {
                console.log(error instanceof Error ? error.message : "Error saving blog");
                toast.error(error instanceof Error ? error.message : "Error saving blog");
            } finally {
                setLoading(false);
            }
        } else {
            router.push(`/dashboard/publish/${id}`);
        }
    }

    return (
        <Button
            onClick={handlePublish}
            disabled={loading}
        >
            {loading && <Loader />}
            Publish
        </Button>
    )
}