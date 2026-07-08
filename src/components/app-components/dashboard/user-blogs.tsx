"use client";

import { UserBlogData } from "@/lib/types/blog.types";
import { BlogSearch } from "./search-blog";
import { useRef, useState, useEffect } from "react";
import { BlogCard } from "../blog/blog-card";
import { getNextBlogs } from "@/services/blog.service";
import { Loader2 } from "lucide-react";

type UserBlogsProps = {
  blogs: UserBlogData[];
  userId: string;
};

export const UserBlogs = ({ blogs, userId }: UserBlogsProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const [allBlogs, setAllBlogs] = useState<UserBlogData[]>(blogs);
  const [filteredBlogs, setFilteredBlogs] = useState<UserBlogData[]>(blogs);
  
  const [hasMore, setHasMore] = useState<boolean>(blogs.length === 10);
  const [loading, isLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const loadMoreBlogs = async () => {
    if (loading || !hasMore) return;
    isLoading(true);

    try {
      const lastBlog = allBlogs[allBlogs.length - 1];
      const lastBlogId = lastBlog ? lastBlog._id : "first";
      const newBlogs = await getNextBlogs(userId, lastBlogId);
      
      if (newBlogs && newBlogs.length > 0) {
        setAllBlogs(prev => [...prev, ...newBlogs]);
        setHasMore(newBlogs.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more blogs:", error);
    } finally {
      isLoading(false);
    }
  };

  const loadMoreRef = useRef(loadMoreBlogs);

  useEffect(() => {
    loadMoreRef.current = loadMoreBlogs;
  }, [loadMoreBlogs]);

  useEffect(() => {
    // If search is active, or no more blogs, do not observe
    if (search.trim() !== "" || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreRef.current();
        }
      }, {
        rootMargin: "200px", // Trigger when sentinel is 200px from the bottom
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, search]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex max-sm:flex-col max-sm:gap-4 md:justify-between md:items-end mb-8">
        <div className="w-1/2 max-sm:w-full">
          <h1 className="text-3xl font-bold tracking-tight">My blogs</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and organize your content
          </p>
        </div>
        <BlogSearch blogs={allBlogs} setFilteredBlogs={setFilteredBlogs} search={search} setSearch={setSearch} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center items-center py-8">
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading more blogs...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
