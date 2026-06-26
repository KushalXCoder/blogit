// This routes creates the auth credientials for imagekit upload and checks if the user is authenticated before providing the credentials

import { NextRequest } from "next/server";
import { getImageKitCredentials } from "@/controller/auth.controller";

export const GET = async (req: NextRequest) => {
    return getImageKitCredentials(req);
}