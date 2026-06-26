import { NextRequest } from "next/server";
import { verifyDevtoKey } from "@/controller/user.controller";

export const POST = async (req: NextRequest) => {
    return verifyDevtoKey(req);
};