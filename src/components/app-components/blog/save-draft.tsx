import { Button } from "@/components/ui/button";
import { saveDraft } from "@/services/blog.service";
import { blogStore } from "@/store/blog.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "../loader";

type SaveDraftProps = {
    loading: boolean;
    setLoading: (val: boolean) => void;
}

export const SaveDraft = ({
    loading,
    setLoading
} : SaveDraftProps) => {
    const { title, coverImage, content, words } = blogStore();
    const router = useRouter();

    const handleSaveDraft = async () => {
        // Check if the everything is empty
        if(!title && !coverImage && !content){
            toast.error("Cannot save empty draft");
            return;
        }

        setLoading(true);

        // Store to the backend
        try {
            const res = await saveDraft({ title, coverImage, content, words });
            toast.success(res.message || "Draft saved successfully");

            // Go back to dashbaord and also refresh it for fresh data
            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error(error instanceof Error ? error.message : "Failed to save draft");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onClick={handleSaveDraft}
            variant="outline"
            disabled={loading}
        >
            {loading && <Loader />}
            Save Draft
        </Button>
    )
}