import { Textarea } from "@/components/ui/textarea"
import { Send, Sent02FreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export const AiChat = () => {
    return (
        <div className="h-full w-full flex flex-col bg-accent/50 p-5">
            <div className="flex-1 flex justify-center items-center">    
                <p className="font-serif text-2xl">
                    Ask AI about your blog
                </p>
            </div>
            <footer className="w-full">
                <div className="flex flex-col items-end bg-white/50 border border-gray-300 focus-visible:ring-2 py-1 rounded-tl-md rounded-br-md">
                    <Textarea
                        className="min-h-5 max-h-20 resize-none border-gray-300 border-0 focus-visible:ring-0 no-scrollbar"
                        placeholder="Ask me anything..."
                    />
                    <div className="w-full py-1 flex justify-end px-3">
                        <HugeiconsIcon icon={Sent02FreeIcons} className="size-5" />
                    </div>
                </div>
            </footer>
        </div>
    )
}