"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Server Action to redirect to a path and purge the Next.js client-side router cache.
 * When redirect is called inside a Server Action, Next.js automatically clears the
 * client router cache for the destination route.
 */

export async function redirectTo(path: string) {
  revalidatePath("/","layout");
  redirect(path);
}
