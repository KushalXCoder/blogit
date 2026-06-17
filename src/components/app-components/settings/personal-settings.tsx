'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { toast } from 'sonner';
import { settingsStore } from '@/src/store/setting.store';
import { TokenData } from '@/src/lib/types/global.types';

type PersonalSettingsProps = {
    user : Partial<TokenData>;
}

export const PersonalSettings = ({
    user
} : PersonalSettingsProps) => {
    let { username, email, updateSettings } = settingsStore();
    
    user.username = username || user.username;
    user.email = email || user.email;

    // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setUserSettings({
    //                 ...userSettings,
    //                 profileImage: reader.result as string
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleEmailUpdate = () => {
        // Check if the email has changed
        if(user.email === email) {
            toast("Please enter a new email address to update.");
            return;
        }

        // Verify email using regex
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!regex.test(email)) {
            toast("Please enter a valid email address.");
            return;
        }

        // OTP Logic
    }

    return (
        <Card className='shadow'>
            <CardHeader>
                <CardTitle className="text-base">Personal Information</CardTitle>
                <CardDescription>Update your basic profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => updateSettings({ username: e.target.value })}
                            placeholder="Summarecon"
                            className="h-9"
                        />
                    </div>
                </div>
                {/* Email Section */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <div className="flex gap-2 items-end">
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => updateSettings({ email: e.target.value })}
                            placeholder="jdoe.mobbin@gmail.com"
                            className="h-9"
                        />
                        <Button
                            variant="outline"
                            className="h-9 min-w-20"
                            onClick={handleEmailUpdate}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}