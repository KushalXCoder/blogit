"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserBlogData } from "@/lib/types/blog.types";
import { Copy, Download, Check, FileCode, Sparkles } from "lucide-react";
import { toast } from "sonner";

type ArticleExportersProps = {
  blog: UserBlogData;
};

export const ArticleExporters = ({ blog }: ArticleExportersProps) => {
  const [copiedMedium, setCopiedMedium] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const markdownContent = `---
title: "${blog.title || "Untitled"}"
date: "${new Date(blog.createdAt || Date.now()).toISOString()}"
tags: [${(blog.tags || []).map((t) => `"${t}"`).join(", ")}]
---

${blog.content || ""}`;

  // Copy raw markdown for Hashnode & Substack
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopiedMarkdown(true);
    toast.success("Markdown copied for Hashnode & Substack!");
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  // Copy Rich HTML for Medium editor (preserves formatting on paste)
  const handleCopyMediumHtml = async () => {
    try {
      // Basic HTML formatting wrapper for Medium paste
      const htmlContent = `
        <h1>${blog.title || "Untitled"}</h1>
        <div>${(blog.content || "")
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
          .replace(/\*(.*)\*/gim, '<i>$1</i>')
          .replace(/\n\n/gim, '<br/><br/>')}</div>
      `;

      const blobText = new Blob([htmlContent], { type: "text/html" });
      const blobPlain = new Blob([markdownContent], { type: "text/plain" });

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blobText,
            "text/plain": blobPlain,
          }),
        ]);
        setCopiedMedium(true);
        toast.success("Formatted Rich Text copied! Ready to paste into Medium.");
        setTimeout(() => setCopiedMedium(false), 2000);
      } else {
        navigator.clipboard.writeText(markdownContent);
        toast.success("Markdown copied for Medium!");
      }
    } catch {
      navigator.clipboard.writeText(markdownContent);
      toast.success("Markdown copied!");
    }
  };

  // Download .md file
  const handleDownloadMd = () => {
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(blog.title || "post").toLowerCase().replace(/[^a-z0-9]/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Markdown file downloaded!");
  };

  return (
    <Card className="border border-border bg-white dark:bg-card shadow-xs mt-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          1-Click Exporters for Other Platforms
        </CardTitle>
        <CardDescription className="text-xs">
          Export pre-formatted content for Medium, Hashnode, Substack, and local backups.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyMediumHtml}
            className="justify-start gap-2 h-9 text-xs"
          >
            {copiedMedium ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            Copy for Medium
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyMarkdown}
            className="justify-start gap-2 h-9 text-xs"
          >
            {copiedMarkdown ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            Copy for Hashnode
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadMd}
            className="justify-start gap-2 h-9 text-xs"
          >
            <Download className="size-3.5" />
            Download .MD File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
