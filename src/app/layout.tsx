import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Navbar } from "@/src/components/app-components/navbar";
import { Toaster } from "@/src/components/ui/sonner";
import AuthProvider from "../lib/provider/auth.provider";

const dmSans = DM_Sans({
  subsets:['latin'],
  variable:'--font-sans'
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "blogit - Collaborative Document Editor",
  description: "A collaborative document editor with the capabilities of RAG and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", dmSans.variable)}
    >
      <body className="min-h-full flex flex-col bg-accent/20">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
