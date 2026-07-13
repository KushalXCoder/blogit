import * as React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function FormSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      {children}
    </div>
  );
}

export function RequiredSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground font-sans">Required</p>
      </div>
      {children}
    </div>
  );
}

export function OptionalSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-sans">Optional</p>
      {children}
    </div>
  );
}

export function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-0.5 leading-normal">{hint}</p>}
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
      <Label className="text-sm font-medium text-foreground">{label}</Label>
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
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onCheckedChange(!!v)} />
      <Label htmlFor={id} className="text-sm cursor-pointer font-normal text-foreground">
        {label}
      </Label>
    </div>
  );
}
