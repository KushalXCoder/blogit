"use client";

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { settingsStore } from '@/store/setting.store';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { updateImage } from '@/controllers/setting.controller';
import { updateUser } from '@/controllers/user.controller';
import { UserData } from '@/lib/types/user.types';
import { Image } from '@imagekit/next';

type ProfileProps = {
    userImage: UserData["image"];
};

export const Profile = ({
    userImage,
} : ProfileProps) => {
    let { image, hasImageSelected, updateSettings } = settingsStore();

    const [uploading, setUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    image = image || userImage;

    // Handle local image view 
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(file) {
            const localUrl = URL.createObjectURL(file);
            updateSettings({ image: localUrl, hasImageSelected: true });
            toast.success('Profile image added locally');
        } else {
            toast.error('Failed to upload image. Please try again.');
        }
    }

    // Open image before uploading, using a blob local url
    const handleImageOpen = () => {
        window.open(image, '_blank');    
    }

    // Handle updation of image
    const handleImageUpdate = async () => {
        // Take the file input
        const fileInput = fileInputRef.current;
        if(!fileInput || !fileInput.files || fileInput.files.length === 0) {
            toast.error('No file selected. Please choose a file.');
            return;
        }

        // Take the last uploaded file
        const file = fileInput.files[0];

        try {
            // Upload the image to imagekit
            const res = await updateImage(file);
            console.log("Upload successful:", res);

            toast.success('Profile image updated successfully');

            // Create the updates object
            const updates = {
                image: res.url,
            };

            try {
                await updateUser(updates);
            } catch (error) {
                const msg = error instanceof Error ? error.message : 'Failed to update user details. Please try again.';
                console.error("Error updating user details:", msg);
                toast.error(msg);
            }

            updateSettings({ hasImageSelected: false });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'Failed to upload image. Please try again.');
            } else {
                toast.error('Failed to upload image. Please try again.');
            }
        }
    }

    console.log(image);

    return (
        <Card className='shadow'>
            <CardHeader>
                <CardTitle className="text-base">Profile Photo</CardTitle>
                <CardDescription>Upload and manage your profile picture</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-6">
                    <Avatar
                        className="w-20 h-20"
                        onClick={handleImageOpen}
                    >
                        <AvatarImage
                            src={image}
                            alt="Profile"
                        />
                        <AvatarFallback>SE</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-sm font-medium">Upload new picture</p>
                            <p className="text-xs text-gray-500">We support PNGs, JPEGs and GIFs under 10MB</p>
                        </div>
                        <div className='flex gap-3'>
                            <label className='w-fit'>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="hidden"
                                />
                                <Button variant="outline" size="sm" asChild>
                                    <span>Choose File</span>
                                </Button>
                            </label>
                            {hasImageSelected && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleImageUpdate()}
                                    disabled={uploading}
                                >
                                    Update
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}