export const Loader = () => {
    return (
        <div className="relative min-h-full flex-1 flex flex-col justify-center items-center px-10 py-4">
            <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] z-0" />
            <div className="flex flex-col space-y-6 z-10 *:rounded-lg">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-200 h-35 animate-pulse" />
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-200 h-35 animate-pulse" />
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-200 h-35 animate-pulse" />
            </div>
        </div>
    )
}