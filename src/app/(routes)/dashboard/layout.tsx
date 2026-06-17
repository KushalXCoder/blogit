import { DocsNavbar } from "@/src/components/app-components/docs/docs-navbar";
import { AppSidebar } from "@/src/components/app-components/siderbar";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";

type DocsLayoutProps = {
    children: React.ReactNode;
}

const DocsLayout = ({
    children
}: DocsLayoutProps) => {
    return (
        <SidebarProvider>
            <div className="w-full flex flex-col bg-white">
                {/* <DocsNavbar /> */}
                <main className="flex-1 flex h-full">
                    <AppSidebar />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}

export default DocsLayout;