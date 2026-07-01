import { Logo } from "../logo";

export const AuthBoxInfo = () => {
  return (
    <div className="relative hidden md:flex flex-col justify-between w-1/2 bg-[#0A0D14] p-12 text-white border-r border-border/20">
      <div className="z-10">
        <Logo />
      </div>
      <div className="z-10 flex flex-col justify-center flex-1 my-auto max-w-xs">
        <h2 className="text-3xl font-normal leading-tight font-serif mb-3 text-white/90">
          Write once. Publish everywhere.
        </h2>
        <p className="text-neutral-400 text-xs leading-relaxed">
          Empower your tech blogging workflow. Write in a unified collaborative
          editor and instantly sync posts to DEV.to, Hashnode, and Medium.
        </p>
      </div>
      <div className="z-10 text-neutral-500 text-[11px] font-normal">
        <p className="italic">
          &ldquo;Blog-it is an indispensable tool for content creators. Highly
          recommended.&rdquo;
        </p>
        <p className="mt-1 font-semibold text-neutral-400">
          — Sarah, Developer & Tech Writer
        </p>
      </div>
    </div>
  );
};
