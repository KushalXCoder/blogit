"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { userStore } from "@/store/user.store";
import Image from "next/image";
import { BackgroundPattern } from "../background-pattern";
import { PlatformCard } from "./platform-card";
import { DevToForm } from "./forms/devto-form";
import { HashnodeForm } from "./forms/hashnode-form";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowBigLeft, ArrowBigRight } from "@hugeicons/core-free-icons";
import { BlogPlatform, UserBlogData } from "@/lib/types/blog.types";
import { PublishButton } from "./publish-button";
import { isPlatformConnected } from "@/lib/helper/connections";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AiChat } from "../ai/ai-chat";
import { all_platforms } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useFormState } from "@/hooks/use-form-state";
import { FormStates } from "@/lib/types/platform.types";

type PublishPageProps = {
  data: UserBlogData;
}

type PlatformMetaData = {
  name: string;
  data: FormStates;
  logo: React.ReactNode;
}

const platform_notes : Record<BlogPlatform,string> = {
  devto: "Publish to devto - an acclaimed blog platform of the tech world.",
  hashnode: "Publish to hashnode - the modern blog platform of current times."
};

export const PublishPage = ({
  data
} : PublishPageProps) => {
  const { connections } = userStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<BlogPlatform[]>([]);
  const [activeTab, setActiveTab] = useState<BlogPlatform>(selectedPlatforms[0]);
  const { forms, getForm } = useFormState(data);

  const platform_metadata: Record<BlogPlatform, PlatformMetaData> = {
    devto: {
      name: "devto",
      data: getForm("devto"),
      logo: <Image src="/devto.webp" alt="Dev.to" width={14} height={14} className="rounded-sm" />
    },
    hashnode: {
      name: "hashnode",
      data: getForm("hashnode"),
      logo: <span className="flex items-center justify-center w-3.5 h-3.5 rounded-sm bg-blue-600 text-white text-[7px] font-bold">H</span>
    }
  };

  const togglePlatform = (p: BlogPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const goToStep2 = () => {
    if (selectedPlatforms.length === 0) return;
    setActiveTab(selectedPlatforms[0]);
    setStep(2);
  };

  const platformForms : Record<BlogPlatform, () => React.ReactNode> = {
    devto: () => <DevToForm data={data} />,
    hashnode: () => <HashnodeForm data={data} />
  };

  const renderForm = (platform: BlogPlatform) => platformForms[platform]();

  return (
    <div className={cn(
      "relative flex-1 w-full bg-transparent",
      step === 2 ? "h-screen overflow-hidden" : "min-h-screen"
    )}>
      <BackgroundPattern />

      <div className={cn("relative w-full", step === 2 && "h-full")}>
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
            {/* Display all publish cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {all_platforms.map((platform: BlogPlatform) => (
                <PlatformCard
                  key={platform}
                  platform={platform}
                  description={platform_notes[platform]}
                  connected={isPlatformConnected(connections,platform)}
                  selected={selectedPlatforms.includes(platform)}
                  onToggle={() => togglePlatform(platform)}
                  logo={`/${platform}.webp`}
                />
              ))}
            </div>
            <div className="flex justify-between items-end">    
              {(!isPlatformConnected(connections, "devto") || !isPlatformConnected(connections, "hashnode")) && (
                <div className="mt-8 flex items-center justify-start">
                  <a
                    href="/dashboard/settings"
                    className="text-md hover:underline text-gray-500 hover:text-primary transition-colors"
                  >
                    Manage Connections
                  </a>
                </div>
              )}
              <div className="mt-10 flex justify-end">
                <Button
                  size="lg"
                  onClick={goToStep2}
                  disabled={selectedPlatforms.length === 0}
                >
                  Configure Forms
                  <HugeiconsIcon icon={ArrowBigRight} className="size-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_400px] h-full overflow-hidden">
            <div className="platform-settings px-8 py-6 border-r border-border/85 bg-transparent overflow-y-auto h-full pb-16">
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
                    selectedPlatformsData={forms}
                  />
                </div>
              </div>
              {selectedPlatforms.length === 1 ? (
                <div className="space-y-6">
                  {renderForm(selectedPlatforms[0])}
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as BlogPlatform)} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/80 rounded-lg">
                    {selectedPlatforms.map((platform) => (
                      <TabsTrigger key={platform} value={platform} className="gap-2 text-sm py-1.5 font-semibold">
                        {platform_metadata[platform].logo}
                        {platform_metadata[platform].name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {selectedPlatforms.map((platform) => (
                    <TabsContent key={platform} value={platform} className="mt-6 space-y-6">
                      {renderForm(platform)}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
            <div className="h-full bg-white">
              <AiChat />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
