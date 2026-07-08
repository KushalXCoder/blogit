import { Input } from "@/components/ui/input";
import { UserBlogData } from "@/lib/types/blog.types";
import { useEffect, useState } from "react";

type BlogSearchProps = {
    blogs: UserBlogData[];
    setFilteredBlogs: (blogs: UserBlogData[]) => void;
    search: string;
    setSearch: (text: string) => void;
}

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
        <Input
            placeholder="Search blogs..."
            className="bg-white w-1/2 py-4 max-sm:w-full"
            value={search}
            onChange={(e) => handleSearch(e)}
        />
    )
}