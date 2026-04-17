import { Button } from "@/components/ui/button";
import { HugeiconsFreeIcons, Note01FreeIcons } from "@hugeicons/core-free-icons";

export default function Home() {
  return (
    <div className="min-w-380 mx-auto flex-1 flex flex-col gap-20 items-center border-x border-dashed px-10 bg-white">
      <div className="max-w-6xl flex flex-col gap-8 items-center mt-20">
        <h1 className="text-5xl text-center">Research, write, collaborate. One tab. Your docs, your AI, your team - together.</h1>
        <div className="flex items-center gap-5">
          <Button className="w-50 py-5">
            Get Started
          </Button>
          <Button variant="outline" className="w-50 py-5">
            Learn More
          </Button>
        </div>
      </div>
      <div className="min-h-200 w-full border border-b-0 rounded-t-lg shadow-sm px-2 pt-2 bg-accent">
        <div className="min-h-200 w-full bg-white rounded-t-sm shadow-sm">

        </div>
      </div>
    </div>
  )
}