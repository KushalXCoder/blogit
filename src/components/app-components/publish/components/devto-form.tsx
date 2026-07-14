import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormSection, RequiredSection, OptionalSection, FormField, BoolField, DescriptiveField } from "./form-fields";
import { Textarea } from "@/components/ui/textarea";
import { DevToFormState } from "@/lib/types/form.types";

interface DevToFormProps {
  formData: DevToFormState;
  onChange: (key: keyof DevToFormState, value: string | boolean) => void;
}

export function DevToForm({ formData, onChange }: DevToFormProps) {
  return (
    <FormSection>
      <RequiredSection>
        <FormField label="Title">
          <Input
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Your blog title"
            required
          />
        </FormField>
        <FormField label="Body (Markdown)" hint="Auto-filled from your editor">
          <Input
            value="Content from editor"
            disabled
            className="text-muted-foreground bg-muted/50"
          />
        </FormField>
        <BoolField
          id="devto-published"
          label="Publish immediately (uncheck to save as draft)"
          checked={formData.published}
          onCheckedChange={(v) => onChange("published", v)}
        />
      </RequiredSection>

      <Separator />

      <OptionalSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <FormField label="Tags" hint="Max 4, comma-separated">
            <Input
              value={formData.tagStream}
              onChange={(e) => onChange("tagStream", e.target.value)}
              placeholder="webdev, react"
            />
          </FormField>
          <FormField label="Cover Image URL">
            <Input
              value={formData.main_image}
              onChange={(e) => onChange("main_image", e.target.value)}
              placeholder="https://..."
            />
          </FormField>
          <FormField label="Canonical URL" hint="SEO when cross-posting">
            <Input
              value={formData.canonical_url}
              onChange={(e) => onChange("canonical_url", e.target.value)}
              placeholder="https://yourblog.com/post"
            />
          </FormField>
          <FormField label="Series" hint="Group related articles">
            <Input
              value={formData.series}
              onChange={(e) => onChange("series", e.target.value)}
              placeholder="My Series"
            />
          </FormField>
          <FormField label="Organization ID">
            <Input
              value={formData.organization_id}
              onChange={(e) => onChange("organization_id", e.target.value)}
              placeholder="org_id"
            />
          </FormField>
        </div>
        <DescriptiveField label="Description">
          <Textarea
            placeholder="Any short description or summary you want to add can be included in the body of your post"
            className="text-primary"
          />
        </DescriptiveField>
      </OptionalSection>
    </FormSection>
  );
}