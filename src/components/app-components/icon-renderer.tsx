import { cn } from "@/src/lib/utils";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

// Custom hugeicons icon renderer

type IconProps = {
    icon: IconSvgElement;
    className?: string;
}

export const Icon = ({
    icon,
    className,
}: IconProps) => {
    return (
        <HugeiconsIcon
            icon={icon}
            className={cn(className)}
        />
    )
}