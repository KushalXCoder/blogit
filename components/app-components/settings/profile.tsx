"use client";

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { settingsStore } from '@/store/setting.store';

export const Profile = () => {
    const { profileImage, updateSettings } = settingsStore();
    return (
        <Card className='shadow'>
            <CardHeader>
                <CardTitle className="text-base">Profile Photo</CardTitle>
                <CardDescription>Upload and manage your profile picture</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={profileImage} alt="Profile" />
                        <AvatarFallback>SE</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-sm font-medium">Upload new picture</p>
                            <p className="text-xs text-gray-500">We support PNGs, JPEGs and GIFs under 10MB</p>
                        </div>
                        <label>
                            <input
                                type="file"
                                accept="image/*"
                                // onChange={(e) => handleImageUpload(e, (url) => updateSettings({ profileImage: url }))}
                                className="hidden"
                            />
                            <Button variant="outline" size="sm" asChild>
                                <span>Choose File</span>
                            </Button>
                        </label>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}