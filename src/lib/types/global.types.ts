import { UserData } from "./user.types";

export type WaitlistData = {
    name: string;
    email: string;
    receiveUpdates: boolean;
};

export type IntegrationData = {
    devto: boolean;
    hashnode: boolean;
}

export type TokenData = UserData;