import { Navbar } from "@/src/components/app-components/navbar";
import { WaitlistDialog } from "@/src/components/app-components/waitlist/waitlist-dialog";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-w-380 mx-auto flex-1 flex flex-col gap-20 items-center border-x border-dashed px-10 bg-white">
        <div className="max-w-6xl flex flex-col gap-8 items-center mt-15">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl">Single Platform For Uploading</h1>
            <h1 className="text-5xl">Your Blogs At Multiple Platforms</h1>
            <p className="mt-5 text-xl max-w-xl text-gray-500">Connect seamless with dev.to and hashnode, to help posting and tracking analysis.</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/dashboard" className="cursor-pointer">
              <Button className="w-50 py-5">
                Start Writing
              </Button>
            </Link>
            <WaitlistDialog />
          </div>
        </div>
        <div className="min-h-200 w-full border border-b-0 rounded-t-lg shadow-sm px-2 pt-2 bg-accent">
          <div className="min-h-200 w-full bg-white rounded-t-sm shadow-sm flex justify-center items-center">
            <h1 className="text-xl text-gray-500">Demo coming soon....</h1>
          </div>
        </div>
      </div>
    </>
  )
}