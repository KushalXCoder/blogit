import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Platform = "devto" | "hashnode";

interface PlatformCardProps {
  platform: Platform;
  name: string;
  description: string;
  connected: boolean;
  selected: boolean;
  onToggle: () => void;
  logo: React.ReactNode;
}

export function PlatformCard({
  platform,
  name,
  description,
  connected,
  selected,
  onToggle,
  logo,
}: PlatformCardProps) {
  return (
    <button
      type="button"
      onClick={connected ? onToggle : undefined}
      disabled={!connected}
      className={cn(
        "w-full text-left rounded-xl border p-5 transition-all duration-150",
        "flex flex-col gap-3 bg-card text-card-foreground",
        selected
          ? "border-foreground ring-1 ring-foreground/20 shadow-sm"
          : "border-border hover:border-foreground/30",
        !connected && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-3">
          {logo}
          <span className="font-semibold text-sm">{name}</span>
        </div>
        <Checkbox
          checked={selected}
          disabled={!connected}
          className="pointer-events-none mt-0.5"
        />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      {!connected && (
        <Badge variant="secondary" className="w-fit text-xs">
          Not connected
        </Badge>
      )}
    </button>
  );
}
