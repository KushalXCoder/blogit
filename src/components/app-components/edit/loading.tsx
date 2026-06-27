const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col gap-5 border-dashed border-x bg-white py-8 pb-5 px-10">
      <div className="h-15 w-full bg-accent rounded-md animate-pulse" />
      <div className="flex-1 flex flex-col gap-4 pt-5">
        <div className="h-96 bg-accent rounded-md animate-pulse" />
        <div className="h-14 bg-accent rounded-md animate-pulse" />
        <div className="flex-1 bg-accent rounded-md animate-pulse" />
      </div>
    </div>
  );
};
export default Loading;
