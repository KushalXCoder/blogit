import Link from "next/link";
import { Logo } from "./logo";
import { AuthButtons } from "./auth/auth-buttons";
import { cookies } from "next/headers";
import { LogoutButton } from "./auth/logout";

export const Navbar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("blogit-token")?.value;
  return (
    <nav className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between relative">
      <Link
        href="/"
        className="text-2xl font-semibold text-gray-900 font-sans tracking-tight select-none"
      >
        <Logo />
      </Link>
      {token ? <LogoutButton /> : <AuthButtons />}
    </nav>
  );
};
