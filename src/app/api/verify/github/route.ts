import { NextRequest } from "next/server";
import { verifyGithubKey } from "@/controller/user.controller";

export const POST = async (req: NextRequest) => {
    return verifyGithubKey(req);
};
