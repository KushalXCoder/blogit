"use client";

import { uploadImage } from "@/services/setting.service";
import { BlogStore } from "@/store/blog.store";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";

export const CoverImage = () => {
    const [uploading, setUploading] = useState<boolean>(false);
    const { coverImage, setDetails } = BlogStore();

    // Handle the local image upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(!file) {
            toast.error('No file selected. Please choose a file.');
            return;
        }

        // Start uploading the image
        setUploading(true);

        // Upload the image to the server
        try {
            const res = await uploadImage(file);
            toast.success('Profile image updated successfully');
            setDetails({ coverImage: res.url });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'Failed to upload image. Please try again.');
            } else {
                toast.error('Failed to upload image. Please try again.');
            }
        } finally {
            setUploading(false);
        }
    }

    const ImageContainer = () => {
        if(uploading) {
            return (
                <span>Uploading...</span>
            )
        }

        return (
            <>
                {coverImage ? (
                    <Image
                        src={coverImage}
                        alt="Cover"
                        width={1000}
                        height={1000}
                        className="w-auto h-auto max-w-full"
                        loading="eager"
                    />
                ) : (
                    <span>Cover Image</span>
                )}
                <input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </>
        )
    }

    return (
        <div className="px-10">
            <div className="relative min-h-64 w-full flex bg-accent/50 border border-dashed border-gray-300 rounded-sm">
                <label
                    htmlFor="coverImage"
                    className="w-full min-h-full flex justify-center items-center cursor-pointer"
                >
                    <ImageContainer />                    
                </label>
            </div>
        </div>
    )
}