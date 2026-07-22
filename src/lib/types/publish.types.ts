import { PlatformFormStates } from "./platform.types";

export type SelectedPlatformsData = {
  [P in keyof PlatformFormStates]?: PlatformFormStates[P];
};

// Alias for backwards compatibility
export type PublishButtonData = SelectedPlatformsData;