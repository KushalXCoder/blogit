import { Input } from "@/components/ui/input";
import { FormSection, RequiredSection, OptionalSection, FormField, BoolField, DescriptiveField } from "./form-fields";
import { Textarea } from "@/components/ui/textarea";
import { DevToFormState } from "@/lib/types/platform.types";
import { useFormState } from "@/hooks/use-form-state";
import { UserBlogData } from "@/lib/types/blog.types";

interface DevToFormProps {
  data: UserBlogData;
}

export function DevToForm({ data }: DevToFormProps) {
  const { getForm, setForm } = useFormState(data);
  const formData = getForm("devto");
  const onChange = (key: keyof DevToFormState, value: string | boolean) => {
    setForm("devto", (prev) => ({ ...prev, [key]: value }));
  };
  return (
    <FormSection>
      <RequiredSection>
        <FormField label="Title">
          <Input
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Your blog title"
            className="bg-white"
            required
          />
        </FormField>
        <FormField label="Body (Markdown)" hint="Auto-filled from your editor — no edits needed.">
          <Input
            value="Content from editor"
            disabled
            className="text-muted-foreground bg-muted/30 border-dashed"
          />
        </FormField>
        <BoolField
          id="devto-published"
          label="Publish immediately (uncheck to save as draft)"
          checked={formData.published}
          onCheckedChange={(v) => onChange("published", v)}
        />
      </RequiredSection>

      <OptionalSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Tags" hint="Max 4, comma-separated">
            <Input
              value={formData.tagStream}
              onChange={(e) => onChange("tagStream", e.target.value)}
              placeholder="webdev, react"
              className="bg-white"
            />
          </FormField>
          <FormField label="Cover Image URL">
            <Input
              value={formData.main_image}
              onChange={(e) => onChange("main_image", e.target.value)}
              placeholder="https://..."
              className="bg-white"
            />
          </FormField>
          <FormField label="Canonical URL" hint="SEO when cross-posting">
            <Input
              value={formData.canonical_url}
              onChange={(e) => onChange("canonical_url", e.target.value)}
              placeholder="https://yourblog.com/post"
              className="bg-white"
            />
          </FormField>
          <FormField label="Series" hint="Group related articles">
            <Input
              value={formData.series}
              onChange={(e) => onChange("series", e.target.value)}
              placeholder="My Series"
              className="bg-white"
            />
          </FormField>
          <FormField label="Organization ID">
            <Input
              value={formData.organization_id}
              onChange={(e) => onChange("organization_id", e.target.value)}
              placeholder="org_id"
              className="bg-white"
            />
          </FormField>
        </div>
        <DescriptiveField label="Description">
          <Textarea
            value={formData.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="A short summary of your post"
            className="min-h-20 resize-none bg-white"
          />
        </DescriptiveField>
      </OptionalSection>
    </FormSection>
  );
}