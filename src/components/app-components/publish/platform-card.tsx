import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlogPlatform } from "@/lib/types/blog.types";
import Image from "next/image";

interface PlatformCardProps {
  platform: BlogPlatform;
  description: string;
  connected: boolean;
  selected: boolean;
  onToggle: () => void;
  logo: string;
}

export function PlatformCard({
  platform,
  description,
  connected,
  selected,
  onToggle,
  logo,
}: PlatformCardProps) {
  console.log(logo);
  return (
    <button
      type="button"
      onClick={connected ? onToggle : undefined}
      disabled={!connected}
      className={cn(
        "group w-full text-left rounded-xl border p-5 transition-all duration-200",
        "flex items-start gap-4 bg-card text-card-foreground",
        selected
          ? "border-foreground/40 ring-2 ring-foreground/10 bg-accent/50"
          : "border-border hover:border-foreground/20 hover:bg-accent/30",
        !connected && "opacity-40 cursor-not-allowed hover:bg-card hover:border-border"
      )}
    >
      {/* Logo */}
      <div className="shrink-0 mt-0.5">
        <Image
          src={logo}
          alt={platform}
          draggable={false}
          height={1000}
          width={1000}
          loading="lazy"
          className="size-5"
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-foreground capitalize">{platform}</span>
          {!connected && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              Not connected
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>

      {/* Checkbox */}
      <Checkbox
        checked={selected}
        disabled={!connected}
        className="pointer-events-none mt-1 shrink-0"
      />
    </button>
  );
}
