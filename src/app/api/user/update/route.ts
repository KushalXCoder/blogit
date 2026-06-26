import { NextRequest } from "next/server";
import { updateUser } from "@/controller/user.controller";

export const POST = async (req: NextRequest) => {
    return updateUser(req);    
}