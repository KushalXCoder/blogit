import { getPublishConfigs } from "@/controller/publish.controller";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  return getPublishConfigs(req);
};
