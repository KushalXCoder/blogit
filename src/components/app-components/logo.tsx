import Link from "next/link";
import Image from "next/image";

type LogoProps = {
    includeText?: boolean;
}

export const Logo = ({
    includeText = true
} : LogoProps) => {
    return (
        <div className="flex gap-3 items-center">    
            <Link href="/" className="flex items-center gap-3">
                <Image src="/logo.svg" alt="Logo" height={1000} width={1000} priority draggable={false} className="size-8" />
                {includeText && <h1 className="text-xl">Blogit</h1>}
            </Link>
        </div>
    )
}