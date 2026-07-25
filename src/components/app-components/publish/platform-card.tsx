import * as React from "react";
import { cn } from "@/lib/utils";
import { BlogPlatform } from "@/lib/types/blog.types";
import { Checkbox } from "@/components/ui/checkbox";

interface PlatformCardProps {
  platform: BlogPlatform;
  description: string;
  connected: boolean;
  selected: boolean;
  published: boolean;
  onToggle: () => void;
  logo: React.ReactNode;
}

export function PlatformCard({
  platform,
  description,
  connected,
  selected,
  published,
  onToggle,
  logo,
}: PlatformCardProps) {
  return (
    <div
      onClick={connected ? onToggle : undefined}
      className={cn(
        "flex items-center gap-4 px-4 py-4 transition-colors",
        connected ? "cursor-pointer hover:bg-accent/50" : "opacity-40 cursor-not-allowed",
      )}
    >
      <Checkbox
        checked={selected}
        disabled={!connected}
        className="pointer-events-none shrink-0"
      />

      <div className="shrink-0">{logo}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground capitalize">{platform}</span>
          {!connected && (
            <span className="text-sm text-muted-foreground">(Not connected)</span>
          )}
          {connected && published && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">(Published)</span>
          )}
        </div>
        <p className="text-[13px] text-muted-foreground mt-0.5 line-clamp-1">{description}</p>
      </div>
    </div>
  );
}
