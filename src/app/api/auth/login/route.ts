import { NextRequest, NextResponse } from "next/server";
import { loginController } from "@/controller/auth.controller";

export const POST = async (req: NextRequest) => {
    return loginController(req);
}