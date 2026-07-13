import { BlogPlatform } from "./blog.types";

export type WaitlistData = {
    name: string;
    email: string;
    receiveUpdates: boolean;
};

export type IntegrationDataType = {
    platform: BlogPlatform;
    connected: boolean;
    apiKey: string;
};

export type IntegrationData = {
    platform: BlogPlatform;
    connected: boolean;
    apiKey: string;
}[];

export type TokenConnectionData = {
    platform: BlogPlatform;
    connected: boolean;
}[];

export type TokenData = {
    _id: string;
    email: string;
    username: string;
    image: string;
    connections: TokenConnectionData;
};