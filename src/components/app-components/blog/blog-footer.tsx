import { BlogStore } from "@/store/blog.store";

export const BlogFooter = () => {
    const { words, readingTime, title } = BlogStore();
    return (
        <div className="sticky bottom-0 w-full flex justify-between items-center px-10 py-1 border-y border-dashed z-10 bg-white">
            <div className="flex items-center gap-2 text-gray-600">
                <h1>Words :</h1>
                <span>{words}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <h1>Reading Time :</h1>
                <span>{readingTime} min</span>
            </div>
        </div>
    )
}