import { Input } from "@/components/ui/input";
import { FormSection, RequiredSection, OptionalSection, FormField, BoolField } from "./form-fields";
import { HashnodeFormState } from "@/lib/types/form.types";

interface HashnodeFormProps {
  formData: HashnodeFormState;
  onChange: (key: keyof HashnodeFormState, value: string | boolean) => void;
}

export function HashnodeForm({ formData, onChange }: HashnodeFormProps) {
  return (
    <FormSection>
      <RequiredSection>
        <FormField label="Title">
          <Input
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Your blog title"
          />
        </FormField>
        <FormField label="Markdown Content" hint="Auto-filled from your editor — no edits needed.">
          <Input
            value="Content from editor"
            disabled
            className="text-muted-foreground bg-muted/30 border-dashed"
          />
        </FormField>
        <FormField label="Publication ID" hint="Your Hashnode publication ID">
          <Input
            value={formData.publication_id}
            onChange={(e) => onChange("publication_id", e.target.value)}
            placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
          />
        </FormField>
      </RequiredSection>

      <OptionalSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Slug" hint="Custom URL">
            <Input
              value={formData.slug}
              onChange={(e) => onChange("slug", e.target.value)}
              placeholder="my-blog-post"
            />
          </FormField>
          <FormField label="Subtitle">
            <Input
              value={formData.subtitle}
              onChange={(e) => onChange("subtitle", e.target.value)}
              placeholder="Small description under title"
            />
          </FormField>
          <FormField label="Cover Image URL">
            <Input
              value={formData.cover_image}
              onChange={(e) => onChange("cover_image", e.target.value)}
              placeholder="https://..."
            />
          </FormField>
          <FormField label="Tags" hint="Comma-separated">
            <Input
              value={formData.tags}
              onChange={(e) => onChange("tags", e.target.value)}
              placeholder="react, typescript"
            />
          </FormField>
          <FormField label="SEO Title">
            <Input
              value={formData.seo_title}
              onChange={(e) => onChange("seo_title", e.target.value)}
              placeholder="SEO optimised title"
            />
          </FormField>
          <FormField label="SEO Description">
            <Input
              value={formData.seo_description}
              onChange={(e) => onChange("seo_description", e.target.value)}
              placeholder="Meta description"
            />
          </FormField>
          <FormField label="Canonical URL">
            <Input
              value={formData.canonical_url}
              onChange={(e) => onChange("canonical_url", e.target.value)}
              placeholder="https://yourblog.com/post"
            />
          </FormField>
          <FormField label="Series">
            <Input
              value={formData.series}
              onChange={(e) => onChange("series", e.target.value)}
              placeholder="Series name"
            />
          </FormField>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          <BoolField
            id="hn-disable-comments"
            label="Disable Comments"
            checked={formData.disable_comments}
            onCheckedChange={(v) => onChange("disable_comments", v)}
          />
          <BoolField
            id="hn-hide-feed"
            label="Hide from Feed"
            checked={formData.hide_from_feed}
            onCheckedChange={(v) => onChange("hide_from_feed", v)}
          />
          <BoolField
            id="hn-draft"
            label="Save as Draft"
            checked={formData.draft}
            onCheckedChange={(v) => onChange("draft", v)}
          />
        </div>
      </OptionalSection>
    </FormSection>
  );
}
