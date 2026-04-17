import Link from "next/link";

export const Navbar = () => {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Thoughts", href: "/contact" },
    ];
    return (
        <nav className="px-20 py-5 border-b border-dashed bg-white">
            <div className="flex justify-between items-center">
                <h1 className="text-xl">Indoc</h1>
                <div className="flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-primary hover:bg-accent px-4 py-2 rounded-4xl transition-all"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}