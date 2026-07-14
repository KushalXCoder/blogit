"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { userStore } from "@/store/user.store";
import Image from "next/image";
import { BackgroundPattern } from "../background-pattern";
import { PlatformCard, Platform } from "./components/platform-card";
import { DevToForm } from "./components/devto-form";
import { HashnodeForm } from "./components/hashnode-form";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowBigLeft, ArrowBigRight } from "@hugeicons/core-free-icons";
import { UserBlogData } from "@/lib/types/blog.types";
import { PublishButton } from "./publish-button";
import { DevToFormState, HashnodeFormState } from "@/lib/types/form.types";
import { isPlatformConnected } from "@/lib/helper/connections";

type PublishPageProps = {
  data: UserBlogData;
}

export const PublishPage = ({
  data
} : PublishPageProps) => {
  const { connections } = userStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null);

  const [devtoForm, setDevtoForm] = useState<DevToFormState>({
    title: data.title,
    body_markdown: data.content,
    published: true,
    tagStream: "",
    tags: [],
    main_image: data.coverImage,
    description: "",
    canonical_url: "",
    series: "",
    organization_id: "",
  });
  const [hashnodeForm, setHashnodeForm] = useState<HashnodeFormState>({
    title: data.title,
    markdown: data.content,
    publication_id: "",
    slug: "",
    subtitle: "",
    cover_image: data.coverImage,
    tags: "",
    series: "",
    seo_title: "",
    seo_description: "",
    canonical_url: "",
    disable_comments: false,
    hide_from_feed: false,
    draft: false,
  });

  const togglePlatform = (p: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const goToStep2 = () => {
    if (selectedPlatforms.length === 0) return;
    setActivePlatform(selectedPlatforms[0]);
    setStep(2);
  };

  const updateDevto = (key: keyof DevToFormState, value: string | boolean) =>
    setDevtoForm((p) => ({ ...p, [key]: value }));

  const updateHashnode = (key: keyof HashnodeFormState, value: string | boolean) =>
    setHashnodeForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="relative flex-1 w-full bg-background min-h-screen">
      <BackgroundPattern />
      <div className="relative mx-auto max-w-4xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Publish Blog</h1>
          <p className="text-muted-foreground mt-1 font-sans">
            Choose your platforms and fill in the publishing details.
          </p>
        </div>
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <p className="text-md text-muted-foreground font-sans">
              Select the platforms you want to publish to. Disabled platforms have not been
              connected yet — go to{" "}
              <a href="/dashboard/settings" className="underline underline-offset-2 hover:text-foreground">
                Settings
              </a>{" "}
              to connect them.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PlatformCard
                platform="devto"
                name="Dev.to"
                description="Publish to the Dev.to developer community."
                connected={isPlatformConnected(connections, "devto")}
                selected={selectedPlatforms.includes("devto")}
                onToggle={() => togglePlatform("devto")}
                logo={
                  <Image src="/devto.webp" alt="Dev.to" width={28} height={28} className="rounded" />
                }
              />
              <PlatformCard
                platform="hashnode"
                name="Hashnode"
                description="Share on your personal Hashnode blog."
                connected={isPlatformConnected(connections, "hashnode")}
                selected={selectedPlatforms.includes("hashnode")}
                onToggle={() => togglePlatform("hashnode")}
                logo={
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-600 text-white text-xs font-bold font-sans">
                    H
                  </span>
                }
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={goToStep2}
                disabled={selectedPlatforms.length === 0}
              >
                Continue
                <HugeiconsIcon icon={ArrowBigRight} className="size-5" />
              </Button>
            </div>
          </div>
        )}
        {step === 2 && activePlatform && (
          <div className="flex flex-col gap-6">
            {/* Platform tab switcher (only shown when both selected) */}
            {selectedPlatforms.length > 1 && (
              <div className="flex gap-2 border-b border-border pb-0">
                {selectedPlatforms.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setActivePlatform(p)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors font-sans",
                      activePlatform === p
                        ? "border-foreground text-foreground font-semibold"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {p === "devto" ? "Dev.to" : "Hashnode"}
                  </button>
                ))}
              </div>
            )}
            {activePlatform === "devto" && (
              <DevToForm formData={devtoForm} onChange={updateDevto} />
            )}
            {activePlatform === "hashnode" && (
              <HashnodeForm formData={hashnodeForm} onChange={updateHashnode} />
            )}
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                <HugeiconsIcon icon={ArrowBigLeft} className="size-5" />
                Back
              </Button>
              <PublishButton
                blogId={data._id}
                selectedPlatforms={selectedPlatforms}
                devtoForm={devtoForm}
                hashnodeForm={hashnodeForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
