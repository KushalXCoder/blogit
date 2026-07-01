import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  includeText?: boolean;
  iconClassname?: string;
  className?: string;
};

export const Logo = ({
    includeText = true,
    iconClassname,
    className
}: LogoProps) => {
  return (
    <Link href="/" className="flex items-center gap-2">
    <Image
        src="/logo.svg"
        alt="Logo"
        height={1000}
        width={1000}
        priority
        draggable={false}
        className={cn("size-8", iconClassname)}
    />
    {includeText && (
        <h1 className={cn("text-3xl font-serif tracking-tight",className)}>Blogit</h1>
    )}
    </Link>
  );
};
