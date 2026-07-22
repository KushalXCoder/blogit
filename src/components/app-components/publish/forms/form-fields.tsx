import * as React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function FormSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
      {children}
    </div>
  );
}

export function RequiredSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center gap-2 pb-1 border-b border-border/80">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground font-sans">
          Essential Settings
        </span>
      </div>
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
}

export function OptionalSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center gap-2 pb-1 border-b border-border/80">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground/80 font-sans">
          Metadata & SEO (Optional)
        </span>
      </div>
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
}

export function FormField({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      <Label className="text-sm font-semibold text-foreground font-sans">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground font-sans leading-normal">{hint}</p>}
    </div>
  );
}

export function DescriptiveField({
  label,
  children
} : {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label className="text-sm font-semibold text-foreground font-sans">{label}</Label>
      {children}
    </div>
  )
}

export function BoolField({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5 py-1">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onCheckedChange(!!v)} />
      <Label htmlFor={id} className="text-sm cursor-pointer font-medium text-foreground leading-none font-sans">
        {label}
      </Label>
    </div>
  );
}
