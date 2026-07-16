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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AiChat } from "../ai/ai-chat";

type PublishPageProps = {
  data: UserBlogData;
}

export const PublishPage = ({
  data
} : PublishPageProps) => {
  const { connections } = userStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [activeTab, setActiveTab] = useState<Platform>("devto");

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
    if (selectedPlatforms.includes("devto")) {
      setActiveTab("devto");
    } else if (selectedPlatforms.includes("hashnode")) {
      setActiveTab("hashnode");
    }
    setStep(2);
  };

  const updateDevto = (key: keyof DevToFormState, value: string | boolean) => {
    setDevtoForm((p) => ({ ...p, [key]: value }));
  };

  const updateHashnode = (key: keyof HashnodeFormState, value: string | boolean) => {
    setHashnodeForm((p) => ({ ...p, [key]: value }));
  };

  const getReadTime = () => {
    const wordsCount = data.words || 0;
    const minutes = Math.max(1, Math.round(wordsCount / 200));
    return `${minutes} min read`;
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative flex-1 w-full min-h-screen bg-transparent">
      <BackgroundPattern />

      <div className="relative w-full">
        {step === 1 && (
          <div className="px-8 py-10 max-w-5xl mx-auto">
            <div className="mb-10 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full font-sans">
                Workspace
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-sans mt-3">
                Publishing Hub
              </h1>
              <p className="text-sm text-foreground/80 mt-2 font-sans max-w-xl">
                Broadcasting your voice is simple. Select the channels where you want to publish this article.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <PlatformCard
                platform="devto"
                name="Dev.to"
                description="Publish to the global developer community."
                connected={isPlatformConnected(connections, "devto")}
                selected={selectedPlatforms.includes("devto")}
                onToggle={() => togglePlatform("devto")}
                logo={
                  <Image src="/devto.webp" alt="Dev.to" width={36} height={36} className="rounded-lg shadow-sm" />
                }
              />
              <PlatformCard
                platform="hashnode"
                name="Hashnode"
                description="Publish to your personal developer newsletter & blog."
                connected={isPlatformConnected(connections, "hashnode")}
                selected={selectedPlatforms.includes("hashnode")}
                onToggle={() => togglePlatform("hashnode")}
                logo={
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white text-sm font-black font-sans shadow-sm">
                    H
                  </span>
                }
              />
            </div>

            {(!isPlatformConnected(connections, "devto") || !isPlatformConnected(connections, "hashnode")) && (
              <div className="mt-8 flex items-center justify-start">
                <a
                  href="/dashboard/settings"
                  className="text-xs font-semibold text-primary hover:underline font-sans"
                >
                  Manage Connections &rarr;
                </a>
              </div>
            )}

            <div className="mt-10 flex justify-end">
              <Button
                size="lg"
                onClick={goToStep2}
                disabled={selectedPlatforms.length === 0}
                className="px-8 shadow-md hover:translate-y-[-1px] transition-transform duration-200"
              >
                Configure Forms
                <HugeiconsIcon icon={ArrowBigRight} className="size-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_400px] min-h-screen">
            <div className="px-8 py-6 border-r border-border/85 bg-transparent overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="mb-3">
                  <h1 className="text-xl font-bold tracking-tight text-foreground font-sans">
                    Post details
                  </h1>
                  <p className="text-xs text-muted-foreground mt-0.5 font-sans font-medium">
                    Customize headers, description, SEO options, and parameters.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setStep(1)} 
                    className="gap-1.5 text-xs h-8 border-border/60 hover:bg-accent/40 bg-white dark:bg-black font-semibold"
                  >
                    <HugeiconsIcon icon={ArrowBigLeft} className="size-3.5" />
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

              {selectedPlatforms.length === 1 ? (
                <div className="space-y-6">
                  {selectedPlatforms[0] === "devto" && (
                    <DevToForm
                      formData={devtoForm}
                      onChange={updateDevto}
                    />
                  )}
                  {selectedPlatforms[0] === "hashnode" && (
                    <HashnodeForm
                      formData={hashnodeForm}
                      onChange={updateHashnode}
                    />
                  )}
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as Platform)} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/80 rounded-lg">
                    {selectedPlatforms.map((platform) => (
                      <TabsTrigger key={platform} value={platform} className="gap-2 text-sm py-1.5 font-semibold">
                        {platform === "devto" ? (
                          <Image src="/devto.webp" alt="" width={14} height={14} className="rounded-sm" />
                        ) : (
                          <span className="flex items-center justify-center w-3.5 h-3.5 rounded-sm bg-blue-600 text-white text-[7px] font-bold">H</span>
                        )}
                        {platform === "devto" ? "Dev.to" : "Hashnode"}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {selectedPlatforms.includes("devto") && (
                    <TabsContent value="devto" className="mt-6 space-y-6">
                      <DevToForm
                        formData={devtoForm}
                        onChange={updateDevto}
                      />
                    </TabsContent>
                  )}

                  {selectedPlatforms.includes("hashnode") && (
                    <TabsContent value="hashnode" className="mt-6 space-y-6">
                      <HashnodeForm
                        formData={hashnodeForm}
                        onChange={updateHashnode}
                      />
                    </TabsContent>
                  )}
                </Tabs>
              )}
            </div>
            <div className="bg-white">
              <AiChat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
