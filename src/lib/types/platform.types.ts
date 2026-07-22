export interface DevToFormState {
  title: string;
  body_markdown: string;
  published: boolean;
  tagStream: string;
  tags: string[];
  main_image: string;
  description: string;
  canonical_url: string;
  series: string;
  organization_id: string;
};

export interface HashnodeFormState {
  title: string;
  markdown: string;
  publication_id: string;
  slug: string;
  subtitle: string;
  cover_image: string;
  tags: string;
  series: string;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  disable_comments: boolean;
  hide_from_feed: boolean;
  draft: boolean;
};

// Centralized platform-to-form-state mapping
export interface PlatformFormStates {
    devto: DevToFormState;
    hashnode: HashnodeFormState;
}

export type FormStates = PlatformFormStates[keyof PlatformFormStates];