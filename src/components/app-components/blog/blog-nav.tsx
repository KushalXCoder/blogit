import { SaveDraft } from "./save-draft";
import { PublishBlog } from "./publish-blog";
import { BackNavigation } from "../back-nav";

export const BlogNav = () => {
    return (
        <div className="sticky top-0 bg-white z-10 w-full flex justify-between items-center px-10 py-3">
            <BackNavigation />
            <div className="flex gap-2">
                <SaveDraft />
                <PublishBlog />
            </div>
        </div>
    )
}