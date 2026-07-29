"use client";

import React from "react";
import { UserBlogData } from "@/lib/types/blog.types";
import { useFormState } from "@/hooks/use-form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Code2 } from "lucide-react";
import { buildMarkdownWithFrontmatter } from "@/lib/helper/frontmatter";

type GithubFormProps = {
  data: UserBlogData;
};

export const GithubForm = ({ data }: GithubFormProps) => {
  const { getForm, setForm } = useFormState(data);
  const form = getForm("github");

  const handleChange = (field: keyof typeof form, value: unknown) => {
    setForm("github", (prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCustomFieldChange = (index: number, key: string, value: string) => {
    setForm("github", (prev) => {
      const updatedFields = [...prev.customFields];
      updatedFields[index] = { key, value };
      return {
        ...prev,
        customFields: updatedFields,
      };
    });
  };

  const addCustomField = () => {
    setForm("github", (prev) => ({
      ...prev,
      customFields: [...prev.customFields, { key: "", value: "" }],
    }));
  };

  const removeCustomField = (index: number) => {
    setForm("github", (prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  // Generate live frontmatter preview
  const liveFrontmatterPreview = buildMarkdownWithFrontmatter({
    title: form.title || data.title,
    coverImage: data.coverImage,
    tags: data.tags || [],
    content: "# Blog content preview...\n\nYour article content will be committed below the frontmatter header.",
    customFields: form.customFields,
  }).split("---")[1]; // extract header string between ---

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="github-owner">Repository Owner / Organization *</Label>
          <Input
            id="github-owner"
            placeholder="e.g. KushalXCoder"
            value={form.owner}
            onChange={(e) => handleChange("owner", e.target.value)}
          />
          <p className="text-[11px] text-muted-foreground">Your GitHub username or organization name.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github-repo">Repository Name *</Label>
          <Input
            id="github-repo"
            placeholder="e.g. my-personal-blog"
            value={form.repo}
            onChange={(e) => handleChange("repo", e.target.value)}
          />
          <p className="text-[11px] text-muted-foreground">Target repository hosting your static blog.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="github-branch">Target Branch</Label>
          <Input
            id="github-branch"
            placeholder="main"
            value={form.branch}
            onChange={(e) => handleChange("branch", e.target.value)}
          />
          <p className="text-[11px] text-muted-foreground">Git branch to commit to (default: main).</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github-filepath">File Path in Repo *</Label>
          <Input
            id="github-filepath"
            placeholder="e.g. content/posts/my-post.md"
            value={form.filePath}
            onChange={(e) => handleChange("filePath", e.target.value)}
          />
          <p className="text-[11px] text-muted-foreground">Supports .md or .mdx extensions.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="github-commit">Commit Message</Label>
        <Input
          id="github-commit"
          placeholder={`feat(blog): publish post "${data.title || "Untitled"}"`}
          value={form.commitMessage}
          onChange={(e) => handleChange("commitMessage", e.target.value)}
        />
      </div>

      {/* Dynamic Frontmatter Key-Value Builder */}
      <div className="border border-border rounded-lg p-4 bg-accent/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold flex items-center gap-1.5">
              <Code2 className="size-4 text-primary" />
              Dynamic YAML Frontmatter Headers
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add custom key-value metadata to match Astro, Hugo, or Jekyll schemas (e.g. layout, pubDate, heroImage).
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addCustomField} className="h-8 gap-1 text-xs">
            <Plus className="size-3.5" />
            Add Header
          </Button>
        </div>

        {form.customFields.length > 0 && (
          <div className="space-y-2">
            {form.customFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Key (e.g. layout)"
                  value={field.key}
                  onChange={(e) => handleCustomFieldChange(index, e.target.value, field.value)}
                  className="h-8 text-xs font-mono"
                />
                <span className="text-muted-foreground">:</span>
                <Input
                  placeholder="Value (e.g. post)"
                  value={field.value}
                  onChange={(e) => handleCustomFieldChange(index, field.key, e.target.value)}
                  className="h-8 text-xs"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => removeCustomField(index)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Live YAML Header Preview */}
        <div className="mt-3">
          <p className="text-[11px] font-medium text-muted-foreground mb-1">Generated Frontmatter Preview:</p>
          <pre className="bg-slate-950 text-slate-100 p-3 rounded text-xs font-mono overflow-x-auto leading-relaxed border border-border">
            {`---${liveFrontmatterPreview}---`}
          </pre>
        </div>
      </div>
    </div>
  );
};
