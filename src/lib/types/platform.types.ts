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

// Centralized platform-to-form-state mapping
export interface PlatformFormStates {
    devto: DevToFormState;
}

export type FormStates = PlatformFormStates[keyof PlatformFormStates];