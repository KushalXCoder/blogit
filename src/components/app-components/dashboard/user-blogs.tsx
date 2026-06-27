"use client";

import { UserBlogData } from "@/lib/types/blog.types";
import { Calendar, Clock, Pencil, Trash2, Eye, FileText } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { TooltipRenderer } from "../tooltip-renderer";
import { usePathname, useRouter } from "next/navigation";

type UserBlogsProps = {
  blogs: UserBlogData[];
};

// Status -> ribbon color. Kept as a map so adding a new status later is a one-line change.
const ribbon_status: Record<"draft" | "published", string> = {
  published: "bg-emerald-600 text-emerald-50",
  draft: "bg-amber-500 text-amber-50",
};

const formatWordCount = (words: number) => {
  if (words >= 1000) return `${Math.round(words / 1000)}k`;
  return `${words}`;
};

const BlogCard = ({ blog }: { blog: UserBlogData }) => {
  const createdAt = new Date(parseInt(blog._id.substring(0, 8), 16) * 1000);
  const readMinutes = Math.max(1, Math.ceil(blog.words / 200));

  const router = useRouter();

  return (
    <div
      className={cn(
        // border (not ring) + isolate avoids a hairline gap some browsers render
        // when overflow-hidden + rounded corners are combined with a box-shadow ring
        "group relative isolate flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
      )}
    >
      {/* Folded-corner status flag, replaces the old full-width gradient banner */}
      <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
        <div
          className={cn(
            "absolute right-[-32px] top-[10px] w-[120px] rotate-45 py-1 text-center text-[10px] font-semibold uppercase tracking-wide shadow-sm",
            ribbon_status[blog.status],
          )}
        >
          {blog.status}
        </div>
      </div>

      <CardContent className="px-5 pb-0 pt-4">
        <div className="mb-2 flex items-center gap-2 pr-10 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>

          <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />

          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{readMinutes} min read</span>
        </div>

        <h3 className="mb-3 line-clamp-2 pr-6 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {blog.title || "Untitled blog"}
        </h3>

        {blog.tage && blog.tage.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {blog.tage.map((tag, i) => (
              <span
                key={i}
                className="rounded-md border border-border/70 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border bg-muted/40 px-5 py-2.5">
        <span className="font-mono text-xs text-muted-foreground">
          {formatWordCount(blog.words)} words
        </span>

        <div className="flex items-center gap-1">
          <TooltipRenderer text="Edit blog">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2 text-xs hover:bg-primary/10 hover:text-primary"
              onClick={() => router.push(`/edit/${blog._id}`)}
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          </TooltipRenderer>
          <TooltipRenderer text="View blog">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => window.open(`/blog/${blog._id}`, "_self")}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipRenderer>
          <TooltipRenderer text="View blog content">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipRenderer>
        </div>
      </CardFooter>
    </div>
  );
};

export const UserBlogs = ({ blogs }: UserBlogsProps) => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My blogs</h1>
        <p className="mt-2 text-muted-foreground">
          Manage and organize your content
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
