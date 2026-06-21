"use client";

import { PersonalSettings } from "@/components/app-components/settings/personal-settings";
import { Profile } from "@/components/app-components/settings/profile";
import { AccountIntegrations } from "@/components/app-components/settings/integrations";
import { userStore } from "@/store/user.store";
import { Loader } from "./loader";

const Settings = () => {
  const { username, email, image, connections, loading } = userStore();
  
  if (loading) return <Loader />;

  return (
    <div className="relative min-h-full flex-1 flex flex-col justify-center items-center px-10 py-4">
      {/* Background pattern */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] z-0" />
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
