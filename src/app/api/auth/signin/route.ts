import { NextRequest } from "next/server";
import { signinController } from "@/controller/auth.controller";

export const POST = async (req: NextRequest) => {
    return signinController(req);
}