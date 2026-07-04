import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/app-components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-foreground">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
          type="video/mp4"
        />
      </video>
      <div className="relative h-screen flex flex-col z-10 justify-between">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-6 -mt-36 max-w-4xl flex flex-col items-center">
            <span className="text-xs font-semibold text-muted-foreground tracking-[0.2em] mb-4 uppercase font-sans">
              Welcome to Blog-It
            </span>
            <h1 className="flex flex-col items-center gap-3 font-serif">
              <span className="text-6xl md:text-8xl lg:text-8xl font-normal text-muted-foreground/60 leading-[0.85] tracking-tighter">
                Making your blogging
              </span>
              <span className="text-6xl md:text-8xl lg:text-9xl font-normal text-foreground leading-[0.85] tracking-tighter -mt-1 md:-mt-2 lg:-mt-3">
                Easier & Faster.
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mt-6 leading-relaxed font-sans font-medium">
              We help you connect to multiple platforms like Hashnode and Dev.to to upload blogs safely and securely at once like a jet.
            </p>
            <div className="flex items-center gap-4 justify-center">
              <Link href="/dashboard" prefetch={false}>
                <Button
                  variant="default"
                  className="px-6 py-2.5 rounded-full text-sm font-semibold h-auto cursor-pointer"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <div className="h-20" /> 
      </div>
    </div>
  );
}