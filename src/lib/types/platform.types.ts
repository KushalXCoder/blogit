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
  articleId?: number | null;
};

export interface CustomFrontmatterField {
  key: string;
  value: string;
}

export interface GithubFormState {
  title: string;
  content: string;
  owner: string;
  repo: string;
  branch: string;
  filePath: string;
  commitMessage: string;
  customFields: CustomFrontmatterField[];
}

// Centralized platform-to-form-state mapping
export interface PlatformFormStates {
    devto: DevToFormState;
    github: GithubFormState;
}

export type FormStates = PlatformFormStates[keyof PlatformFormStates];