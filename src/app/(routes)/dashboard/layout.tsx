import { AppSidebar } from "@/components/app-components/siderbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

type DocsLayoutProps = {
    children: React.ReactNode;
}

const DocsLayout = ({
    children
}: DocsLayoutProps) => {
    return (
        <SidebarProvider>
            <div className="w-full flex flex-col bg-white">
                <main className="flex-1 flex h-full">
                    <AppSidebar />
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </main>
            </div>
        </SidebarProvider>
    )
}

export default DocsLayout;