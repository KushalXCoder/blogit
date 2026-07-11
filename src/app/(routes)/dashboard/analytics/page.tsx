import { BackgroundPattern } from "@/components/app-components/background-pattern";
import { Button } from "@/components/ui/button";

const Page = () => {
    return (
        <div className="relative min-h-full flex-1 flex flex-col justify-center items-center px-10 py-4">
            <BackgroundPattern />
            <div className="relative flex flex-col gap-5 justify-center items-center h-full w-full">
                <h1 className="font-serif text-3xl max-w-2xl text-center">
                    Blogit makes your blogging experience seamless with multi-platform analytics support.
                </h1>
                <Button variant="outline" className="px-10 py-5 bg-accent">Coming Soon</Button>
            </div>
        </div>
    )
}

export default Page;