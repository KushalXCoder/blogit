"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { settingsStore } from '@/store/setting.store';
import { toast } from 'sonner';
import { verifyDevtoKey } from '@/services/setting.service';
import { IntegrationData } from '@/lib/types/global.types';
import { cn } from '@/lib/utils';
import { userStore } from '@/store/user.store';
import { isPlatformConnected } from '@/lib/helper/connections';

type AccountIntegrationsProps = {
    integrationsData: IntegrationData;
}

export const AccountIntegrations = ({
    integrationsData
}: AccountIntegrationsProps) => {
    const { setValue } = userStore();
    const { devtoKey, updateSettings } = settingsStore();
    const devtoConnected = isPlatformConnected(integrationsData, "devto");

    const handleDevVerify = async () => {
        // If already verified, do nothing
        if(devtoConnected) return;
        
        // Check if field is empty
        if(!devtoKey) {
            toast.error("Please enter your Dev.to profile URL to verify.");
            return;
        }

        try {
            const res = await verifyDevtoKey(devtoKey);
            if(res) {
                toast.success("Dev.to key verified successfully!");
                setValue("connections", res.connections); // Update the main store
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
                                disabled={devtoConnected}
                            />
                        </div>
                        <Button
                            onClick={handleDevVerify}
                            variant="outline"
                            className={cn(
                                'h-9 min-w-25',
                                devtoConnected && "bg-green-500 cursor-not-allowed hover:bg-green-500"
                            )}
                            disabled={devtoConnected}
                        >
                            {devtoConnected ? "Verified" : "Verify"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}