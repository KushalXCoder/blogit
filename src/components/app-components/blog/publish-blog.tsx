import { Button } from "@/components/ui/button";

type PublishBlogProps = {
    loading: boolean;
    setLoading: (val: boolean) => void;
}

export const PublishBlog = ({
    loading,
    setLoading
} : PublishBlogProps) => {
    return (
        <Button
            disabled={loading}
        >
            Publish
        </Button>
    )
}