"use client";

import { ArrowLeftIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation";

export const BackNavigation = () => {
    const router = useRouter();
    return (
        <div
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => router.back()}
        >
            <HugeiconsIcon icon={ArrowLeftIcon} className="size-5" />
            <span>Back</span>
        </div>
    )
}