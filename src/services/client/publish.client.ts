import { SelectedPlatformsData } from "@/lib/types/publish.types";

/**
 * Frontend client service to fetch saved publish configurations from /api/blog/publish/configs
 */
export const fetchSavedPublishConfigs = async (blogId: string): Promise<SelectedPlatformsData> => {
  const res = await fetch(`/api/blog/publish/configs?blogId=${blogId}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch saved publish configs");
  }
  return data.data || {};
};
