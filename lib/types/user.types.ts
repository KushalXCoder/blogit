// This file contains types related to the user and their settings

import { IntegrationData } from "./global.types";

export type UserSettings = {
    username: string;
    email: string;
    image: string;
    devtoKey?: string;
    hashnodeKey?: string;
};

export type UserData = {
    email: string;
    username: string;
    image: string;
    connections: IntegrationData;
}