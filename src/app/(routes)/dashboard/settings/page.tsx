"use client";

import { PersonalSettings } from "@/components/app-components/settings/personal-settings";
import { Profile } from "@/components/app-components/settings/profile";
import { AccountIntegrations } from "@/components/app-components/settings/integrations";
import { userStore } from "@/store/user.store";
import { Loader } from "./loader";
import { BackgroundPattern } from "@/components/app-components/background-pattern";

const Settings = () => {
  const { username, email, image, connections, loading } = userStore();

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-full flex-1 flex flex-col justify-start items-center px-6 py-8">
      <BackgroundPattern />
      {/* Settings */}
      <div className="space-y-6 z-10 w-full max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your profile details, personal preferences, and third-party platform integrations.
          </p>
        </div>
        <Profile userImage={image} />
        <PersonalSettings user={{ username, email }} />
        <AccountIntegrations integrationsData={connections} />
      </div>
    </div>
  );
};

export default Settings;
