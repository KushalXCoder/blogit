import { Input } from "@/components/ui/input";
import { UserBlogData } from "@/lib/types/blog.types";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

type BlogSearchProps = {
    blogs: UserBlogData[];
    setFilteredBlogs: (blogs: UserBlogData[]) => void;
    search: string;
    setSearch: (text: string) => void;
};

export const BlogSearch = ({
    blogs,
    setFilteredBlogs,
    search,
    setSearch
}: BlogSearchProps) => {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    // Call the backend after user stops writing (Debouncing effect)
    useEffect(() => {
        const timer = setTimeout(() => {
            // Return if search is empty
            if(!search.trim()) return setFilteredBlogs(blogs);

            // Filter Blogs
            const filteredBlogs = blogs.filter(blog => {
                return blog.title.toLowerCase().includes(search.toLowerCase());
            });
            
            setFilteredBlogs(filteredBlogs);
        }, 300);
        return () => clearTimeout(timer);
    }, [search, blogs, setFilteredBlogs]);

    return (
        <div className="relative w-72 max-sm:w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
                placeholder="Search blogs..."
                className="bg-white dark:bg-card pl-9 h-10 w-full"
                value={search}
                onChange={(e) => handleSearch(e)}
            />
        </div>
    )
}