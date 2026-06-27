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
    <div className="relative min-h-full flex-1 flex flex-col justify-center items-center px-10 py-4">
      <BackgroundPattern />
      {/* Settings */}
      <div className="space-y-6 z-10">
        <Profile userImage={image} />
        <PersonalSettings user={{ username, email }} />
        <AccountIntegrations integrationsData={connections} />
      </div>
    </div>
  );
};

export default Settings;
