"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CopyIcon, CheckIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "user" | "assistant" | "system";
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full max-w-[95%] flex-col gap-2",
      from === "user" ? "is-user ml-auto justify-end" : "is-assistant",
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      "flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm",
      "group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground",
      "group-[.is-assistant]:text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type MessageResponseProps = {
  content: string;
};

export const MessageResponse = ({ content }: MessageResponseProps) => (
  <div className="text-xs leading-relaxed space-y-2 text-foreground [&_h1]:text-sm [&_h1]:font-bold [&_h2]:text-sm [&_h2]:font-bold [&_h3]:text-xs [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_code]:bg-secondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm [&_pre]:bg-secondary [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_p]:my-1.5 [&_strong]:font-semibold">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </div>
);

export type MessageActionsProps = ComponentProps<"div">;

export const MessageActions = ({
  className,
  children,
  ...props
}: MessageActionsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props}>
    {children}
  </div>
);

export type MessageActionProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
};

export const MessageAction = ({
  tooltip,
  children,
  label,
  variant = "ghost",
  size = "sm",
  ...props
}: MessageActionProps) => (
  <Button size={size} type="button" variant={variant} {...props}>
    {children}
    <span className="sr-only">{label || tooltip}</span>
  </Button>
);

// Convenience copy action
export type MessageCopyActionProps = {
  content: string;
};

export const MessageCopyAction = ({ content }: MessageCopyActionProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  return (
    <MessageAction
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
    </MessageAction>
  );
};

export type MessageToolbarProps = ComponentProps<"div">;

export const MessageToolbar = ({
  className,
  children,
  ...props
}: MessageToolbarProps) => (
  <div
    className={cn(
      "mt-1 flex w-full items-center gap-1",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
