import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <nav className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between relative">
      <Link
        href="/"
        className="text-2xl font-semibold text-gray-900 font-sans tracking-tight select-none"
      >
        <Logo />
      </Link>
      <div className="flex items-center gap-4">
        <Button
          variant="link"
          asChild
          className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors p-0 h-auto cursor-pointer"
        >
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
        <Button
          variant="default"
          asChild
          className="px-6 py-2 rounded-full text-sm font-medium h-auto cursor-pointer"
        >
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </nav>
  )
};
