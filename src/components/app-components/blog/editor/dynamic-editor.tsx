import dynamic from "next/dynamic";

export const Editor = dynamic(
    () => import("./blog-editor"),
    {
        ssr: false,
        loading: () => (
            <div className="flex-1 h-full flex items-center justify-center bg-accent/50 animate-pulse mx-10 rounded-sm" />
        )
    }
);