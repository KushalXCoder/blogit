import { Input } from "@/src/components/ui/input"
import { Avatar } from "../avatar"

export const DocsNavbar = () => {
    return (
        <nav className="px-10 py-5 flex justify-between items-center border-b border-dashed">
            <h1>blogit</h1>
            <div className="flex-1 flex justify-end items-center gap-5">
                <Input
                    placeholder="Search docs..."
                    className="max-w-100"
                />
                <Avatar />
            </div>
        </nav>
    )
}