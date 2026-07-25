"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { settingsStore } from '@/store/setting.store';
import { toast } from 'sonner';
import { verifyDevtoKey, verifyGithubKey } from '@/services/setting.service';
import { IntegrationData } from '@/lib/types/global.types';
import { cn } from '@/lib/utils';
import { userStore } from '@/store/user.store';
import { isPlatformConnected } from '@/lib/helper/connections';
import { HugeiconsIcon } from '@hugeicons/react';
import { Github } from '@hugeicons/core-free-icons';

type AccountIntegrationsProps = {
    integrationsData: IntegrationData;
}

export const AccountIntegrations = ({
    integrationsData
}: AccountIntegrationsProps) => {
    const { setValue } = userStore();
    const { devtoKey, githubKey, updateSettings } = settingsStore();
    const devtoConnected = isPlatformConnected(integrationsData, "devto");
    const githubConnected = isPlatformConnected(integrationsData, "github");

    const handleDevVerify = async () => {
        if(devtoConnected) return;
        if(!devtoKey) {
            toast.error("Please enter your Dev.to profile URL to verify.");
            return;
        }

        try {
            const res = await verifyDevtoKey(devtoKey);
            if(res) {
                toast.success("Dev.to key verified successfully!");
                setValue("connections", res.connections);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to verify Dev.to key. Please check your input and try again.";
            toast.error(errorMessage);
        }
    }

    const handleGithubVerify = async () => {
        if(githubConnected) return;
        if(!githubKey) {
            toast.error("Please enter your GitHub Personal Access Token to verify.");
            return;
        }

        try {
            const res = await verifyGithubKey(githubKey);
            if(res) {
                toast.success("GitHub token verified successfully!");
                setValue("connections", res.connections);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to verify GitHub token.";
            toast.error(errorMessage);
        }
    }

    return (
        <Card className='shadow w-full'>
            <CardHeader>
                <CardTitle className="text-base">Account Integrations</CardTitle>
                <CardDescription>Connect your account with third-party services & code repositories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                    <div className='space-y-2'>
                        <div className='space-y-2'>
                            <Label className="flex items-center gap-1.5">
                                <Image src="/devto.webp" alt="Dev.to" width={16} height={16} className='size-4 rounded-sm' />
                                Dev.to Key
                            </Label>
                            <Input
                                id='devtokey'
                                value={devtoKey}
                                onChange={(e) => updateSettings({ devtoKey: e.target.value })}
                                placeholder='https://dev.to/username'
                                className='h-9'
                                disabled={devtoConnected}
                            />
                        </div>
                        <Button
                            onClick={handleDevVerify}
                            variant="outline"
                            className={cn(
                                'h-9 min-w-25',
                                devtoConnected && "bg-green-500 text-white cursor-not-allowed hover:bg-green-500"
                            )}
                            disabled={devtoConnected}
                        >
                            {devtoConnected ? "Verified" : "Verify"}
                        </Button>
                    </div>

                    <div className='space-y-2'>
                        <div className='space-y-2'>
                            <Label className="flex items-center gap-1.5">
                                <HugeiconsIcon icon={Github} className="size-4" />
                                GitHub Personal Access Token
                            </Label>
                            <Input
                                id='githubkey'
                                type='password'
                                value={githubKey}
                                onChange={(e) => updateSettings({ githubKey: e.target.value })}
                                placeholder='ghp_xxxxxxxxxxxxxxxxxxxx'
                                className='h-9 font-mono text-xs'
                                disabled={githubConnected}
                            />
                        </div>
                        <Button
                            onClick={handleGithubVerify}
                            variant="outline"
                            className={cn(
                                'h-9 min-w-25',
                                githubConnected && "bg-green-500 text-white cursor-not-allowed hover:bg-green-500"
                            )}
                            disabled={githubConnected}
                        >
                            {githubConnected ? "Verified" : "Verify"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}