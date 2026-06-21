'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { TokenData } from '@/lib/types/global.types';
import { useState } from 'react';

type PersonalSettingsProps = {
    user : Partial<TokenData>;
};

export const PersonalSettings = ({
    user
} : PersonalSettingsProps) => {
    const [userData, setUserData] = useState<Partial<TokenData>>(user);

    const updateSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

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
        // Check if any field is empty
        if(userData.email?.trim() === "") {
            toast("Please fill in all fields.");
            return;
        }
        
        // Check if the email has changed
        if(user.email === userData.email) {
            toast("Please enter a new email address to update.");
            return;
        }

        // Verify email using regex
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(userData.email && !regex.test(userData.email)) {
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
                            value={userData.username}
                            onChange={(e) => updateSettings(e)}
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
                            value={userData.email}
                            onChange={(e) => updateSettings(e)}
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