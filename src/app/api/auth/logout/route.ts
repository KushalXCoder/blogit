import { userLogout } from "@/controller/auth.controller";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    return userLogout(req);
}