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
        <SidebarProvider className="h-screen overflow-hidden w-full">
            <div className="w-full h-full overflow-hidden flex flex-col bg-white">
                <main className="flex-1 flex h-full min-h-0 overflow-hidden">
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