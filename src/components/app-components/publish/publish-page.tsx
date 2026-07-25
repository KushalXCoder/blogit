"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { userStore } from "@/store/user.store";
import Image from "next/image";
import { BackgroundPattern } from "../background-pattern";
import { PlatformCard } from "./platform-card";
import { DevToForm } from "./forms/devto-form";
import { BlogPlatform, UserBlogData } from "@/lib/types/blog.types";
import { PublishButton } from "./publish-button";
import { isPlatformConnected } from "@/lib/helper/connections";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AiChat } from "../ai/ai-chat";
import { all_platforms } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useFormState } from "@/hooks/use-form-state";
import { FormStates } from "@/lib/types/platform.types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type PublishPageProps = {
  data: UserBlogData;
};

type PlatformMetaData = {
  name: string;
  data: FormStates;
  logo: React.ReactNode;
};

const platform_notes: Record<BlogPlatform, string> = {
  devto: "Distribute to Dev.to — reach the developer community.",
};

export const PublishPage = ({ data }: PublishPageProps) => {
  const { connections } = userStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<BlogPlatform[]>([]);
  const [activeTab, setActiveTab] = useState<BlogPlatform>("devto");
  const { forms, getForm } = useFormState(data);

  const platform_metadata: Record<BlogPlatform, PlatformMetaData> = {
    devto: {
      name: "Dev.to",
      data: getForm("devto"),
      logo: (
        <Image
          src="/devto.webp"
          alt="Dev.to"
          width={20}
          height={20}
          className="rounded-sm object-contain"
        />
      ),
    },
  };

  const togglePlatform = (p: BlogPlatform) => {
    setSelectedPlatforms((prev) => {
      const next = prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p];
      if (next.length > 0 && !next.includes(activeTab)) {
        setActiveTab(next[0]);
      }
      return next;
    });
  };

  const goToStep2 = () => {
    if (selectedPlatforms.length === 0) return;
    setActiveTab(selectedPlatforms[0]);
    setStep(2);
  };

  const platformForms: Record<BlogPlatform, () => React.ReactNode> = {
    devto: () => <DevToForm data={data} />,
  };

  const renderForm = (platform: BlogPlatform) => platformForms[platform]();

  const hasDisconnected = !isPlatformConnected(connections, "devto");

  return (
    <div
      className={cn(
        "relative flex-1 w-full bg-white",
        step === 2 ? "h-screen overflow-hidden" : "min-h-screen",
      )}
    >
      <BackgroundPattern />

      <div className={cn("relative w-full", step === 2 && "h-full")}>
        {step === 1 && (
          <div className="max-w-5xl mx-auto px-6 py-10">
            {/* Page header — matches the blogs dashboard pattern */}
            <div className="mb-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="size-3.5" />
                Back to blogs
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">Publish</h1>
              <p className="mt-1 text-muted-foreground">
                Select platforms and configure details for{" "}
                <span className="text-foreground font-medium">
                  {data.title || "Untitled"}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
              {/* Main column */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">
                  Platforms
                </p>
                <div className="border border-border rounded-lg overflow-hidden divide-y divide-border bg-white">
                  {all_platforms.map((platform: BlogPlatform) => (
                    <PlatformCard
                      key={platform}
                      platform={platform}
                      description={platform_notes[platform]}
                      connected={isPlatformConnected(connections, platform)}
                      selected={selectedPlatforms.includes(platform)}
                      published={!!data.published?.includes(platform)}
                      onToggle={() => togglePlatform(platform)}
                      logo={platform_metadata[platform].logo}
                    />
                  ))}
                </div>

                {hasDisconnected && (
                  <p className="text-[13px] text-muted-foreground mt-4">
                    Some platforms are not connected.{" "}
                    <Link
                      href="/dashboard/settings"
                      className="text-foreground underline underline-offset-4 hover:text-primary"
                    >
                      Manage connections
                    </Link>
                  </p>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <div className="sticky top-8">
                  <p className="text-sm font-medium text-foreground mb-3">
                    Summary
                  </p>
                  <div className="border border-border rounded-lg bg-white p-5">
                    {selectedPlatforms.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4">
                        Select at least one platform to continue.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {selectedPlatforms.map((platform) => {
                          const isUpdate = !!data.published?.includes(platform);
                          return (
                            <div
                              key={platform}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <div className="shrink-0">
                                  {platform_metadata[platform].logo}
                                </div>
                                <span className="text-sm font-medium">
                                  {platform_metadata[platform].name}
                                </span>
                              </div>
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  isUpdate
                                    ? "text-emerald-600"
                                    : "text-muted-foreground",
                                )}
                              >
                                {isUpdate ? "Update" : "New post"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <Separator className="my-4" />

                    <Button
                      className="w-full"
                      onClick={goToStep2}
                      disabled={selectedPlatforms.length === 0}
                    >
                      Continue
                      <ArrowRight className="size-4 ml-1.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] h-full overflow-hidden">
            <div className="px-8 py-6 border-r border-border overflow-y-auto h-full pb-20" style={{ scrollbarWidth: "none" }}>
              <div className="flex items-center justify-between mb-6 bg-white dark:bg-card p-5 rounded-xl border border-border/80 shadow-xs">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    Post details
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Configure metadata for each platform.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(1)}
                    className="gap-1.5 text-sm"
                  >
                    <ArrowLeft className="size-3.5" />
                    Back
                  </Button>
                  <PublishButton
                    blogId={data._id}
                    selectedPlatforms={selectedPlatforms}
                    selectedPlatformsData={forms}
                    published={data.published}
                  />
                </div>
              </div>

              {selectedPlatforms.length === 1 ? (
                <div className="space-y-6">{renderForm(selectedPlatforms[0])}</div>
              ) : (
                <Tabs
                  value={activeTab}
                  onValueChange={(val) => setActiveTab(val as BlogPlatform)}
                  className="w-full"
                >
                  <TabsList className="mb-6 bg-white dark:bg-card border border-border/80 p-1.5 rounded-xl shadow-xs">
                    {selectedPlatforms.map((platform) => (
                      <TabsTrigger
                        key={platform}
                        value={platform}
                        className="gap-2 text-sm px-4 py-1.5 font-medium rounded-lg"
                      >
                        {platform_metadata[platform].logo}
                        {platform_metadata[platform].name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {selectedPlatforms.map((platform) => (
                    <TabsContent
                      key={platform}
                      value={platform}
                      className="space-y-6"
                    >
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
