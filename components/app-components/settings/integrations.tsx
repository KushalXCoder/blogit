"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { settingsStore } from '@/store/setting.store';
import { toast } from 'sonner';
import { verifyDevtoKey } from '@/controllers/setting.controller';
import { IntegrationData } from '@/lib/types/global.types';
import { cn } from '@/lib/utils';

type AccountIntegrationsProps = {
    integrationsData: IntegrationData;
}

export const AccountIntegrations = ({
    integrationsData
}: AccountIntegrationsProps) => {
    const { devtoKey, hashnodeKey, updateSettings } = settingsStore();

    const handleDevVerify = async () => {
        // If already verified, do nothing
        if(integrationsData.devtoVerification) return;
        
        // Check if field is empty
        if(!devtoKey) {
            toast.error("Please enter your Dev.to profile URL to verify.");
            return;
        }

        try {
            const res = await verifyDevtoKey(devtoKey);
            if(res) {
                toast.success("Dev.to key verified successfully!");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to verify Dev.to key. Please check your input and try again.";
            toast.error(errorMessage);
        }
    }
    return (
        <Card className='shadow'>
            <CardHeader>
                <CardTitle className="text-base">Account Integrations</CardTitle>
                <CardDescription>Connect your account with third-party services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className='flex gap-10 w-full'>
                    <div className='space-y-2 min-w-100'>
                        <div className='space-y-2'>
                            <Label>
                                <Image src="/devto.webp" alt="Dev.to" width={1000} height={1000} className='size-4' />
                                Dev.to Key
                            </Label>
                            <Input
                                id='devtokey'
                                value={devtoKey}
                                onChange={(e) => updateSettings({ devtoKey: e.target.value })}
                                placeholder='https://dev.to/summarecon'
                                className='h-9'
                                disabled={integrationsData.devtoVerification}
                            />
                        </div>
                        <Button
                            onClick={handleDevVerify}
                            variant="outline"
                            className={cn(
                                'h-9 min-w-25',
                                integrationsData.devtoVerification && "bg-green-500 cursor-not-allowed hover:bg-green-500"
                            )}
                        >
                            {integrationsData.devtoVerification ? "Verified" : "Verify"}
                        </Button>
                    </div>
                    <div className='space-y-2 min-w-100'>
                        <div className='space-y-2'>
                            <Label className='gap-2'>
                                <svg viewBox='0 0 39 39' className='h-4'>
                                    <path d="M2.68 13.032c-3.573 3.505-3.573 9.363 0 12.936L13.032 36.32c3.505 3.573 9.363 3.573 12.936 0L36.32 25.968c3.573-3.573 3.573-9.431 0-12.936L25.968 2.68c-3.573-3.573-9.431-3.573-12.936 0zm12.211 1.935c2.507-2.521 6.582-2.544 9.104-.038s2.544 6.582.038 9.104-6.582 2.544-9.104.038-2.544-6.582-.038-9.104"></path>
                                </svg>
                                Hashnode API
                            </Label>
                            <Input
                                id='hashnodekey'
                                value={hashnodeKey}
                                onChange={(e) => updateSettings({ hashnodeKey: e.target.value })}
                                placeholder='https://dev.to/summarecon'
                                className='h-9'
                            />
                        </div>
                        <Button
                            variant="outline"
                            className={cn(
                                'h-9 min-w-25',
                                integrationsData.hashnodeVerification && "bg-green-500"
                            )}
                        >
                            {integrationsData.hashnodeVerification ? "Verified" : "Verify"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}