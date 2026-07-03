"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

type EditButtonProps = {
    blogId: string;
};

export const EditButton = ({
    blogId
} : EditButtonProps) => {
    const router = useRouter();
    return (
        <Button
            variant="default"
            onClick={() => router.push(`/edit/${blogId}`)}
        >
            <HugeiconsIcon icon={Edit} className="size-4" />
            Edit
        </Button>
    )
}