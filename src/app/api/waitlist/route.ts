import { NextRequest } from "next/server";
import { addUserToWaitlist } from "@/controller/waitlist.controller";

export const POST = async (req: NextRequest) => {
    return addUserToWaitlist(req);
}