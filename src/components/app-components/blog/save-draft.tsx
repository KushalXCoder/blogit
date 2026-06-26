import { Button } from "@/components/ui/button";
import { saveDraft } from "@/services/blog.service";
import { BlogStore } from "@/store/blog.store";
import { toast } from "sonner";

export const SaveDraft = () => {
    const { title, coverImage, content, words } = BlogStore();

    const handleSaveDraft = async () => {
        // Check if the everything is empty
        if(!title && !coverImage && !content){
            toast.error("Cannot save empty draft");
            return;
        }

        // Store to the backend
        try {
            const res = await saveDraft({ title, coverImage, content, words });
            toast.success(res.message || "Draft saved successfully");
        } catch (error) {
            console.log(error);
            toast.error(error instanceof Error ? error.message : "Failed to save draft");
        }
    }

    return (
        <Button
            onClick={handleSaveDraft}
            variant="outline"
        >
            Save Draft
        </Button>
    )
}