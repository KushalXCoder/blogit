const Docs = () => {
    return (
        <div className="min-h-full flex-1 flex flex-col px-10 py-4">
            <h1 className="text-lg font-semibold">Recent Opens</h1>
            <p className="text-sm text-gray-500">Below are the documents you've recently opened.</p>
            <div className="grid grid-cols-4 grid-rows-3 mt-5 gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="border border-gray-300 rounded-md p-4 flex flex-col justify-between">
                        <div>
                            <h2 className="text-md font-medium">Document {i + 1}</h2>
                            <p className="text-xs text-gray-500">Last opened: Today</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Docs;