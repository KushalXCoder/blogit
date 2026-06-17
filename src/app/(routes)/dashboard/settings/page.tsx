import { checkToken } from "@/src/lib/helper/checkToken";
import { PersonalSettings } from "@/src/components/app-components/settings/personal-settings";
import { Profile } from "@/src/components/app-components/settings/profile";
import { AccountIntegrations } from "@/src/components/app-components/settings/integrations";

const Settings = async () => {
    const user = await checkToken();
    if(!user) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Unauthorized. Please log in to access settings.</p>
            </div>
        )
    }

    return (
        <div className="relative min-h-full flex-1 flex flex-col justify-center items-center px-10 py-4">
            {/* Background pattern */}
            <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] z-0" />
            {/* Settings */}
            <div className="space-y-6 z-10">
                <Profile userImage={user.image} />
                <PersonalSettings user={user} />
                <AccountIntegrations integrationsData={user.connections} />
            </div>
        </div>
    );
};

export default Settings;