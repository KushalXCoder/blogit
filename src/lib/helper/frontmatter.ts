import { CustomFrontmatterField } from "../types/platform.types";

type FrontmatterInput = {
  title: string;
  coverImage?: string;
  tags?: string[];
  content: string;
  customFields?: CustomFrontmatterField[];
  date?: string;
};

/**
 * Serializes blog metadata and custom user key-value fields into a clean YAML Frontmatter header block.
 */
export function buildMarkdownWithFrontmatter(input: FrontmatterInput): string {
  const { title, coverImage, tags = [], content, customFields = [], date } = input;

  const now = date || new Date().toISOString().split("T")[0];

  const frontmatterObj: Record<string, unknown> = {
    title,
    date: now,
  };

  if (coverImage && coverImage.trim()) {
    frontmatterObj["cover_image"] = coverImage;
  }

  if (tags && tags.length > 0) {
    frontmatterObj["tags"] = tags;
  }

  // Merge custom user-defined frontmatter key-value pairs
  for (const field of customFields) {
    if (field.key && field.key.trim()) {
      const key = field.key.trim();
      const val = field.value.trim();

      // Parse booleans and numbers automatically if passed
      if (val.toLowerCase() === "true") {
        frontmatterObj[key] = true;
      } else if (val.toLowerCase() === "false") {
        frontmatterObj[key] = false;
      } else if (!isNaN(Number(val)) && val !== "") {
        frontmatterObj[key] = Number(val);
      } else {
        frontmatterObj[key] = val;
      }
    }
  }

  // Construct YAML block string
  let yamlStr = "---\n";
  for (const [k, v] of Object.entries(frontmatterObj)) {
    if (Array.isArray(v)) {
      yamlStr += `${k}:\n`;
      for (const item of v) {
        yamlStr += `  - ${item}\n`;
      }
    } else if (typeof v === "string") {
      yamlStr += `${k}: "${v.replace(/"/g, '\\"')}"\n`;
    } else {
      yamlStr += `${k}: ${v}\n`;
    }
  }
  yamlStr += "---\n\n";

  return yamlStr + (content || "");
}
