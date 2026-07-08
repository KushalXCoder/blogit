"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { UserBlogData } from "@/lib/types/blog.types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Clock, Eye, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { TooltipRenderer } from "../tooltip-renderer";
import { Button } from "@/components/ui/button";
import { DeleteBox } from "../delete-box";

const ribbon_status: Record<"draft" | "published", string> = {
  published: "bg-emerald-600 text-emerald-50",
  draft: "bg-amber-500 text-amber-50",
};

const formatWordCount = (words: number) => {
  if (words >= 1000) return `${Math.round(words / 1000)}k`;
  return `${words}`;
};

export const BlogCard = ({ blog }: { blog: UserBlogData }) => {
  const time = blog.updatedAt;
  const readMinutes = Math.max(1, Math.ceil(blog.words / 200));

  const router = useRouter();

  return (
    <div
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
      )}
    >
      <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
        <div
          className={cn(
            "absolute -right-8 top-2.5 w-30 rotate-45 py-1 text-center text-[10px] font-semibold uppercase tracking-wide shadow-sm",
            ribbon_status[blog.status],
          )}
        >
          {blog.status}
        </div>
      </div>
      <CardContent className="px-5 pb-0 pt-4">
        <div className="mb-2 flex items-center gap-2 pr-10 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>{formatDistanceToNow(new Date(time), { addSuffix: true })}</span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{readMinutes} min read</span>
        </div>

        <h3 className="mb-3 line-clamp-2 pr-6 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {blog.title || "Untitled blog"}
        </h3>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {blog.tags.map((tag, i) => (
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
        <div className="flex items-center">
          <TooltipRenderer text="Edit blog">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 hover:bg-primary/10"
              onClick={() => router.push(`/edit/${blog._id}`)}
            >
              <span className="flex items-center gap-1.5 text-xs">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </span>
            </Button>
          </TooltipRenderer>
          <TooltipRenderer text="View blog">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/10"
              onClick={() => router.push(`/view/${blog._id}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipRenderer>
          <DeleteBox blogId={blog._id} />
        </div>
      </CardFooter>
    </div>
  );
};